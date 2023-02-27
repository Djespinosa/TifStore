module.exports = (sequelize, DataTypes) => {
    let alias = "status";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }    
    }

    let config = {
        tableName: 'status',
        timestamps: false
    }

    let status = sequelize.define(alias, cols, config);
    
    
    return status;
    };