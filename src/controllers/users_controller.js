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
    },

    updatePass: async(req, res) => {
        try {
            const { password, newPassword, confirmNew } = req.body;

            if ( !password || !newPassword || !confirmNew ){
                return res.status(400).json({error: "Por favor, preencha todos os campos."});
            }
            
            const user = await User.findByPk(req.userId);

            if ( password && !(await User.validatePassword(password, user.password))){
                return res.status(400).json({ error: "Senha atual incorreta"});
            }

            if ( !(newPassword === confirmNew)){
                return res.status(400).json({ error: "As senhas não correspondem"});
            }

            const { login, id } = await user.update( {password: newPassword}, {
                where: {
                    id: req.userId
                }
            });

            return res.status(200).json({login, id})

        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    },

}