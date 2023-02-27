module.exports = (sequelize, DataTypes) => {
    let alias = "sales";

    let cols = {
        sale_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sale_reference: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        sale_date: {
            type: DataTypes.DATE,
            allowNull: false
        },        
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
    }
    }

    let config = {
        tableName: 'sales',
        timestamps: false
    }
   
    let sales = sequelize.define(alias, cols, config);
    
    sales.associate = function(models){
        sales.belongsTo(models.users,{
            as: "fk_sale_user",
            foreignKey: "user_id"
        });
        sales.hasMany(models.sale_details, {
            as: "fk_saledetail_sale",
            foreignKey: "sale_id"
        });        
    }    
    return sales;
    };
    