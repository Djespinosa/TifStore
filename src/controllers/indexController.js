const db = require('../../database/models/index.js');

const Category = db.categories;
const Status = db.status;
const port = 3001;

const controller = {
  index: async function(req, res){
    try {      
      const categories = await Category.findAll();      
      return res.render("index",{categories});
      } catch (err){
        console.error(err)
        const errorInstance = Status.build({
          date: new Date(),
          url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
          message: err.message
      });
      errorInstance.save();
        }
  },
  unauthorized: async function(req, res){
    try {        
      return res.render("users/unauthorized");
      } catch (err){
        console.error(err)
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
