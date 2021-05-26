const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).json({ error: "Não autenticado"});
    }

    try {   
        const data = await jwt.verify(token, process.env.SECRET);
        req.userId = data.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido!"});
    }

}