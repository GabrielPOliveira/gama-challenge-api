const { User } = require("../models")

module.exports = {
    
    create: async(req,res) => {
        try {
            const {login, password, name} = req.body;
            const user = await User.create({
                login,
                password,
                name
            });
            user.password = undefined;
            res.status(200).send(user);
            
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}