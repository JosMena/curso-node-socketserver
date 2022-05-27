const { Categoria, Role, Usuario, Producto } = require('../models');


// Verificar si el rol es válido
const esRolValido = async( rol = '' ) => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
    }
}

// Verificar si correo existe
const emailExiste = async( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El email ${ correo } ya está registrado en la base de datos`);
    }
}

// Verificar si existe usuario
const existeUsuarioID = async( id ) => {
    
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id ${ id } no está registrado en la base de datos`);
    }
}


/**
 * Validaciones de Categorías
 */

const existeCategoriaID = async( id ) => {
    
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`La categoría con ID ${ id } no existe en la base de datos`);
    }
}


/**
 * Validaciones de Productos
 */

 const existeProductoID = async( id ) => {
    
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ){
        throw new Error(`El producto con ID ${ id } no existe en la base de datos`);
    }
}


/**
 * Validaciones de Productos
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error( `La colección ${ coleccion } no es permitida, ${ colecciones }` );
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID,
    existeCategoriaID,
    existeProductoID,
    coleccionesPermitidas,
}