const { Client, Doctor, Address, BloodType, MedicalRecords, MedicalHistory } = require('../models');
const CPF = require("@fnando/cpf/commonjs");
const  Yup  = require('yup');

module.exports = {

    index: async(req,res) => {
        try {

            const clients = await Client.findAll();

            res.status(200).json(clients); 

        } catch (error) {
            res.status(400).json(error.message)
        }
        
    },

    find: async(req,res) => {

        try {
            
            const schema = Yup.object().shape({
                uuid: Yup.string().required().uuid()
            });

            if (!(await schema.isValid(req.params))){
                return res.status(400).json({
                    error: 'UUID inválido.'
                })
            }

            const client = await Client.findOne({
                where: { uuid: req.params.uuid },                                
                include: [{model: Address}, {model: BloodType, attributes: ['type']}]

            });

            if (!client){
                return res.status(400).json({error: 'Cliente não encontrado.'});
            }
           
            res.status(200).json(client); 

        } catch (error) {
            res.status(400).json({error: error.message});
        }


    },

    create: async(req,res) => {

        try {

            const {name, cpf, phone, cellphone, email, bloodtypesId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;
            
            const cpfExists = await Client.findOne({ where:{ cpf: cpf }});            
            if (cpfExists != null){
                    return res.status(400).json({error: "CPF já cadastrado"});
            }else {

               if(!CPF.isValid(cpf)){                  
                   return res.status(400).json({error: "CPF não válido!!"});
               }
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                cpf: Yup.string().required(),
                phone: Yup.string(),
                cellphone: Yup.string(),
                email: Yup.string().email(),
                bloodtypesId: Yup.number().required(),

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
                    error: 'Falha na validação'
                })
            }

            const addressClient = await Address.create({
                zip_code,
                address,
                number,
                complement,
                neighborhood,
                city,
                state
            });
          
            if(!addressClient){               
                return res.status(400).send(error.message)
            }

            const medicalRecords = await MedicalRecords.create({
                opening_date: new Date()
            });

            
            const client = await Client.create({
                name, 
                cpf, 
                phone, 
                cellphone, 
                email, 
                bloodtypesId,
                addressId: addressClient.id,
                medicalRecordsId: medicalRecords.id,
            });
           
            res.status(201).json({message: 'Sucesso', client});

        } catch (error) {
            res.status(400).json({error: error.message});
        }

    },

    update: async(req, res) => {
        
        try{

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                cpf: Yup.string().required(),
                phone: Yup.string(),
                cellphone: Yup.string(),
                email: Yup.string().email(),
                bloodtypesId: Yup.number().required(),
                addressId: Yup.number(),

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

            const {name, cpf, phone, cellphone, email, bloodtypesId, addressId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;

            const client = await Client.findOne({where: {uuid: uuid}})

            if (cpf && cpf !== client.cpf){

                const clientExists = await Client.findOne({ where: {cpf: cpf }});

                if (clientExists){

                    return res.status(400).json({ error: 'CPF já cadastrado' })

                }else if(!CPF.isValid(cpf)){
                                      
                    return res.status(400).json({error: "CPF não válido!!"});                    
                }
            }
            
            const clientUp = await client.update({
                name: name, 
                cpf: cpf, 
                phone: phone, 
                cellphone: cellphone, 
                email: email, 
                bloodtypesId: bloodtypesId,                
            });
            const addressClient = await Address.update({
                zip_code: zip_code,
                address: address,
                number: number,
                complement: complement,
                neighborhood: neighborhood,
                city: city,
                state: state,
            }, {where: {id: addressId}});
            
            const ClientUpdate = await Client.findOne({
                where: { uuid: uuid },                
                include: Address
            });
            
            res.status(201).json({message: 'Sucesso', ClientUpdate});

        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    getMedicalRecords: async(req, res) => {

        try {
            
            const { uuid } = req.params;
            const client = await Client.findOne({where: {uuid: uuid}})

            const medicalRecord = await MedicalRecords.findOne({
                where: { id: client.medicalRecordsId },                
                include: [{model: MedicalHistory}]
            });

            res.status(200).json({message: "Sucesso", medicalRecord});

            

        } catch (error) {
            res.status(400).json({error: error.message})
        
        }



    }

    






}