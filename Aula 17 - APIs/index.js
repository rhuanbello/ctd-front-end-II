const inputResults = document.querySelector('input')
const searchButton = document.getElementById('search')

const url = 'https://randomuser.me/api/?results=10'

searchButton.addEventListener('click', (e) => {
  e.preventDefault()
  const search = inputResults.value
  getUsers(search)
})

// Aqui realizamos a consulta da promisse, esperando sua resposta assíncrona

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

/* --------------------------- Tarefa 2 (extra) --------------------------- */
// Aqui você pode ir para o ponto extra de usar o botão que está comentado no HTML.
// Você pode descomentar o código no index.html e usar esse botão para executar uma nova solicitação API, sem recarregar a página.
// Cabe aos desenvolvedores decidirem qual bloco de código deve ser contido dentro de uma função para que ele possa ser executado toda vez que um clique de botão for realizado.
