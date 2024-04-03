const urlParams = new URLSearchParams(window.location.search);
const dadosJSON = urlParams.get('dados');
const dadosFormulario = JSON.parse(decodeURIComponent(dadosJSON));
const recursos = document.getElementById('info-recursos').textContent = dadosFormulario.recursosDidaticos;

function renderizarDados() {

  if (typeof URLSearchParams !== 'undefined') {

    console.log(dadosFormulario);

    document.getElementById('info-professor').textContent = dadosFormulario.professor;
    document.getElementById('info-turma').textContent = dadosFormulario.turma;
    document.getElementById('info-instituição').textContent = dadosFormulario.instituicao;
    document.getElementById('info-disciplina').textContent = dadosFormulario.disciplina.toUpperCase();
    document.getElementById('info-unidade-temática').textContent = dadosFormulario.unidadeTematica;
    document.getElementById('info-habilidades').textContent = dadosFormulario.habilidades;
    document.getElementById('info-praticas').textContent = dadosFormulario.praticasLinguagem;
    document.getElementById('info-objeto-conhecimento').textContent = dadosFormulario.objetosConhecimento;  
    document.getElementById('info-objetivos').textContent = dadosFormulario.objetivos;  
    document.getElementById('info-recursos').textContent = dadosFormulario.recursosDidaticos;  
    document.getElementById('info-metodologias').textContent = dadosFormulario.metodologias;
    document.getElementById('info-avaliação').textContent = dadosFormulario.avaliacao;

    }     

    else {
      
      console.log("não deu certo");
}
}    

function gerarPDF() {

  const documento = {
      content: [

          { text: 'Plano de Ensino - Fundamental', style: 'header', alignment: 'center' },

          {
            "nodeName": "HR",
            "margin": [
              0,
              12,
              0,
              12
            ],
            "canvas": [
              {
                "type": "line",
                "x1": 0,
                "y1": 0,
                "x2": 514,
                "y2": 0,
                "lineWidth": 0.5,
                "lineColor": "#000000"
              }
            ]
          },

          { columns: [
            [
                { text: 'Professor(a)', style: 'subtitlesHeader' },
                { text: dadosFormulario.professor, alignment: 'center' },                
            ],
            [
                { text: 'Turma', style: 'subtitlesHeader' },
                { text: dadosFormulario.turma, alignment: 'center' },              
            ],
            [
                { text: 'Instituição', style: 'subtitlesHeader' },
                { text: dadosFormulario.instituicao, alignment: 'center' }
            ]
        ]
      },

      {
        "nodeName": "HR",
        "margin": [
          0,
          12,
          0,
          12
        ],
        "canvas": [
          {
            "type": "line",
            "x1": 0,
            "y1": 0,
            "x2": 514,
            "y2": 0,
            "lineWidth": 0.5,
            "lineColor": "#000000"
          }
        ]
      },
          { text: '\n' },   
          { text: 'Disciplina ' , style: 'subtitles'},
          { text: dadosFormulario.disciplina.toUpperCase() },
          { text: '\n' },   
          { text: 'Unidade Temática ' , style: 'subtitles'},
          { text: dadosFormulario.unidadeTematica },
          { text: '\n' },   
          { text: 'Habilidades ' , style: 'subtitles'},
          { text: dadosFormulario.habilidades } ,
          { text: '\n' },   
          { text: 'Práticas de Linguagem ' , style: 'subtitles'},
          { text: dadosFormulario.praticasLinguagem },   
          { text: '\n' },
          { text: 'Objeto de Conhecimento ' , style: 'subtitles'},
          { text: dadosFormulario.objetosConhecimento },
          { text: '\n' },   
          { text: 'Recursos Didaticos ' , style: 'subtitles'},
          { ul: dadosFormulario.recursosDidaticos},
          { text: '\n' },
          { text: 'Metodologias ' , style: 'subtitles'},
          { text: dadosFormulario.metodologias },
          { text: '\n' },
          { text: 'Avaliação ' , style: 'subtitles'},
          { text: dadosFormulario.avaliacao },  
          
      ],
      
      styles: {
          header: {
              fontSize: 30,
              bold: true,

          },

          subtitlesHeader: {
            fontSize: 14,
            bold: true,            
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },

          subtitles: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10],
          },

        canvas: [
          {
            "type": "line",
            "x1": 0,
            "y1": 0,
            "x2": 514,
            "y2": 0,
            "lineWidth": 0.5,
            "lineColor": "#000000"
          },
          {
            "text": " "
          }
        ]
  }
} 

  pdfMake.createPdf(documento).open();
  
}

renderizarDados();