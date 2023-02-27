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
        console.log(req.url)
        res.render('products/productCart', { products});

    },

    createSale: async function (req, res) {
        try {            
            const objeto = req.body;
            const resultado = [];
            
            const sale = await Sale.create({
                    user_id: req.session.userLogged.user_id,
                    sale_reference: "STIF" + Date.now(),
                    sale_date: new Date(),
                    status: true
                });
                            
            for (let i = 0; i < objeto.product_id.length; i++) {
                const item = {
                    product_id: parseInt(objeto.product_id[i]),
                    sale_id: sale.sale_id,
                    price: parseInt(objeto.price[i]),
                    quantity: parseInt(objeto.quantity[i])
                };          
            resultado.push(item);
            }

            await saleDetail.bulkCreate(resultado);

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
            attributes: [[sequelize.col('sale_reference'),'sale_reference'],[sequelize.fn("sum", sequelize.col("price")), "Total"]],
            group: ["fk_saledetail_sale.sale_id"]            
        });
        return res.render('sales/dashboard',{totalSales, users});
    }
};

module.exports = controller;
