const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // Leer token
    const token = req.header('x-token');
    /* console.log(token);
    next(); */

    if (!token) {
        // Cambiar mensaje
        return res.status(401).json({ ok: false, msg: 'No hay tokent en la petición' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        // Cambiar mensaje
        return res.status(401).json({ ok: false, msg: 'Tokent no válido' });
    }

    // return 
}

module.exports = { validarJWT }