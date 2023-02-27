module.exports = (sequelize, DataTypes) => {
    let alias = 'products'
    let cols = {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reference: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false            
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },   
}
    let config = {
        tableName: 'products',
        timestamps: false
    }
    
    let products = sequelize.define(alias, cols, config);
    
    products.associate = function(models){
        products.hasMany(models.income_details, {
            as: "fk_incomedetail_product",
            foreignKey: "product_id"
        });
        products.hasMany(models.sale_details, {
            as: "fk_saledetail_product",
            foreignKey: "product_id"
        });
        products.belongsTo(models.categories,{
            as: "fk_product_category",
            foreignKey: "category_id"
        });

    }
    return products;
    };
    