const HomeController = {
    index: (request, response) => {
      response.status(200).send({mensagem: "Rota inicial da API"});
    }
  }
  
  module.exports = HomeController;