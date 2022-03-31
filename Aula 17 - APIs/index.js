const inputResults = document.querySelector('input')
const searchButton = document.getElementById('search')

searchButton.addEventListener('click', (e) => {
  e.preventDefault()
  const search = inputResults.value
  getUsers(search)
})

const getUsers = (search) => {

  fetch(`https://randomuser.me/api/?results=${search}`)
    .then(response => {
      return response.json()
    })
    .then(({ results }) => {
      renderizarDadosUsuario(results)
    })
    .catch(err => {
      console.log(err)
    })
}

const renderizarDadosUsuario = (data) => {
  const container = document.querySelector('main');

  const sortedDataAlphabetically = data.sort((a, b) => {
    return a.name.first > b.name.first ? 1 : -1
  })

  sortedDataAlphabetically.forEach(usuario => {
    container.innerHTML += `
    <div class="target">
      <img src=${usuario.picture.large}>
      <div class="paragraphs">
        <div>
          <p>Nome</p>
          <p>${usuario.name.title}. ${usuario.name.first} ${usuario.name.last}</p>
        </div>
        <div>
          <p>Celular</p>
          <p>${usuario.cell}</p>
        </div>
        <div>
          <p>E-mail</p>
          <p>${usuario.email}</p>
        </div>
      </div>
    </div>
  `
  })

}