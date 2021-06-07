const {Speciality} = require('../models')

module.exports = {
    index: async(req, res) => {
        try {
            const specialities = await Speciality.findAll();
            
            return res.status(200).json(specialities);
        } catch (error){
            return res.status(400).json({error: error.message});
        }
    }
}