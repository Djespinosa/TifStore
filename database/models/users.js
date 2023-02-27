module.exports = (sequelize, DataTypes) => {
    let alias = 'users'
    
    let cols = {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false        
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    identification_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    identification: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }
    
    let users = sequelize.define(alias, cols, config);
    
    users.associate = function(models){
        users.hasMany(models.income, {
            as: "fk_income_user",
            foreignKey: "user_id"
        });
        users.hasMany(models.sales, {
            as: "fk_sale_user",
            foreignKey: "user_id"
        });
        users.belongsTo(models.roles,{
            as: "fk_user_rol",
            foreignKey: "rol_id"
        });
    }
    return users;
    };