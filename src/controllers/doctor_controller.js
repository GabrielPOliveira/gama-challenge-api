const { Doctor, Address, Speciality, User } = require('../models');
const  Yup  = require('yup');

module.exports = {

    index: async(req,res) => {
        try {       
            const doctors = await Doctor.findAll({
                include: [{model: Speciality, attributes: ['description']}]
            });

            res.status(200).json(doctors); 

        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },

    find: async(req, res) => {
        try {           
            const schema = Yup.object().shape({
                id: Yup.number().required()
            });

            if (!(await schema.isValid(req.params))){
                return res.status(400).json({
                    error: 'ID inválido.'
                })
            }

            const doctor = await Doctor.findOne({
                where: { id: req.params.id },                                
                include: [{model: Address}, {model: Speciality, attributes: ['description']}]
      
            });

            if(!doctor){
                return res.status(400).json({error: 'Médico não encontrado.'});
            }
           
            res.status(200).json(doctor); 

        } catch (error) {
            res.status(400).json({error: error.message})        
        }

    },

    create: async(req, res) => {
        try {

            const typeMedico = 2;

            const {name, register, phone, cellphone, email, specialitiesId, login, password} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;

            const registerExists = await Doctor.findOne({ where:{ register: register }});            
            if (registerExists != null){
                    return res.status(400).json({error: "Registro já cadastrado"});
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
                
                login: Yup.string().required().max(20),
                password: Yup.string().required().min(6),
                
            });
                                    
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                    error: 'Falha na validação'
                })
            }
            
            const loginExists = await User.findOne({ where: { login: req.body.login }});

            if (loginExists){
                return res.status(400).json({ error: "Usuário já cadastrado" });
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
                throw new Error();
            }


            const userMedico = await User.create({    
                name,           
                login,
                password,
                type: typeMedico,
            });
            
            const doctor = await Doctor.create({
                name, 
                register, 
                phone, 
                cellphone, 
                email, 
                specialitiesId,
                addressId: addressDoctor.id
            });
            
            res.status(201).json({message: "Sucesso", doctor});

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

            const uuid = req.params.uuid;
            if (!(await schema.isValid(req.body)) || !uuid){
                return res.status(400).json({
                    error: 'Falha na validação'
                })
            }

            const {name, register, phone, cellphone, email, specialitiesId, addressId} = req.body;
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
            
            res.status(201).json({ message: "Sucesso", DoctorUpdate})


        } catch (error) {
            res.status(400).json({error: error.message});
            
        }

    }

}