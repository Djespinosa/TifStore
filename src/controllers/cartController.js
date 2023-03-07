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
            const resultado = [];
            
            const productIds = Array.isArray(objeto.product_id) ? objeto.product_id : [objeto.product_id];
            const prices = Array.isArray(objeto.price) ? objeto.price : [objeto.price];
            const quantities = Array.isArray(objeto.quantity) ? objeto.quantity : [objeto.quantity]; 

            const sale = await Sale.create({
                    user_id: req.session.userLogged.user_id,
                    sale_reference: "STIF" + Date.now(),
                    sale_date: new Date(),
                    status: true
                });
                            
            for (let i = 0; i < objeto.product_id.length; i++) {
                const item = {
                    product_id: parseInt(productIds[i]),
                    sale_id: sale.sale_id,
                    price: parseInt(prices[i]),
                    quantity: parseInt(quantities[i])
                };          
            resultado.push(item);
            }

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
        // console.log(req.body);
        // res.redirect('/products/products-list/Hogar');
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
        return res.render('sales/dashboard',{totalSales, users});
    },

    productList: async function (req, res) {
        try {
            const productsList = await Product.findAll({
                include: {all: true},
                attributes: ['id','name','description',
                        [sequelize.col('name_product_category'),'name_product_category'],
                        [sequelize.col('name_color'),'name_color'],
                        [sequelize.col('name_size'),'name_size'],'price', 'url'
                ]
            })
           
            const countByCategory = await Product.findAll({
                include: ['fkproduct_category'],
                attributes: [[sequelize.col('name_product_category'),'name_product_category'],[sequelize.fn("COUNT", sequelize.col("category_id")), "Cantidad"]],
                group: ["name_product_category"]
                
            })
            const countCategory = await ProductCategory.findAll({                               
            })         
            
            return res.json({
                count: productsList.length,
                countByCategory: countByCategory,
                products: productsList,
                countCategory: countCategory.length,                
                status: 200
            });

        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = controller;
