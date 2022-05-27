const { Router } = require('express');
const { check } = require('express-validator');

const { 
    actualizarProducto,
    borrarProducto, 
    crearProducto, 
    obtenerProducto, 
    obtenerProductos,
} = require('../controllers/productos');

const { existeProductoID, existeCategoriaID } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');

const router = Router();


// Obtener todas los productos - acceso público
router.get('/', obtenerProductos);


// Obtener un producto por id - acceso público
router.get('/:id', [
    check('id', 'No es un ID permitido de mongo').isMongoId(),
    check('id').custom( existeProductoID ),
    validarCampos,
], obtenerProducto);


// Crear un producto - acceso con token
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoriaID ),
    validarCampos,
],  crearProducto);


// Actualizar producto - acceso con token
router.put('/:id', [
    validarJWT,
    //check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom( existeProductoID ),
    validarCampos,
], actualizarProducto);


// Borrar producto - acceso administrador
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID permitido de mongo').isMongoId(),
    check('id').custom( existeProductoID ),
    check('categoria').optional().custom( existeCategoriaID ),
    validarCampos,
], borrarProducto);


module.exports = router;