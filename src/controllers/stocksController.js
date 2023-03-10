const { validationResult } = require("express-validator");
const db = require('../../database/models/index');

const Income = db.income;
const IncomeDetail = db.income_details;
const Product = db.products;
const User = db.users;
const Status = db.status;
const port = 3001;

const controller = {
    adminStock: async function(req, res){
        try {
            const products = await Product.findAll();
            const users = await User.findAll();
            const income = await Income.findAll({include :["fk_income_user"]});
            const incomeDetail = await IncomeDetail.findAll({include :["fk_incomedetail_product", "fk_incomedetail_income"]});
        return res.render("stock/adminStock",{income, incomeDetail, products, users});
        } catch (err){
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },
    income: async function(req, res){
        try {            
            const products = await Product.findAll();
            const incomeDetail = await IncomeDetail.findAll({include :["fk_incomedetail_product"]});
        return res.render("stock/income",{incomeDetail, products, user: req.session.userLogged,});
        } catch (err){
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    }, 
    incomeForm1: async function(req, res){
        const objeto = req.body;
        try {     
            const resultado = [];

            const productIds = Array.isArray(objeto.product_id) ? objeto.product_id : [parseInt(objeto.product_id)];
            const prices = Array.isArray(objeto.price) ? objeto.price : [objeto.price];
            const quantities = Array.isArray(objeto.quantity) ? objeto.quantity : [objeto.quantity]; 

            const income = await Income.create({
                    user_id: req.session.userLogged.user_id,
                    income_reference: req.body.income_reference,
                    income_date: req.body.income_date,
                    status: true
                });
                            
            for (let i = 0; i < productIds.length; i++) {
                const item = {
                    product_id: parseInt(productIds[i]),
                    income_id: income.income_id,                    
                    price: parseFloat(prices[i]),
                    quantity: parseInt(quantities[i])
                };          
            resultado.push(item);
            }

            await IncomeDetail.bulkCreate(resultado);
            
            for (let i = 0; i < resultado.length; i++) {
                const item = resultado[i];
                const product = await Product.findByPk(item.product_id);
                if (product) {
                  // Sumar la cantidad ingresada a la cantidad actual del producto
                const newQuantity = product.stock + item.quantity;
                await product.update({ stock: newQuantity });
                }
            }
            const errorInstance = await Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: 'Ingreso de factura exitoso'
            });
            errorInstance.save();

            return res.redirect("/stocks/adminStock");

        } catch (err){
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    }      
    
}

module.exports = controller;