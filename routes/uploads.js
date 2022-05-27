const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoUpload } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');

const router = Router();

router.post( '/', validarArchivoUpload, cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
// ], actualizarImagen );
], actualizarImagenCloudinary );

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen );

module.exports = router;