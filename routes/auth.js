/* 
    path: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const route = Router();

route.post('/new', [
    // Validaciones de Datos
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validarCampos
], crearUsuario);

route.post('/', [
    // Validaciones de Datos
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),

], login);

// Validar JWT
route.get('/renew', validarJWT, renewToken);

module.exports = route;