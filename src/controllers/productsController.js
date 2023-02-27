const db = require('../../database/models/index.js');
const { validationResult } = require('express-validator');

const Product = db.products;
const Category = db.categories;
const Status = db.status;
const port = 3001;

const controller = {
    products: async function (req, res) {
        const product = req.params.product;
        let products;
        let category;
        console.log(products)
        const productsDB = await Product.findAll();
        switch (product) {
            case 'Hogar':
                const PlanHogar = productsDB.filter(
                    (product) => product.category_id == 1
                );
                products = PlanHogar;
                category = 'Hogar';
                break;
            case 'Empresas':
                const PlanEmpresas = productsDB.filter(
                    (product) => product.category_id == 2
                );
                products = PlanEmpresas;
                category = 'Empresas';
                break;
            case 'Equipos':
                const equipo = productsDB.filter(
                    (product) => product.category_id == 3
                );
                products = equipo;
                category = 'Equipos';
                break;
            }            

        res.render('products/products', { products, category });
    },
    detail: async function (req, res) {
        try {
            const id = req.params.id;
            const products = await Product.findAll();
            const product = products.find((product) => product.product_id == id);
            return res.render('products/productDetail', { product });
        } catch (err) {
            console.error(err);
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },
    adminProductUser: (req, res) => {
        const errorInstance = Status.build({
            date: new Date(),
            url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
            message: 'Ingreso al panel de administración'
        });
        errorInstance.save();
        res.render('products/adminProductUser');
    },
    addEditProduct: async function (req, res) {
        try {
            const Categories = await Category.findAll();
            const Products = await Product.findAll({
            include: ['fk_product_category'],
            });
            return res.render('products/add-edit-Product', {
                Products,
                Categories,
            });
        } catch (err) {
            console.error(err);
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },

    addProduct: async function (req, res) {
        try {
            const categories = await Category.findAll();

            return res.render('products/addProduct', {
                categories
            });

        } catch (err) {
            console.error(err);
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },
    create: async function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                await Product.create({
                    category_id: req.body.category_id,
                    reference: req.body.reference,
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    image: req.file?.filename ?? 'default_image.png',
                    
                });
                const errorInstance = await Status.build({
                    date: new Date(),
                    url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                    message: 'Producto creado con éxito'
                });
                errorInstance.save();
                res.redirect('/products/addEditProduct');
            } catch (err) {
                console.error(err);
                const errorInstance = Status.build({
                    date: new Date(),
                    url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                    message: err.message
                });
                errorInstance.save();
            }
        } else {
            const categories = await Category.findAll();
            const Products = await Product.findAll({
                include: ['fk_product_category'],
            });
            const oldData = req.body;
            return res.render('products/addProduct', {
                Products,
                categories,                
                errors: errors.mapped(),
                oldData,
            });
        }
    },
    editProduct: async function (req, res) {
        try {
            const id = req.params.id;
            const categories = await Category.findAll();
            const product = await Product.findByPk(id, {
                include: ['fk_product_category'],
            });
            return res.render('products/editProduct', {
                categories,
                product,
            });
        } catch (err) {
            console.error(err);
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },

    update: async function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const id = req.params.id;
                const product = await Product.findByPk(id);
                await product.update({
                    category_id: req.body.category_id,
                    reference: req.body.reference,
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    image: req.file?.filename ?? 'default_image.png',
                });
                const errorInstance = await Status.build({
                    date: new Date(),
                    url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                    message: 'Producto editado con éxito'
                });
                errorInstance.save();
                res.redirect('/products/addEditProduct');
            }
            catch (err) {
                console.error(err);
                const errorInstance = Status.build({
                    date: new Date(),
                    url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                    message: err.message
                });
                errorInstance.save();
            }
        }
        else {
            const id = req.params.id;
            const categories = await Category.findAll();
            const product = await Product.findByPk(id, {
                include: ['fk_product_category'],
            });
            const oldData = req.body;
            return res.render('products/editProduct', {
                categories,
                product,
                errors: errors.mapped(),
                oldData,
            });
        }
    },

    delete: async function (req, res) {
        try {
            const id = req.params.id;
            await Product.destroy({
                where: { product_id: id },
            });
            const errorInstance = await Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: 'Producto eliminado'
            });
            errorInstance.save();
            return res.redirect('/products/addeditProduct');
        } catch (err) {
            console.error(err);
            const errorInstance = Status.build({
                date: new Date(),
                url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
                message: err.message
            });
            errorInstance.save();
        }
    },
};

module.exports = controller;
