module.exports = (sequelize, DataTypes) => {
    let alias = "income_details";

    let cols = {
        income_detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        income_id : {
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
        tableName: 'income_details',
        timestamps: false
    }
   
    let income_details = sequelize.define(alias, cols, config);
    
    income_details.associate = function(models){
        income_details.belongsTo(models.products, {
            as: "fk_incomedetail_product",
            foreignKey: "product_id"
        });
        income_details.belongsTo(models.income, {
            as: "fk_incomedetail_income",
            foreignKey: "income_id"
        });
    }

    return income_details;
    };
    