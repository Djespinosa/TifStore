module.exports = (sequelize, DataTypes) => {
    let alias = "categories";

    let cols = {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: false
    }
   
    let categories = sequelize.define(alias, cols, config);
    
    categories.associate = function(models){
        categories.hasMany(models.products, {
            as: "fk_product_category",
            foreignKey: "category_id"
        });
    }
    
    
    return categories;
    };
    