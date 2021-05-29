const HomeController = {
    index: (request, response) => {
      response.status(200).json({mensagem: "Rota inicial da API"});
    }
  }
  
  module.exports = HomeController;