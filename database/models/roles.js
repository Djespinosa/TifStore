module.exports = (sequelize, DataTypes) => {
    let alias = 'roles'
    
    let cols = {
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
    }
    let config = {
        tableName: 'roles',
        timestamps: false
    }
   
    let roles = sequelize.define(alias, cols, config);
    
    roles.associate = function(models){
        roles.hasMany(models.users, {
            as: "fk_user_rol",
            foreignKey: "rol_id"
        });
    }    
    return roles;
    };