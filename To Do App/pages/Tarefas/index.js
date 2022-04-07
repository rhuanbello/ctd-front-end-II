const profileContainer = document.querySelector('.user-info')

const getUser = () => {
  const url = 'https://ctd-todo-api.herokuapp.com/v1'

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
      console.log('cheguei aqui')
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

const initApp = () => {
  const endSession = document.getElementById('closeApp')

  endSession.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    location.href = '../../index.html';
  })

}

window.onload = () => {
  if (sessionStorage.getItem('token')) {
    getUser();
  } else {
    location.href = '../../index.html';
  }

}