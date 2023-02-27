const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require('../../database/models/index');

const User = db.users;
const Rol = db.roles;
const Status = db.status;
const port = 3001;
  
const controller = {
  addEditUser: async function(req, res){
    try {
      const roles = await Rol.findAll();
      const users = await User.findAll({include :["fk_user_rol"]});
    return res.render("users/addEditUser",{roles,users});
    } catch (err){
      console.error(err);
      const errorInstance = Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: err.message
    });
    errorInstance.save();
    }
  },
  editUser: async function(req, res){
    try {
      const id = req.params.id;      
      const roles = await Rol.findAll();
      const users = await User.findByPk(id, {include :["fk_user_rol"]});    
    return res.render("users/editUser",{roles,users});
    } catch (err){
      console.error(err);
      const errorInstance = Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: err.message
    });
    errorInstance.save();
    }
  },
  update: async function(req, res){
    try {
      const users = await User.findAll();
      const roles = await Rol.findAll();
      const validation = validationResult(req);
          
      if (validation.errors.length > 0) {
          return res.render("users/editUser", {
            oldData: req.body,
            users: users,
            roles: roles,
            errors: validation.mapped(),
          });
        }
          const userEdit= {
            name: req.body.name,
            user_name: req.body.user_name,
            identification_type: req.body.identification_type,
            identification: req.body.identification,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            rol_id: req.body.rol_id,
            image: req.file?.filename ?? "user_01.png"
          } 
          
          await User.update(userEdit,{
                where : {user_id: req.params.id}
              });
          
          const errorInstance = await Status.build({
            date: new Date(),
            url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
            message: 'Usuario editado con éxito'
          });
          errorInstance.save();
        
          return res.redirect('/users/addEditUser');      
    } catch (err){
      console.error(err);
      const errorInstance = Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: err.message
    });
    errorInstance.save();
    }
    },
  loginProcess: async (req, res) => {
    const checkLogUser = req.body.logUser;
    const userToLogin = await User.findOne({
      where :{
        user_name: checkLogUser,
      }
      })
    if (userToLogin) {
      const passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (passwordOk) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
            const errorInstance = await Status.build({
              date: new Date(),
              url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
              message: 'Login con exito'
            });
            errorInstance.save();
        return res.redirect("/");
      } else {
        return res.render("users/login", {
          errors: {
            password: {
              msg: "La contraseña es incorrecta",
            },
          },
        });
      }
    }    
    return res.render("users/login", {
      errors: {
        logUser: {
          msg: "El usuario no está registrado",
        },
      },
    });
  },

  login: (req, res) => {
    res.render("users/login");
  },
  register: async (req, res) => {
    try{
      const roles = await Rol.findAll();
      res.render("users/register",{roles});
    } catch (err){
    console.error(err);
    const errorInstance = Status.build({
      date: new Date(),
      url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
      message: err.message
  });
  errorInstance.save();
  }
  },
  
  registerProcess: async function(req, res){
    try {
      const roles = await Rol.findAll();  
      const validation = validationResult(req);
            if (validation.errors.length > 0) {
            return res.render("users/register", {
              roles: roles,
              errors: validation.mapped(),
              oldData: req.body,
            });
          }
      const checkEmail = req.body.email;
        const emailinDB = await User.findOne({
              where :{email: checkEmail}  });
          if (emailinDB) {
            return res.render("users/register", {
              errors: {
                email: {
                  msg: "El email ya esta registrado",
                },
              },
              oldData: req.body,
            });
          }

        const checkLogUser = req.body.user_name;
          const userDB = await User.findOne({
                where :{user_name: checkLogUser}});
            if (userDB) {
              return res.render("users/register", {
                errors: {
                  logUser: {
                    msg: "El usuario ya esta registrado",
                  },
                },
                oldData: req.body,
              });
            }          
          const userToCreate = {
            name: req.body.name,
            user_name: req.body.user_name,
            identification_type: req.body.identification_type,
            identification: req.body.identification,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            rol_id: req.body.rol_id,
            image: req.file?.filename ?? "user_01.png"
          };        
          
          await User.create(userToCreate);

          const errorInstance = await Status.build({
            date: new Date(),
            url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
            message: 'Usuario registrado con éxito'
          });
          errorInstance.save();

          return res.redirect("/users/login");
          
    } catch (err){
      console.error(err);
      const errorInstance = Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: err.message
    });
    errorInstance.save();
    }
    },
  profile: (req, res) => {
    res.render("users/profile", { user: req.session.userLogged });
  }, 
  logout: (req, res) => {
    req.session.destroy();
    const errorInstance = Status.build({
      date: new Date(),
      url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
      message: 'Sesión cerrada'
    });
    errorInstance.save();
    
    res.redirect("/");
  },
  delete: async function(req, res){
    try{
      const id = req.params.id;
      await User.destroy({
        where: {user_id:id}
      });
      const errorInstance = await Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: 'Usuario borrado'
      });
      errorInstance.save();
      return res.redirect("/users/addEditUser");
    } catch(err){
      console.error(err);
      const errorInstance = Status.build({
        date: new Date(),
        url: `${req.protocol}://localhost:${port}${req.originalUrl}`,
        message: err.message
    });
    errorInstance.save();
    }
  }
}

module.exports = controller;
