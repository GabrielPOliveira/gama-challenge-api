const {BloodType} = require('../models');

module.exports = {
    index: async(req, res) => {
        try {
            const types = await BloodType.findAll();

            /*const mapped = types.map(item => {
                return item.type;
            })*/

            return res.status(200).json(types);
        } catch (error){
            return res.status(400).json({error: error.message});
        }
    }
}