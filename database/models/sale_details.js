module.exports = (sequelize, DataTypes) => {
    let alias = "sale_details";

    let cols = {
        sale_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sale_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        quantity : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'sale_details',
        timestamps: false
    }
   
    let sale_details = sequelize.define(alias, cols, config);
    
    sale_details.associate = function(models){
        sale_details.belongsTo(models.products, {
            as: "fk_saledetail_product",
            foreignKey: "product_id"
        });
        sale_details.belongsTo(models.sales, {
            as: "fk_saledetail_sale",
            foreignKey: "sale_id"
        });
    }

    return sale_details;
    };
    