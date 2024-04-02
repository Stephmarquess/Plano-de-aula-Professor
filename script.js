let qtdInput = 0;
var valoresInputs = [];

function habilitarCampos() {
  var unidadeTematica = document.getElementById("unidadeTematica");
  var objConhecimento = document.getElementById("objetos-conhecimento");
  var habilidades = document.getElementById("habilidades");
  var ano = document.getElementById("ano");
  var disciplina = document.getElementById("disciplina");
  var valorAno = ano.value;
  var valorDisciplina = disciplina.value;
  var camposDesabilitados = document.querySelectorAll("select.disabled");

  camposDesabilitados.forEach(function (campo) {
    campo.disabled = false;
    campo.classList.remove("disabled");
  });

  if (valorAno !== "" && valorDisciplina !== "") {
    unidadeTematica.disabled = false;
    objConhecimento.disabled = false;
    habilidades.disabled = false;
  } else {
    unidadeTematica.disabled = true;
    objConhecimento.disabled = true;
    habilidades.disabled = true;
  }
}

document.getElementById("ano").addEventListener("input", habilitarCampos);
document
  .getElementById("disciplina")
  .addEventListener("input", habilitarCampos);

  

function novoRecurso() {
  const inputNovoRecurso = document.createElement("div");
  qtdInput++;
  inputNovoRecurso.innerHTML = `<label for="novoRec ${qtdInput}" class="form-label">Novo Recurso</label>
                               <input type="text" class="form-control novoRec" id="novoRec ${qtdInput}" name="Recurso Didático">`;

  document.getElementById("novoRecurso").appendChild(inputNovoRecurso);

  const novoInput = inputNovoRecurso.querySelector(".novoRec");

  novoInput.addEventListener("change", function () {
    valoresInputs[qtdInput - 1] = novoInput.value;
    console.log(valoresInputs);
  });
}

function redirecionar(event) {
  event.preventDefault();

  const objConhecimento = document.getElementById("objetos-conhecimento");
  const formulario = document.getElementById("form");
  const nomeProfessor = document.getElementById("nome-professor").value;
  const turma = document.getElementById("turma").value;
  const instituicao = document.getElementById("Instituição").value;
  const ano = document.getElementById("ano").value;
  const disciplina = document.getElementById("disciplina").value;
  const unidadeTematica = document.getElementById("unidadeTematica").value;
  const habilidades = document.getElementById("habilidades").value;
  const praticasLinguagem = document.getElementById("praticas-linguagem").value;
  const objetosConhecimento = document.getElementById(
    "objetos-conhecimento"
  ).value;
  const objetivos = document.getElementById("objetivos").value;
  const recursosDidaticos = [];
  const novoRec = document.getElementsByClassName(".novoRec");
  const metodologias = document.getElementById("metodologias").value;
  const avaliacao = document.getElementById("avaliacao").value;

  document.querySelectorAll(".recurso:checked").forEach(function (recurso) {
    recursosDidaticos.push(recurso.value);
  });

  if (novoRec) {
    recursosDidaticos.push(...valoresInputs);
    console.log(recursosDidaticos);
  }

  const dadosFormulario = {
    professor: nomeProfessor,
    turma: turma,
    instituicao: instituicao,
    ano: ano,
    disciplina: disciplina,
    unidadeTematica: unidadeTematica,
    habilidades: habilidades,
    praticasLinguagem: praticasLinguagem,
    objetosConhecimento: objetosConhecimento,
    objetivos: objetivos,
    recursosDidaticos: recursosDidaticos,
    metodologias: metodologias,
    avaliacao: avaliacao,
  };

  const json = JSON.stringify(dadosFormulario);

  window.location.href = "tabela.html?dados=" + encodeURIComponent(json);
}

function recarregarFormulario() {
  location.reload();
}

async function listarUnidadesTematicas() {
  const disciplina = document.getElementById("disciplina");
  const ano = document.getElementById("ano");
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
  const disciplina = document.getElementById("disciplina");

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
  const ano = document.getElementById("ano");
  const disciplina = document.getElementById("disciplina");
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
