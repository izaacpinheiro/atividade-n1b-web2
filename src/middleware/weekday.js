// middleware para permitir acessos apenas de segunda a sexta
module.exports = function(req, res, next) {
    const day = new Date().getDay(); // 0 domingo - 6 sabado
    if (day >= 1 && day <= 5) return next();
    return res.status(403).json({ error: 'API só pode ser acessada de Segunda a Sexta.'});
}