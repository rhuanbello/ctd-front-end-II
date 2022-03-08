const h1 = document.querySelector('h1');
const li = document.querySelectorAll('li.dados');

li.forEach(tag => {
  tag.style.color = 'red';
  tag.style.fontSize = '25px';
})

h1.style.color = 'red';
document.body.style.backgroundColor = '#FFFFFF';