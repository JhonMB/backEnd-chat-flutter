const bcrypt = require('bcryptjs');
const { response } = require('express');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            // Cambiar el mensaje
            return res.status(400).json({ ok: false, msg: 'El correo ya está registrado!' });
        }

        const user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Guardar en la base de datos
        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({ ok: true, user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hable con el administrador!' });
    }


}

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeUserDB = await User.findOne({ email });
        if (!existeUserDB) {
            // Cambiar el mensaje
            return res.status(404).json({ ok: false, msg: 'Correo no encontrado' });
        }

        // Validar password
        const validatePassword = bcrypt.compareSync(password, existeUserDB.password);
        if (!validatePassword) {
            // Cambiar el mensaje
            return res.status(400).json({ ok: false, msg: 'La contraseña no es valida!' });
        }

        // Generar JWT
        const token = await generateJWT(existeUserDB.id);

        res.json({ ok: true, existeUserDB, token });

    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: 'Upps ocurrio un error porfavor hable con el administrador!' });

    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // Generar JWT
    const token = await generateJWT(uid);
    // Obtener usuario por Id
    const user = await User.findById(uid);

    res.json({ ok: true, user, token });
    // res.json({ ok: true, uid: req.uid });
}

module.exports = { crearUsuario, login, renewToken };