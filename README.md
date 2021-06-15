# gama-challenge-api
API Back-End para **Sistema de gestão de consultório médico**, desenvolvido como proposta de desafio para a 1º edição do Afya Labs organizado pela [Afya](https://afya.com.br/) em parceria com a [Gama Academy](https://www.gama.academy/)

------------------------
## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **Instalação** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

* Node.js 14.17.0 
* PostgreSQL 

### 🔧 Instalação

```
git clone https://github.com/GabrielPOliveira/gama-challenge-api.git
```
```
npm install
```
```
Criar um arquivo .env seguindo o modelo em .envExample, caso o banco de dados não esteja criado você poderá utilizar o comando "npx sequelize-cli db:create"
```

Para rodar as Migrations utilize o comando: 
```
npx sequelize-cli db:migrate ou sequelize db:migrate
```
Para rodar as Seeders utilize o comando:
```
 sequelize db:seed:all
```
Para iniciar o sistema
```
npm run dev (nodemon)
```
ou
```
npm run start
```
------------------------
## ⚙️ Executando os testes

Para executar os testes unitários que foram desenvolvidos utilizando o Jest basta utilizar o comando.
Os testes são realizados na database chamada "teste", exclusiva para tal"
```
npm run test
```

------------------------
## 🛠️ Construído com

[Express](https://expressjs.com/) - O Framework web rápido, flexível e minimalista para Node.js

[PostgreSQL](https://www.postgresql.org/) - O mais avançado banco de dados Open Source

[Yup](https://www.postgresql.org/) - um construtor de esquema JavaScript para análise e validação de valor.

[Jest](https://jestjs.io/) - um framework de Testes em Javascript.

------------------------
## ✒️ Autores

* **Desenvolvedor** - *Sistema de Autenticação, cadastro de Usuários, Alteração de Senha, Testes Unitários, deploy,* - [Bruno Vercelli](https://github.com/bjmvercelli)

* **Desenvolvedor** - *Modelagem, Criação das funções relacionadas a Pacientes, Medicos, Agendamentos, criação de seeders ,* - [Gabriel P Oliveira](https://github.com/GabrielPOliveira/)

------------------------
## Link para acesso a API

[Api-Back-End](https://labteam-api.herokuapp.com/api-docs/)





