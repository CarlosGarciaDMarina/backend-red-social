const validator = require("validator");

const validationRules = {
    name: [
      (val) => !validator.isEmpty(val),
      (val) => validator.isLength(val, { min: 3, max: 15 }),
      (val) => validator.isAlpha(val, "es-ES")
    ],
    surname: [
      (val) => !validator.isEmpty(val),
      (val) => validator.isLength(val, { min: 3, max: 15 }),
      (val) => validator.isAlpha(val, "es-ES")
    ],
    nick: [
      (val) => !validator.isEmpty(val),
      (val) => validator.isLength(val, { min: 1, max: 15 })
    ],
    email: [
      (val) => !validator.isEmpty(val),
      (val) => validator.isEmail(val)
    ],
    password: [
      (val) => !validator.isEmpty(val)
    ],
    bio: [
      // Para el bio, permitimos que sea vacío, pero si se ingresa algo,
      // verificamos que no exceda la longitud permitida
      (val) => validator.isLength(val || "", { min: 0, max: 255 })
    ]
};


const validate = (params) => {
    try {
        // Iteramos sobre cada campo definido en las reglas
        for (const field in validationRules) {
            // Obtenemos el arreglo de validaciones para el campo actual
            const rules = validationRules[field];
            // Aseguramos que exista el valor en params, en caso de que no lo haya, lo tratamos como cadena vacía
            const value = params[field] || "";
            
            // Iteramos sobre cada regla para este campo
            for (const rule of rules) {
                if (!rule(value)) {
                // Si la validación falla, lanzamos un error con un mensaje descriptivo
                throw new Error(`La validación de '${field}' no fue superada`);
                }
            }
        }
        // Si todas las validaciones pasan, devolvemos un resultado positivo
        return { valid: true, message: "Validación superada" };
    } catch (error) {
        // Si ocurre algún error (una validación falló), se captura aquí y se devuelve el mensaje
        return { valid: false, message: error.message };
    }
};

module.exports = { validate };