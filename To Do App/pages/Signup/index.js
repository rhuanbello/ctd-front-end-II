const inputName = document.querySelector('.name');
const inputNickname = document.querySelector('.nickname');
const inputEmail = document.querySelector('.email');
const inputPassword = Array.from(document.querySelectorAll('input[type="password"]'));
const button = document.querySelector('button');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('validateName()', validateName())
  console.log('validateNickname()', validateNickname())
  console.log('validateEmail()', validateEmail())
  console.log('validatePassword()', validatePassword())

  if (validateName() && validateNickname() && validateEmail() && validatePassword()) {
    goToHomePage();
  }
})

const validateName = () => {
  const nameHasOnlyString = !/\d/g.test(inputName.value);
  const nameHasTwoWords = inputName.value.split(' ').length === 2;
  const firstName = inputName.value.split(' ')[0];
  const lastName = inputName.value.split(' ')[1];
  const maxLenght = 15;

  const isNameValid = nameHasOnlyString &&
    nameHasTwoWords &&
    firstName.length < maxLenght &&
    lastName.length < maxLenght;

  return isNameValid
}

const validateNickname = () => {
  const nicknameValidateSpecialString = !/\W/g.test(inputNickname.value);
  const nicknameValidateMaxLenght = inputNickname.value.length < 15;
  const nicknameValidateMinLenght = inputNickname.value.length > 3;

  const isNicknameValid = nicknameValidateSpecialString &&
    nicknameValidateMaxLenght &&
    nicknameValidateMinLenght;

  return isNicknameValid
}

const validateEmail = () => {
  const minLength = 6;
  const maxLength = 24;
  const emailValue = inputEmail.value;
  const isEmailValid = emailValue.length >= minLength &&
    emailValue.length <= maxLength &&
    emailValue.slice(-4).includes('.com') && emailValue.includes('@');

  return isEmailValid;
}

const validatePassword = () => {
  const isBothPasswordsEqual = inputPassword[0].value === inputPassword[1].value;
  let isPasswordsMaxLength = false;

  inputPassword.forEach(input => {
    if (input.value.length >= 6 && input.value.length <= 12) {
      isPasswordsMaxLength = true;
    }
  })

  const isPasswordValid = isBothPasswordsEqual && isPasswordsMaxLength;
  return isPasswordValid;
}

const goToHomePage = () => {
  window.location.href = '../Tarefas/index.html';
}