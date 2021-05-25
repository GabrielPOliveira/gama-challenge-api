const { User } = require("../models")

module.exports = {
    
    create: async(req,res) => {
        try {
            const {login, password, name} = req.body;

            const loginExists = await User.findOne({ where: { login }});

            if (loginExists){
                return res.status(400).send("Usuário já cadastrado");
            }

            const user = await User.create({
                login,
                password,
                name
            });
            user.password = undefined;
            res.status(200).send(user);
            
        } catch (error) {
            res.status(400).send(error.message) //erro da validação no model
        }
    },

    read: async(req, res) => {
        res.status(200).send(await User.findAll());
    }
}