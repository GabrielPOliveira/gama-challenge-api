const { User } = require("../models")

module.exports = {
    
    create: async(req,res) => {
        try {
            const {login, password, name} = req.body;

            if (!login){
                return res.status(400).json({ error: "Usuário precisa de um login!" });
            } 

            const loginExists = await User.findOne({ where: { login }});

            if (loginExists){
                return res.status(400).json({ error: "Usuário já cadastrado" });
            }

            const user = await User.create({
                login,
                password,
                name
            });
            user.password = undefined;
            return res.status(200).json(user);
            
        } catch (error) {
            res.status(400).json({ error: error.message }) //erro da validação no model
        }
    },

    read: async(req, res) => {
        res.status(200).json(await User.findAll());
    }
}