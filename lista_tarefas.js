// abertura da comunicação websocket
const socket = new WebSocket("ws://localhost:5000");

// constrois template de tarefa com dados do banco
const html_builder = (uuid, tarefa) => {
  document.getElementById("tarefas").innerHTML += `
    <div class="tarefa" id="${uuid}">
        <p>${tarefa}</p>
        <input type="button" value="encerrar" onclick="remover_tarefa(this.parentNode.id)")>
        <input type="button" value="editar" onclick="editar_tarefas(this.parentNode.id)">
    </div>`;
};

// pega conteúdo do banco assincronamente
const load = () => {
  fetch("/getTarefas")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      response.forEach((element) => {
        html_builder(element.id, element.descricao);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

// carrega quaisquer tarefas que existirem no servidor assim
// que o documento terminar de carregar
document.addEventListener("DOMContentLoaded", function () {
  load();
});

// gerador de UUID para as tarefas
const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

// cria tarefas no html local e manda elas para o servidor
const criar_tarefa = (tarefa) => {
  var uuid = UUIDGenerator();
  document.getElementsByName("input_tarefa").value = "";
  html_builder(uuid, tarefa);

  // manda nova tarefa para o servidor
  fetch("/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ uuid: uuid, tarefa: tarefa }),
  });
};

// remove tarefas do html local e manda para o servidor
const remover_tarefa = (id) => {
  document.getElementById(id).remove();
  // remove tarefa do servidor
  fetch("/", {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ uuid: id }),
  });
};

// edita tarefas do html local e manda para o servidor
const editar_tarefas = (id) => {
  let tarefa = window.prompt(
    "Edição de tarefa",
    document.getElementById(id).childNodes[1].innerHTML
  );
  document.getElementById(id).childNodes[1].innerHTML = tarefa;

  // remove tarefa do servidor
  fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tarefa: tarefa }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

// remove a lista de tarefas atual e pede a mais recente
// para o servidor
socket.addEventListener("message", function (event) {
  document.getElementById("tarefas").innerHTML = "<h3>Lista de tarefas</h3>";
  load();
});
