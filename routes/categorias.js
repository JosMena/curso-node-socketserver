const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria
    } = require('../controllers/categorias');

const { existeCategoriaID } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const router = Router();
/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorías - acceso público
router.get('/', obtenerCategorias);

// Obtener una categoría por id - acceso público
router.get('/:id', [
    check('id', 'No es un ID permitido de mongo').isMongoId(),
    check('id').custom( existeCategoriaID ),
    validarCampos,
], obtenerCategoria);

// Crear una categoría - acceso con token
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],  crearCategoria);

// Actualizar categoría - acceso con token
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaID ),
    validarCampos,
], actualizarCategoria);

// Borrar categoría - acceso administrador
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID permitido de mongo').isMongoId(),
    check('id').custom( existeCategoriaID ),
    validarCampos,
], borrarCategoria);

module.exports = router;