const { Doctor, Address, Speciality } = require('../models');
const  Yup  = require('yup');

module.exports = {

    index: async(req,res) => {
        try {
            
            const doctors = await Doctor.findAll();

            res.status(200).send(doctors); 


        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    find: async(req, res) => {

        try {
            
            const schema = Yup.object().shape({
                uuid: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                     message: 'UUID do Médico não encontrado'
                })
            }

            const doctor = await Doctor.findOne({
                where: { uuid: req.body.uuid },                                
                include: [{model: Address}, {model: Speciality, attributes: ['description']}]
                //include: {all:true}
                 
            });
           
            res.status(200).send(doctor); 


        } catch (error) {
            res.status(400).send(error.message)        
        }

    },

    create: async(req, res) => {

        try {
            
            const {name, register, phone, cellphone, email, specialitiesId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;

            const registerExists = await Doctor.findOne({ where:{ register: register }});            
            if (registerExists != null){
                    return res.status(400).send("Registro já cadastrado");
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                register: Yup.string().required(),
                phone: Yup.string(),
                cellphone: Yup.string(),
                email: Yup.string().email(),
                specialitiesId: Yup.number().required(),

                zip_code: Yup.string().required(),
                address: Yup.string().required(),
                number: Yup.string().required(),
                complement: Yup.string(),
                neighborhood: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),                
            });
                                    
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                     message: 'Falha na validação'
                })
            }

            const addressDoctor = await Address.create({
                zip_code,
                address,
                number,
                complement,
                neighborhood,
                city,
                state
            });
            if(!addressDoctor){               
                return res.status(400).send(error.message)
            }

            const doctor = await Doctor.create({
                name, 
                register, 
                phone, 
                cellphone, 
                email, 
                specialitiesId,
                addressId: addressDoctor.id
            });

            
            res.status(201).send(doctor);


        } catch (error) {
            res.status(400).send(error.message)
        }

    },

    update: async(req, res) => {

        try {
            
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                register: Yup.string().required(),
                phone: Yup.string(),
                cellphone: Yup.string(),
                email: Yup.string().email(),
                specialitiesId: Yup.number().required(),

                zip_code: Yup.string().required(),
                address: Yup.string().required(),
                number: Yup.string().required(),
                complement: Yup.string(),
                neighborhood: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),                
            });

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                     message: 'Falha na validação'
                })
            }

            const {uuid, name, register, phone, cellphone, email, specialitiesId, addressId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;

            const doctor = await Doctor.findOne({where: {uuid: uuid}})

            if (register && register !== doctor.register){ 

                const doctorExists = await Doctor.findOne({ where: {register: register }});

                if(doctorExists){

                    return res.status(400).json({ error: 'Registro já cadastrado' })
                }
            }

            const DoctorUp = await doctor.update({
                name: name, 
                register: register, 
                phone: phone, 
                cellphone: cellphone, 
                email: email, 
                specialitiesId: specialitiesId,                
            });
            const addressDoctor = await Address.update({
                zip_code: zip_code,
                address: address,
                number: number,
                complement: complement,
                neighborhood: neighborhood,
                city: city,
                state: state,
            }, {where: {id: addressId}});

            const DoctorUpdate = await Doctor.findOne({
                where: { uuid: uuid },                
                include: Address
            });
            
            res.status(201).send(DoctorUpdate)


        } catch (error) {
            res.status(400).send(error.message)
            
        }

    }


}