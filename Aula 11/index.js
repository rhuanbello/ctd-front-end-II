const inputName = document.querySelector('#name');
const inputLastname = document.querySelector('#lastname');
const submitButton = document.querySelector('input[type="submit"]');
const container = document.querySelector('.container');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const typedName = inputName.value;
  const typedLastName = inputLastname.value;

  container.innerHTML = `
    <p>toUpperCase() - ${typedName.toUpperCase()}</p>
    <p>trim() - ${typedName.trim()}</p>
    <p>toLowerCase() ${typedName.toLowerCase()}</p>
    <p>concat() - ${typedName.concat(' ', typedLastName)}</p>
    <p>replace() - ${typedName.toLowerCase().replaceAll('a', '@').replaceAll('e', '3')}</p>
  `
});