const { Client, Address } = require('../models');
const CPF = require("@fnando/cpf/commonjs");
const  Yup  = require('yup');

module.exports = {

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
                return res.status(401).send(error.message)
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

            client.id = undefined;
            res.status(200).send(client);

        } catch (error) {
            res.status(400).send(error.message)
        }

    }











}