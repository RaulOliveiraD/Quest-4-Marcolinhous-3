const inputTarefas = document.querySelector('.input-tarefas')
const btnTarefas = document.querySelector('.btn-tarefas');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function limpaInput() {
    inputTarefas.value = '';
    inputTarefas.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoAgagar(li);
    salvarTarefas();
}

function criaBotaoAgagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa');
    li.appendChild(botaoApagar);
}


inputTarefas.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTarefas.value) return;
        criaTarefa(inputTarefas.value);
    }
});

btnTarefas.addEventListener('click', function() {
    if(!inputTarefas.value) return;
    criaTarefa(inputTarefas.value);
})

document.addEventListener('click', function(e) {
    const el = e.target;

    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionarTarefasSalvas();