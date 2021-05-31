'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('specialities', [
      {        
          "description": "Médico acupunturista",
          "code": "225105"
      },
      {
          
          "description": "Médico alergista e imunologista",
          "code": "225110"
      },
      {
          
          "description": "Médico anatomopatologista",
          "code": "225148"
      },
      {
          
          "description": "Médico anestesiologista",
          "code": "225151"
      },
      {
          
          "description": "Médico angiologista",
          "code": "225115"
      },
      {
          
          "description": "Médico ayurveda",
          "code": "134009"
      },
      {
          
          "description": "Médico cancerologista cirúrgico",
          "code": "225290"
      },
      {
          
          "description": "Médico cancerologista pediátrico",
          "code": "225122"
      },
      {
          
          "description": "Médico cardiologista",
          "code": "225120"
      },
      {
          
          "description": "Médico cirurgião cardiovascular",
          "code": "225210"
      },
      {
          
          "description": "Médico cirurgião da mão",
          "code": "225295"
      },
      {
          
          "description": "Médico cirurgião de cabeça e pescoço",
          "code": "225215"
      },
      {
          
          "description": "Médico cirurgião do aparelho digestivo",
          "code": "225220"
      },
      {
          
          "description": "Médico cirurgião geral",
          "code": "225225"
      },
      {
          
          "description": "Médico cirurgião pediátrico",
          "code": "225230"
      },
      {
          
          "description": "Médico cirurgião torácico",
          "code": "225240"
      },
      {
          
          "description": "Médico citopatologista",
          "code": "225305"
      },
      {
          
          "description": "Médico clínico",
          "code": "225125"
      },
      {
          
          "description": "Médico da estratégia de saúde da família",
          "code": "225142"
      },
      {
          
          "description": "Médico de família e comunidade",
          "code": "225130"
      },
      {
          
          "description": "Médico de Medicina Esportiva",
          "code": "223146"
      },
      {
          
          "description": "Médico dermatologista",
          "code": "225135"
      },
      {
          
          "description": "Médico do trabalho",
          "code": "225140"
      },
      {
          
          "description": "Médico em cirurgia vascular",
          "code": "225203"
      },
      {
          
          "description": "Médico em endoscopia",
          "code": "225310"
      },
      {
          
          "description": "Médico em medicina de tráfego",
          "code": "225145"
      },
      {
          
          "description": "Médico em medicina intensiva",
          "code": "225150"
      },
      {
          
          "description": "Médico em medicina nuclear",
          "code": "225315"
      },
      {
          
          "description": "Médico em radiologia e diagnóstico por imagem",
          "code": "225320"
      },
      {
          
          "description": "Médico endocrinologista e metabologista",
          "code": "225155"
      },
      {
          
          "description": "Médico fisiatra",
          "code": "225160"
      },
      {
          
          "description": "Médico gastroenterologista",
          "code": "225165"
      },
      {
          
          "description": "Médico generalista",
          "code": "225170"
      },
      {
          
          "description": "Médico geneticista",
          "code": "225175"
      },
      {
          
          "description": "Médico geriatra",
          "code": "225180"
      },
      {
          
          "description": "Médico ginecologista e obstetra",
          "code": "225250"
      },
      {
          
          "description": "Médico Hematologista",
          "code": "225185"
      },
      {
          
          "description": "Médico hemoterapeuta",
          "code": "225340"
      },
      {
          
          "description": "Médico hiperbarista",
          "code": "225345"
      },
      {
          
          "description": "Médico Homeopata",
          "code": "225195"
      },
      {
          
          "description": "Médico infectologista",
          "code": "225103"
      },
      {
          
          "description": "Médico legista",
          "code": "225106"
      },
      {
          
          "description": "Médico Mastologista",
          "code": "225255"
      },
      {
          
          "description": "Médico Nefrologista",
          "code": "225109"
      },
      {
          
          "description": "Médico neurocirurgião",
          "code": "225260"
      },
      {
          
          "description": "Médico neurofisiologista",
          "code": "225350"
      },
      {
          
          "description": "Médico neurologista",
          "code": "225112"
      },
      {
          
          "description": "Médico nutrologista",
          "code": "225118"
      },
      {
          
          "description": "Médico oftalmologista",
          "code": "225265"
      },
      {
          
          "description": "Médico oncologista clínico",
          "code": "225121"
      },
      {
          
          "description": "Médico ortopedista e traumatologista",
          "code": "225270"
      },
      {
          
          "description": "Médico otorrinolaringologista",
          "code": "225275"
      },
      {
          
          "description": "Médico patologista",
          "code": "225325"
      },
      {
          
          "description": "Médico patologista clínico / medicina laboratorial",
          "code": "225335"
      },
      {
          
          "description": "Médico pediatra",
          "code": "225124"
      },
      {
          
          "description": "Médico pneumologista",
          "code": "225127"
      },
      {
          
          "description": "Médico proctologista",
          "code": "225280"
      },
      {
          
          "description": "Médico psiquiatra",
          "code": "225133"
      },
      {
          
          "description": "Médico radioterapeuta",
          "code": "225330"
      },
      {
          
          "description": "Médico reumatologista",
          "code": "225136"
      },
      {
          
          "description": "Médico sanitarista",
          "code": "225139"
      },
      {
          
          "description": "Médico urologista",
          "code": "225285"
      },
      {
          
          "description": "Assistente social",
          "code": "251605"
      },
      {
          
          "description": "Auxiliar de enfermagem",
          "code": "322230"
      },
      {
          
          "description": "Biólogo",
          "code": "221105"
      },
      {
          
          "description": "Biomédico",
          "code": "221205"
      },
      {
          
          "description": "CBO desconhecido ou não informado pelo solicitante",
          "code": "999999"
      },
      {
          
          "description": "Cirurgião dentista - auditor",
          "code": "223204"
      },
      {
          
          "description": "Cirurgião dentista - clínico geral",
          "code": "223208"
      },
      {
          
          "description": "Cirurgião-dentista da estratégia de saúde da família",
          "code": "223293"
      },
      {
          
          "description": "Cirurgião dentista - dentística",
          "code": "223280"
      },
      {
          
          "description": "Cirurgião dentista de saúde coletiva",
          "code": "223272"
      },
      {
          
          "description": "Cirurgião dentista - disfunção temporomandibular e dor orofacial",
          "code": "223284"
      },
      {
          
          "description": "Cirurgião dentista - endodontista",
          "code": "223212"
      },
      {
          
          "description": "Cirurgião dentista - epidemiologista",
          "code": "223216"
      },
      {
          
          "description": "Cirurgião dentista - estomatologista",
          "code": "223220"
      },
      {
          
          "description": "Cirurgião dentista - implantodontista",
          "code": "223224"
      },
      {
          
          "description": "Cirurgião dentista - odontogeriatra",
          "code": "223228"
      },
      {
          
          "description": "Cirurgião dentista - odontologia do trabalho",
          "code": "223276"
      },
      {
          
          "description": "Cirurgião dentista - odontologia para pacientes com necessidades especiais",
          "code": "223288"
      },
      {
          
          "description": "Cirurgião dentista - odontologista legal",
          "code": "223232"
      },
      {
          
          "description": "Cirurgião dentista - odontopediatra",
          "code": "223236"
      },
      {
          
          "description": "Cirurgião dentista - ortopedista e ortodontista",
          "code": "223240"
      },
      {
          
          "description": "Cirurgião dentista - patologista bucal",
          "code": "223244"
      },
      {
          
          "description": "Cirurgião dentista - periodontista",
          "code": "223248"
      },
      {
          
          "description": "Cirurgião dentista - protesiólogo bucomaxilofacial",
          "code": "223252"
      },
      {
          
          "description": "Cirurgião dentista - protesista",
          "code": "223256"
      },
      {
          
          "description": "Cirurgião dentista - radiologista",
          "code": "223260"
      },
      {
          
          "description": "Cirurgião dentista - reabilitador oral",
          "code": "223264"
      },
      {
          
          "description": "Cirurgião dentista - traumatologista bucomaxilofacial",
          "code": "223268"
      },
      {
          
          "description": "Cirurgião Plástico",
          "code": "225235"
      },
      {
          
          "description": "Cuidador de idosos",
          "code": "516210"
      },
      {
          
          "description": "Enfermeiro",
          "code": "223505"
      },
      {
          
          "description": "Farmacêutico",
          "code": "223405"
      },
      {
          
          "description": "Fisioterapeuta geral",
          "code": "223605"
      },
      {
          
          "description": "Fonoaudiólogo",
          "code": "223810"
      },
      {
          
          "description": "Instrumentador cirúrgico",
          "code": "322225"
      },
      {
          
          "description": "Neuropediatra",
          "code": "225112"
      },
      {
          
          "description": "Neuropsicólogo",
          "code": "251545"
      },
      {
          
          "description": "Nutricionista",
          "code": "223710"
      },
      {
          
          "description": "Optometrista",
          "code": "322305"
      },
      {
          
          "description": "Ortoptista",
          "code": "223910"
      },
      {
          
          "description": "Osteopata",
          "code": "226110"
      },
      {
          
          "description": "Psicanalista",
          "code": "251550"
      },
      {
          
          "description": "Psicólogo clínico",
          "code": "251510"
      },
      {
          
          "description": "Psicólogo do Esporte",
          "code": "251515"
      },
      {
          
          "description": "Psicopedagogo",
          "code": "239425"
      },
      {
          
          "description": "Psiquiatria",
          "code": "225133-1"
      },
      {
          
          "description": "Quiropraxista",
          "code": "226105"
      },
      {
          
          "description": "Técnico de enfermagem",
          "code": "322205"
      },
      {
          
          "description": "Técnico de enfermagem psiquiátrica",
          "code": "322220"
      },
      {
          
          "description": "Terapeuta capilar",
          "code": "322130"
      },
      {
          
          "description": "Terapeuta holístico",
          "code": "322125"
      },
      {
          
          "description": "Terapeuta ocupacional",
          "code": "223905"
      },
      {
          
          "description": "Terapeuta ortomolecular",
          "code": "322125"
      }
            
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('specialities', null, {});

  }
};
