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
            
            const income = await Income.create({
                    user_id: req.session.userLogged.user_id,
                    income_reference: req.body.income_reference,
                    income_date: req.body.income_date,
                    status: true
                });
                            
            for (let i = 0; i < objeto.product_id.length; i++) {
                const item = {
                    product_id: parseInt(objeto.product_id[i]),
                    income_id: income.income_id,
                    price: parseInt(objeto.price[i]),
                    quantity: parseInt(objeto.quantity[i])
                };          
            resultado.push(item);
            }

            await IncomeDetail.bulkCreate(resultado);
            
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