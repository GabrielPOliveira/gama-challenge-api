const { Client, Doctor, Appointment, AppointmentStatus, MedicalHistory } = require('../models');
const  Yup  = require('yup');

module.exports = {

    index: async(req,res) => {
        
        
        try {
            
            const appointments = await Appointment.findAll({
                include: [
                    {model: Client, attributes: ['name']},                   
                    {model: AppointmentStatus, attributes: ['status']},
                    {model: Doctor, attributes: ['name']},                   
                    
                ]
            });

            res.status(200).json({message: "Sucesso", appointments});

        } catch (error) {
            res.status(400).json({error: error.message})
            
        }
       
        
    },

    find: async(req,res) => {
        
        try {
            const { uuid } = req.params;

            const appointments = await Appointment.findOne({
                where: { uuid: uuid },                                
                include: [
                    {model: Client, attributes: ['name']},
                    {model: Doctor, attributes: ['name', 'register']},
                    {model: AppointmentStatus, attributes: ['status']},

                ]
            });
            

            res.status(200).json({message: "Sucesso", appointments});

        } catch (error) {
            res.status(400).json({error: error.message})
            
        }
    },

    create: async(req,res) => {
        
        try {

            const { scheduling_date, value, clientsId, doctorsId, appointments_statusId } = req.body;

            const schema = Yup.object().shape({
                scheduling_date: Yup.date().required(),
                value: Yup.number(),
                clientsId: Yup.number().required(),
                doctorsId: Yup.number().required(),
                appointments_statusId: Yup.number().required(),                
            });

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                    error: 'Falha na validação'
                })
            }
            
            const appointments = await Appointment.create({
                scheduling_date,
                value, 
                clientsId, 
                doctorsId, 
                appointments_statusId, 
            });
            

            res.status(201).json({message: "Sucesso", appointments});


        }catch (error) {            
            res.status(400).json({error: error.message})

        }   
    },

    update: async(req,res) => {
               
        try {
            
            const { scheduling_date, value, clientsId, doctorsId, appointments_statusId } = req.body;
            const { uuid } = req.params;

            const schema = Yup.object().shape({
                scheduling_date: Yup.date().required(),
                value: Yup.number(),
                clientsId: Yup.number().required(),
                doctorsId: Yup.number().required(),
                appointments_statusId: Yup.number().required(),                
            });

            if (!(await schema.isValid(req.body)) || !uuid){
                return res.status(400).json({
                    error: 'Falha na validação'
                })
            }
                
            const appointment = await Appointment.findOne({where: {uuid: uuid}})

            const appointmentUp = await appointment.update({
                scheduling_date,
                value, 
                clientsId, 
                doctorsId, 
                appointments_statusId,    
            });

            res.status(200).json({message: "Sucesso", appointmentUp});


        } catch (error) {
            res.status(400).json({error: error.message})
    
        }
    },

    endAppointment: async(req,res) => { 

        try {

            const { uuid } = req.params;
            const { description } = req.body;
            const { appointment_date, clientsId, doctorsId, appointments_statusId } = req.body;
            
            
            if(appointments_statusId != 2) {
                return res.status(400).json({
                    error: 'Status Inválido'
                })
            }

            const schema = Yup.object().shape({
                appointment_date: Yup.date().required(),    
                appointments_statusId: Yup.number().required(),                
            });

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                    error: 'Falha na validação'
                })
            }

            const appointment = await Appointment.findOne({where: {uuid: uuid}})

            const appointmentUp = await appointment.update({
                appointment_date, 
                appointments_statusId,    
            });

            const client = await Client.findOne({where: {id: clientsId}});

            const medicalHistory = await MedicalHistory.create({
                date: appointment_date,
                description,
                medicalRecordsId: client.medicalRecordsId,
                doctorsId,                
            });


            res.status(201).json({message: "Sucesso", medicalHistory});


        } catch (error) {
            res.status(400).json({error: error.message})
    
        }
    }
}