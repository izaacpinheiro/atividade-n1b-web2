const mongoose = require('mongoose');

// arquivo para teste de conexão com o MongoBD
async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URL);

        console.log("MongoDB Atlas conectado com sucesso.")
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error.mongoose);
        process.exit(1);
    }
}

module.exports = connectDB;