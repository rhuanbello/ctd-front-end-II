const toggleDarkMode = document.querySelector('.switch input');
const listOfItems = document.querySelectorAll('.item');
const header = document.querySelector('header');
const h1 = document.querySelector('.content h1');

toggleDarkMode.addEventListener('click', () => {
  const arrayOfElements = [document.body, header, h1, ...listOfItems];
  arrayOfElements.forEach(item => {
    item.classList.toggle('dark')
  })
});