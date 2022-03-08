const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: { type: String, required: true },
    online: { type: Boolean, default: false },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Mostrar o oculatar propiedades
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);