const db = require('../../database/models/index.js');
const { sequelize } = require('../../database/models/index.js');
const { validationResult } = require('express-validator');

const Product = db.products;
const Sale = db.sales;
const saleDetail = db.sale_details;
const Status = db.status;
const User = db.users;
const port = 3001;

const controller = {    
    cart: async function (req, res) {
        const products = await Product.findAll();
        res.render('products/productCart', { products});

    },

    createSale: async function (req, res) {
        try {            
            const objeto = req.body;
            console.log(objeto);
            const resultado = [];
            
            const productIds = Array.isArray(objeto.product_id) ? objeto.product_id : [parseInt(objeto.product_id)];
            const prices = Array.isArray(objeto.price) ? objeto.price : [objeto.price];
            const quantities = Array.isArray(objeto.quantity) ? objeto.quantity : [objeto.quantity]; 

            const sale = await Sale.create({
                    user_id: req.session.userLogged.user_id,
                    sale_reference: "STIF" + Date.now(),
                    sale_date: new Date(),
                    status: true
                });
            
            for (let i = 0; i < productIds.length; i++) {
                const item = {
                    product_id: parseInt(productIds[i]),
                    sale_id: sale.sale_id,
                    price: parseInt(prices[i]),
                    quantity: parseInt(quantities[i])
                };          
            resultado.push(item);
            }
            console.log(resultado);
            
            await saleDetail.bulkCreate(resultado);

            for (let i = 0; i < resultado.length; i++) {
                const item = resultado[i];
                const product = await Product.findByPk(item.product_id);
                if (product) {
                  // Sumar la cantidad ingresada a la cantidad actual del producto
                const newQuantity = product.stock - item.quantity;
                await product.update({ stock: newQuantity });
                }
            }

            const errorInstance = await Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: 'OK'
            });
            errorInstance.save();

            return res.redirect('/products/products-list/Hogar');

        } catch (err){
            console.error(err)
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
        
        res.redirect('/products/products-list/Hogar');
    },

    dashboard: async function (req, res) {
        // ********** Cantidad de ventas ***********
        const users = await User.findAll({
            include: {all: true},
            attributes: ['user_id','name']
        })
        const totalSales = await saleDetail.findAll({
            include: ['fk_saledetail_sale'],
            attributes: [
                [sequelize.col('sale_reference'), 'sale_reference'],
                [sequelize.literal('SUM(price * quantity)'), 'Total']
            ],
            group: ['fk_saledetail_sale.sale_id']
        });
        const countSales = await Sale.findAll({
            attributes: [[sequelize.fn("COUNT", sequelize.col("sale_id")), "Cantidad"]]
        });
        const totalSalesMonth = await Sale.findAll({
            attributes: [
                [sequelize.fn("MONTH", sequelize.col("sale_date")), "month"],
                [sequelize.fn("COUNT", sequelize.col("sale_id")), "Cantidad"]
            ],
            group: [sequelize.fn("MONTH", sequelize.col("sale_date"))]
        });
        const totalSalesPerson = await Sale.findAll({
            include: [
                {
                    model: saleDetail,
                    as: 'fk_saledetail_sale'
                },
                {
                    model: User,
                    as: 'fk_sale_user',
                    attributes: ['name', 'rol_id'],
                    where: {
                        rol_id: 2
                    }
                }
            ],
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                [sequelize.literal('(COUNT(fk_saledetail_sale.sale_id))'), 'total_sales'],
                [sequelize.literal('name'), 'seller_name']
            ],
            group: ['name','month'],
        });
        const totalMonth = await Sale.findAll({
            include: ['fk_saledetail_sale'],
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                [sequelize.literal('(SUM(price * quantity))'), 'total_sales']
            ],
            group: ['month'],
        });
        const total = await saleDetail.findAll({
            attributes: [
                [sequelize.literal('(SUM(price * quantity))'), 'total_sales']
            ]
        });
        const totalPersonMonth = await Sale.findAll({
            include: [
                {
                    model: saleDetail,
                    as: 'fk_saledetail_sale'
                },
                {
                    model: User,
                    as: 'fk_sale_user',
                    attributes: ['name', 'rol_id'],
                    where: {
                        rol_id: 2
                    }
                }
            ],
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                [sequelize.literal('(SUM(price * quantity))'), 'total_sales'],
                [sequelize.literal('name'), 'seller_name']
            ],
            group: ['name','month'],
        });

        return res.render('sales/dashboard',{total,totalPersonMonth, totalMonth, totalSalesPerson, totalSalesMonth, countSales,totalSales, users});
    },

    totalSales: async function (req, res) {
        try {
            const totalSales = await Sale.findAll({
                attributes: [[sequelize.fn("COUNT", sequelize.col("sale_id")), "Cantidad"]]
            });

            const totalSalesMonth = await Sale.findAll({
                attributes: [
                    [sequelize.fn("MONTH", sequelize.col("sale_date")), "month"],
                    [sequelize.fn("COUNT", sequelize.col("sale_id")), "Cantidad"]
                ],
                group: [sequelize.fn("MONTH", sequelize.col("sale_date"))]
            });

            const totalSalesPerson = await Sale.findAll({
                include: [
                    {
                        model: saleDetail,
                        as: 'fk_saledetail_sale'
                    },
                    {
                        model: User,
                        as: 'fk_sale_user',
                        attributes: ['name', 'rol_id'],
                        where: {
                            rol_id: 2
                        }
                    }
                ],
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                    [sequelize.literal('(COUNT(fk_saledetail_sale.sale_id))'), 'total_sales'],
                    [sequelize.literal('name'), 'seller_name']
                ],
                group: ['name','month'],
            });
            
            const totalMonth = await Sale.findAll({
                include: ['fk_saledetail_sale'],
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                    [sequelize.literal('(SUM(price * quantity))'), 'total_sales']
                ],
                group: ['month'],
            });

            const totalPersonMonth = await Sale.findAll({
                include: [
                    {
                        model: saleDetail,
                        as: 'fk_saledetail_sale'
                    },
                    {
                        model: User,
                        as: 'fk_sale_user',
                        attributes: ['name', 'rol_id'],
                        where: {
                            rol_id: 2
                        }
                    }
                ],
                attributes: [
                    [sequelize.fn('MONTH', sequelize.col('sale_date')), 'month'],
                    [sequelize.literal('(SUM(price * quantity))'), 'total_sales'],
                    [sequelize.literal('name'), 'seller_name']
                ],
                group: ['name','month'],
            });
                        
            return res.json({
                totalSales: totalSales,
                totalSalesMonth: totalSalesMonth,
                totalSalesPerson: totalSalesPerson,
                totalMonth: totalMonth,
                totalPersonMonth: totalPersonMonth, 
                status: 200
            });

        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = controller;
