const form = document.querySelector('form');
const inputEmail = document.querySelector('input[type="text"]');
const inputPassword = document.querySelector('input[type="password"]');

const homePageURL = 'pages/Tarefas/index.html';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const minLength = 6;
  const maxLength = 24;
  const emailValue = inputEmail.value;

  const isEmailValid = emailValue.length >= minLength && 
    emailValue.length <= maxLength &&
    emailValue.slice(-4).includes('.com');

  if (isEmailValid) {
    localStorage.setItem('userInfo', JSON.stringify({
      email: emailValue,
    }))
    goToHomePage();
  } else {
    alert(`E-mail ${emailValue} inválido!`);
  }

})

const goToHomePage = () => {
  location.href = homePageURL;
}