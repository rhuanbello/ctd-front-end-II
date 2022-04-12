const profileContainer = document.querySelector('.user-info')
const tasksContainer = document.querySelector('.tasks-container')

const createTaskForm = document.querySelector('.nova-tarefa')
const inputDescricaoTarefa = document.querySelector('#novaTarea')

const url = 'https://ctd-todo-api.herokuapp.com/v1'

const getUser = () => {

  console.log('to aqui')

  fetch(`${url}/users/getMe`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(sessionStorage.getItem('token')),
    }
  })
    .then(response => {
      return response.json()
    })
    .then((data) => {
      renderUsername(data)
    })
    .catch(error => console.log(error))
}

const renderUsername = ({ firstName, lastName }) => {
  const imgUrl = firstName.toLowerCase() + lastName.toLowerCase()

  profileContainer.innerHTML = `
    <p>${firstName} ${lastName}</p>
    <div class="user-image">
      <img src="https://github.com/${imgUrl}.png" alt="">
    </div>
    <button id="closeApp">Finalizar sessão</button>
  `;

  initApp()
}

const renderTasks = (tasks) => {
  const orderedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  tasksContainer.innerHTML = '';

  orderedTasks.forEach(({ description, createdAt }) => {
    tasksContainer.innerHTML += `
      <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${description}</p>
          <p class="timestamp">Criada em: ${new Date(createdAt).toLocaleDateString('pt-BR')}
          <i class="ri-delete-bin-line"></i>
          </p>
        </div>
      </li>
    `
  })
}

const getTasks = () => {

  fetch(`${url}/tasks`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(sessionStorage.getItem('token')),
    }
  })
    .then(response => {
      return response.json()
    })
    .then((data) => {
      renderTasks(data)
      setTimeout(() => {
        tasksContainer.removeAttribute('id')
      }, 1000)
    })
    .catch(error => console.log(error))
}

const createTasks = (description) => {

  const newTask = {
    description: description,
    completed: false
  }

  fetch(`${url}/tasks`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(sessionStorage.getItem('token')),
    },
    body: JSON.stringify(newTask)
  })
    .then(response => response.json())
    .then(() => {
      getTasks()
    })
    .catch(error => console.log(error))
}

const initApp = () => {
  const endSession = document.getElementById('closeApp')

  endSession.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    location.href = '../../index.html';
  })

  getTasks();

}

createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  createTasks(inputDescricaoTarefa.value)
})

window.onload = () => {
  if (sessionStorage.getItem('token')) {
    getUser();
  } else {
    location.href = '../../index.html';
  }

}