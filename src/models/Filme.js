const mongoose = require("mongoose");

// criação do schema de Filme do nosso bd
const filme = mongoose.Schema({
    titulo: String,
    nota: Number,
    code: String
});

module.exports('Filme', filme);