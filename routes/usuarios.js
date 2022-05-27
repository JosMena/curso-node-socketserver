
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol,
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPost, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),  // check('rol').custom( (rol) => esRolValido{ rol } ), 
    validarCampos
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioID ),
    validarCampos
], usuariosDelete );


module.exports = router;