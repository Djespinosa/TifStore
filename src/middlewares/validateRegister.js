const path = require("path");
const { body } = require("express-validator"); 

const validations = [
    body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({min: 4}).withMessage("El nombre debe tener al menos 4 caracteres"),
    body("user_name").notEmpty().withMessage("El usuario es obligatorio").isLength({min: 2}).withMessage("El usuario debe tener al menos 2 caracteres"),
    body("identification_type").notEmpty().withMessage("El tipo de identificación es obligatorio").isLength({min: 2}).withMessage("El tipo de identificación debe tener al menos 2 caracteres"),
    body("identification").notEmpty().withMessage("La identificación es obligatoria").isLength({min: 5}).withMessage("La identificación debe tener al menos 5 caracteres"),
    body("address").notEmpty().withMessage("La dirección es obligatoria").isLength({min: 2}).withMessage("La dirección debe tener al menos 6 caracteres"),
    body("phone").notEmpty().withMessage("El celular es obligatorio").isLength({min: 10}).withMessage("El celular debe tener al menos 10 caracteres"),
    body("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Debes escribir el email en un formato válido"),
    //incluir mayusculas, minusculas, numeros y caracteres especiales
    body("password").notEmpty().withMessage("La contraseña es obligatoria").bail().isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{8,}/).withMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"),
    body("rol_id").notEmpty().withMessage("El rol es obligatorio"),
    body("image").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".jpeg", ".gif", ".png", ".JPG", ".JPEG", ".PNG", ".GIF"];
        if (!file) {
            req.file = "user_01.png";
        } else { 
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Solo se admiten formatos de imagen: ${acceptedExtensions.join(", ")}`);
        }
      }
        return true;
    }),
];

    module.exports = validations;

    // if (!file || !acceptedExtensions.includes(path.extname(file.originalname))) //! Validación alternativa