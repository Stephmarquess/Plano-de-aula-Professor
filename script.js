const ano = document.getElementById("ano");
const disciplina = document.getElementById("disciplina");
const objConhecimento = document.getElementById("objetos-conhecimento");
const formulario = document.getElementById("form");

function novoRecurso() {
  let qtdInput = 1;

  const inputNovoRecurso = document.createElement("div");
  inputNovoRecurso.innerHTML = `<label for="praticas-linguagem" class="form-label">Novo Recurso</label>
                               <input type="text" class="form-control" id="novoRec" name="Recurso Didático">`;

  document.getElementById("novoRecurso").appendChild(inputNovoRecurso);
  qtdInput++;

  let inputRecurso = document.getElementById("novoRec");
  console.log(inputRecurso);
}

function selecionarInputs(e) {
  e.preventDefault();
  const form = document.getElementById("form");
  const data = new FormData(form);

  for (let pair of data.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  const checksRecursos = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  let nomesRecursos = [];
  let novosRecursos = document.querySelector("#novoRec");

  checksRecursos.forEach(function (checkbox) {
    nomesRecursos.push(checkbox.value);
    if (novosRecursos) {
      nomesRecursos.push(novosRecursos.value);
    }
  });

  console.log(nomesRecursos);
}

function limparFormulario() {
  formulario.reset();
}

async function listarUnidadesTematicas() {
  const selDisciplina = disciplina.value;
  const selAno = ano.value;

  console.log(selAno);

  if (selDisciplina !== "" && selAno !== "") {
    try {
      const url = await fetch(
        `https://cientificar1992.pythonanywhere.com/bncc_fundamental/disciplina/${selDisciplina}/${selAno}/?format=json`
      );
      const dados = await url.json();

      const listaUnidadesTematicas = document.getElementById("unidadeTematica");

      while (listaUnidadesTematicas.firstChild) {
        listaUnidadesTematicas.removeChild(listaUnidadesTematicas.firstChild);
      }

      if (Array.isArray(dados.unidades_tematicas)) {
        console.log(dados);
        dados.unidades_tematicas.forEach((data) => {
          const opcaoTematica = document.createElement("option");
          opcaoTematica.value = data.nome_unidade;
          opcaoTematica.text = data.nome_unidade;
          listaUnidadesTematicas.appendChild(opcaoTematica);
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  }
}

function listarHabilidades() {
  const selDisciplina = disciplina.value;
  console.log(selDisciplina);

  if (selDisciplina !== "") {
    fetch(
      `https://cientificar1992.pythonanywhere.com/bncc_fundamental/${selDisciplina}/info_habilidades/`
    )
      .then((response) => response.json())
      .then((data) => {
        const listaHabilidades = document.getElementById("habilidades");

        while (listaHabilidades.firstChild) {
          listaHabilidades.removeChild(listaHabilidades.firstChild);
        }

        data.forEach((item) => {
          const opcao = document.createElement("option");
          opcao.value = item.habilidade;
          opcao.text = item.habilidade;
          listaHabilidades.appendChild(opcao);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }
}

function listarObjetoConhecimento() {
  const listaObjetoConhecimento = document.getElementById(
    "objetos-conhecimento"
  );
  const selDisciplina = disciplina.value;
  const selAno = ano.value;

  if (selDisciplina !== "" && selAno !== "") {
    fetch(
      `https://cientificar1992.pythonanywhere.com/bncc_fundamental/disciplina/${selDisciplina}/${selAno}/?format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (listaObjetoConhecimento !== null) {
          while (listaObjetoConhecimento.firstChild) {
            listaObjetoConhecimento.removeChild(
              listaObjetoConhecimento.firstChild
            );
          }
        }

        if (Array.isArray(data.unidades_tematicas)) {
          data.unidades_tematicas.forEach((item) => {
            let uniTematicas = item.objeto_conhecimento;

            uniTematicas.forEach((element) => {
              console.log(element);
              const opcaoObjeto = document.createElement("option");
              opcaoObjeto.value = element.nome_objeto;
              opcaoObjeto.text = element.nome_objeto;
              listaObjetoConhecimento.appendChild(opcaoObjeto);
            });
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }
}

document
  .getElementById("disciplina")
  .addEventListener("change", listarHabilidades);
document
  .getElementById("disciplina")
  .addEventListener("change", listarUnidadesTematicas);
document
  .getElementById("disciplina")
  .addEventListener("change", listarObjetoConhecimento);
