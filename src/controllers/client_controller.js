const { Client, Address } = require('../models');
const CPF = require("@fnando/cpf/commonjs");
const  Yup  = require('yup');

module.exports = {

    index: async(req,res) => {
        try {

            const clients = await Client.findAll();
            
            // console.log(clients.every(client => client instanceof Client)); // true
            // console.log("All clients:", JSON.stringify(clients, null, 2));
            res.status(200).send(clients); 

        } catch (error) {
            res.status(400).send(error.message)
        }
        
    },

    find: async(req,res) => {

        try {
            
            const schema = Yup.object().shape({
                uuid: Yup.string().required()
            });

            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                     message: 'UUID do usuário não encontrado'
                })
            }

            const clients = await Client.findOne({
                where: { uuid: req.body.uuid },                
                include: Address
            });
           
            res.status(200).send(clients); 

        } catch (error) {
            res.status(400).send(error.message)
        }


    },

    create: async(req,res) => {

        try {

            const {name, cpf, phone, cellphone, email, bloodtypesId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;
            
            const cpfExists = await Client.findOne({ where:{ cpf: cpf }});            
            if (cpfExists != null){
                    return res.status(400).send("CPF já cadastrado");
            }else {

               if(!CPF.isValid(cpf)){                  
                   return res.status(400).send("CPF não válido!!");
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
                     message: 'Falha na validação'
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
            const client = await Client.create({
                name, 
                cpf, 
                phone, 
                cellphone, 
                email, 
                bloodtypesId,
                addressId: addressClient.id
            });

            
            res.status(201).send(client);

        } catch (error) {
            res.status(400).send(error.message)
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
                                    
            if (!(await schema.isValid(req.body))){
                return res.status(400).json({
                     message: 'Falha na validação'
                })
            }

            const {uuid, name, cpf, phone, cellphone, email, bloodtypesId, addressId} = req.body;
            const {zip_code, address, number, complement, neighborhood, city, state} = req.body;

            const client = await Client.findOne({where: {uuid: uuid}})

            if (cpf && cpf !== client.cpf){

                const clientExists = await Client.findOne({ where: {cpf: cpf }});

                if (clientExists){

                    return res.status(400).json({ error: 'CPF já cadastrado' })

                }else if(!CPF.isValid(cpf)){
                                      
                    return res.status(400).send("CPF não válido!!");                    
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
            
            res.status(201).send(ClientUpdate)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    






}