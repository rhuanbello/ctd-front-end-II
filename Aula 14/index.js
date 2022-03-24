const inputText = document.querySelector('input[type="text"]');
const submitButton = document.querySelector('input[type="submit"]');
const container = document.querySelector('div');
const form = document.querySelector('form');

console.log(inputText, submitButton, container)

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getItemsFromLocalStorage(inputText.value)
  inputText.value = '';

});

const getItemsFromLocalStorage = (inputText) => {
  const localStorageArray = JSON.parse(localStorage.getItem('comentarios')) || [];

  if (inputText) {
    localStorageArray.push(inputText);
  }

  localStorage.setItem('comentarios', JSON.stringify(localStorageArray));
  container.innerHTML = '';

  localStorageArray.forEach(comentario => {
    container.innerHTML += `
      <p>${comentario}</p>
    `
  });

}

getItemsFromLocalStorage();