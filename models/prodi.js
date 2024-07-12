const mongoose = require('mongoose');

const prodiSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    kode: {
        type: String,
        required: true
    },
    akreditasi: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Prodi', prodiSchema);