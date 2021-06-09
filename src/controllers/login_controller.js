const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async(req, res) => {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ where: { login } });

            const valid = await User.validatePassword(password, user.password)

            if (!valid) {
                return res.status(401).json({error: "Senha incorreta"})
            }
                
            const id = user.id;

            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: "6h"
            });
            
            return res.json({ user: {login, id}, token});
            
        } catch (error) {
            res.status(401).json({ error: "Usuário ou senha inválidos." })
        }

    }
}