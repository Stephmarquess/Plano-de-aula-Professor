const ano = document.getElementById('ano');
const disciplina = document.getElementById('disciplina');
const objConhecimento = document.getElementById('objeto-conhecimento');


async function listarUnidadesTematicas() {

  const selDisciplina = disciplina.value
  const selAno = ano.value;

  console.log(selAno);

  if (selDisciplina !== '' && selAno !== '') {
  try {
    const url = await fetch(`https://cientificar1992.pythonanywhere.com/bncc_fundamental/disciplina/${selDisciplina}/${selAno}/?format=json`);
    const dados = await url.json();

      const listaUnidadesTematicas = document.getElementById('unidadeTematica');

      while (listaUnidadesTematicas.firstChild) {
        listaUnidadesTematicas.removeChild(listaUnidadesTematicas.firstChild);
        
      }

      if (Array.isArray(dados.unidades_tematicas)) {
        console.log(dados);
        dados.unidades_tematicas.forEach(data => {
              const opcaoTematica = document.createElement('option');
              opcaoTematica.value = data.nome_unidade;
              opcaoTematica.text = data.nome_unidade;
              listaUnidadesTematicas.appendChild(opcaoTematica);
            });
          }
        } catch(error) {
        console.error('Erro ao buscar dados da API:', error);
      };
    }
}

    function listarHabilidades() {

      const selDisciplina = disciplina.value
      console.log(selDisciplina);

      if (selDisciplina !== '') {
      fetch(`https://cientificar1992.pythonanywhere.com/bncc_fundamental/${selDisciplina}/info_habilidades/`)
        .then(response => response.json()) 
        .then(data => {            
                const listaHabilidades = document.getElementById('habilidades');
                
                while (listaHabilidades.firstChild) {
                  listaHabilidades.removeChild(listaHabilidades.firstChild);
                }

                data.forEach(item => {
                  const opcao = document.createElement('option');
                  opcao.value = item.habilidade;
                  opcao.text = item.habilidade;
                  listaHabilidades.appendChild(opcao);
                });

              })
          .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
          });
        }
    }

    function listarObjetoConhecimento() {

      const selDisciplina = disciplina.value;
      const selAno = ano.value
      

      if (selDisciplina !== '' && selAno !== '') {
      fetch(`https://cientificar1992.pythonanywhere.com/bncc_fundamental/disciplina/${selDisciplina}/${selAno}/?format=json`)
        .then(response => response.json()) 
        .then(data => {            
                const listaObjetoConhecimento = document.getElementById('objetos-conhecimento');
                
                // while (listaObjetoConhecimento.firstChild) {
                //   listaObjetoConhecimento.removeChild(listaObjetoConhecimento.firstChild);
                // }

                if (Array.isArray(data.objeto_conhecimento)) {

                data.objeto_conhecimento.forEach(item => {
                  console.log(data.objeto_conhecimento);
                  const opcaoObjeto = document.createElement('option');
                  opcaoObjeto.value = item.nome_objeto;
                  opcaoObjeto.text = item.nome_objeto;
                  listaObjetoConhecimento.appendChild(opcaoObjeto);
                });
              }
              })
          .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
          });
        }
    }

    document.getElementById('disciplina').addEventListener('change', listarHabilidades);
    document.getElementById('disciplina').addEventListener('change', listarUnidadesTematicas);
    document.getElementById('disciplina').addEventListener('change', listarObjetoConhecimento);
    
