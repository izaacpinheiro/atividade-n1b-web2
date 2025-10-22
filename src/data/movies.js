const bcrypt = require('bcrypt');

const movies = [
    {
        id: '1',
        title: 'Interestelar',
        nota: 10
    },
    {
        id: '2',
        title: 'Tenet',
        nota: 8
    }
];

// dados mockados dos usuários
const users = [
    {
        id: '1',
        email: 'izaac@exemplo.com',
        password: bcrypt.hashSync('1234', 10)
    },
    {
        id: '2',
        email: 'pedro@exemplo.com',
        password: bcrypt.hashSync('4321', 10)
    }
];

module.exports = { movies, users };