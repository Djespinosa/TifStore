module.exports = (sequelize, DataTypes) => {
    let alias = "income";

    let cols = {
        income_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        income_reference: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        income_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
    }
    }

    let config = {
        tableName: 'income',
        timestamps: false
    }
   
    let income = sequelize.define(alias, cols, config);
    
    income.associate = function(models){
        income.belongsTo(models.users,{
            as: "fk_income_user",
            foreignKey: "user_id"
        });
        income.hasMany(models.income_details, {
            as: "fk_incomedetail_income",
            foreignKey: "income_id"
        });        
    }    
    return income;
    };
    