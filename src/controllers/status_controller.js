const { AppointmentStatus } = require('../models');

module.exports = { 

    index: async(req,res) => {
                
        try {
            
            const appointmentStatus = await AppointmentStatus.findAll();

            res.status(200).json({message: "Sucesso", appointmentStatus});

        } catch (error) {
            res.status(400).json({error: error.message})
            
        }
       
        
    },


}