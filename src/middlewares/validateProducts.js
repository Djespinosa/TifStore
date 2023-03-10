const path = require("path");
const { body } = require("express-validator");


const validations = [
    body("reference").notEmpty().withMessage("La referencia es obligatoria").isLength({ min: 10 }).withMessage("La referencia debe tener al menos 10 caracteres"),
    body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
    body("description").notEmpty().withMessage("La descripción es obligatoria").isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres"),
    body("price").notEmpty().withMessage("El precio es obligatorio").isNumeric().withMessage("El precio debe ser un número").isInt({ min: 0 }).withMessage("El precio debe ser mayor o igual a 0"),
    body("stock").notEmpty().withMessage("El stock es obligatorio").isNumeric().withMessage("El stock debe ser un número").isInt({ min: 0 }).withMessage("El stock debe ser mayor o igual a 0"),
    body("category_id").notEmpty().withMessage("Debe seleccionar una categoría"),
    body("image").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".jpeg", ".gif", ".png", ".JPG", ".JPEG", ".PNG", ".GIF"];
        if (!file) {
            req.file = "product_01.png";
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Solo se admiten formatos de imagen: ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    }
    ),
];


module.exports = validations;
