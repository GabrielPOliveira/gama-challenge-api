const { User } = require("../models");
const Yup = require('yup');

module.exports = {
    
    create: async(req,res) => {
        try {

            const schema = Yup.object().shape({
                login: Yup.string().required().max(20),
                password: Yup.string().required().min(6),
                name: Yup.string().required(),
                type: Yup.number().required().min(1).max(2)
            })

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({ error: "Entradas inválidas."});
            }

            const loginExists = await User.findOne({ where: { login: req.body.login }});

            if (loginExists){
                return res.status(400).json({ error: "Usuário já cadastrado" });
            }

            const {uuid, login, name, type} = await User.create(req.body);

            return res.status(200).json({uuid, login, name, type});
            
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    read: async(req, res) => {
        res.status(200).json(await User.findAll());
    },

    update: async(req, res) => {
        try {
            const schema = Yup.object().shape({
                login: Yup.string(),
                currentPassword: Yup.string().min(6),
                password: Yup.string().min(6).when('currentPassword', (currentPassword, schema) => {
                    currentPassword ? schema.required('teste') : schema
                }),
                passwordConfirmation: Yup.string().when('password', (password, schema) => {
                    password ? schema.required().oneOf([Yup.ref('password'), null], 'As senhas não coincidem.') : schema
                })
            })
            
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({error: "Entradas inválidas."})
            }

            const user = await User.findByPk(req.userId);

            let { login, currentPassword } = req.body;

            if (login){
                const loginExists = await User.findOne({ where : {login}});

                if (loginExists) return res.status(400).json({ error: "Login em uso."});
            }

            const valid = await User.validatePassword(currentPassword, user.password);

            if (!valid){
                return res.status(401).json({ error: "Senha atual incorreta."});
            }

            const {uuid, name} = await User.update(req.body, {
                where: { id: req.userId },
                individualHooks: true
            })
            
            return res.status(200).json({uuid, login, name});

        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

}