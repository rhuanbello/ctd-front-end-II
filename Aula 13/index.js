const signUpButton = document.querySelector('button');
const inputName = document.getElementById('nome');
const inputPassword = document.getElementById('pass');
const inputTelephone = document.getElementById('tel');
const radioButtonList = document.querySelectorAll('input[type="radio"]');
const checkboxList = document.querySelectorAll('input[type="checkbox"]');

let inputNameValidation = false;
let brasilNotSelected = false;
let checkedOnly = [];

inputName.addEventListener('keyup', () => {
  const listOfWords = inputName.value.split(' ');

  const moreThanTwoWords = listOfWords.length >= 2 && Boolean(listOfWords[1]);
  const atLeastTwoLetters = listOfWords.length >= 2 && listOfWords.every(word => word.length > 1);
  const numbersExists = Boolean(inputName.value.match(/\d+/g));
  const isEmpty = Boolean(!inputName.value);

  inputNameValidation = moreThanTwoWords && atLeastTwoLetters && !numbersExists && !isEmpty;

  if (inputNameValidation) {
    inputName.classList.remove('error')
    inputName.classList.add('success')
  } else {
    inputName.classList.remove('success')
    inputName.classList.add('error')
  }

  handleDisableButton()

})

inputName.addEventListener('keypress', (e) => {
  inputName.value.length > 15 && e.preventDefault()
})

radioButtonList.forEach(radio => {
  radio.addEventListener('click', () => {
    brasilNotSelected = !radio.getAttribute('id').toLowerCase().includes('brasil');

    if (!brasilNotSelected) {
      alert("Desculpe, ainda não estamos recrutando bruxos no Brasil, mas chegaremos em breve")
      radio.checked = false;
    }

    handleDisableButton()
  })
})

checkboxList.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    checkedOnly = Array.from(checkboxList).filter(x => x.checked)
    if (checkedOnly.length >= 4) {
      const notChecked = Array.from(checkboxList).filter(x => !x.checked)
      notChecked.forEach(x => x.setAttribute('disabled', 'disabled'))
      alert('Máximo atingido')
    } else {
      checkboxList.forEach(x => x.removeAttribute('disabled'))
    }
    handleDisableButton();
  })
})

const handleDisableButton = () => {

  if (inputNameValidation && brasilNotSelected && checkedOnly.length <= 4) {
    signUpButton.removeAttribute('disabled')
  } else {
    signUpButton.setAttribute("disabled", "disabled");
  }

}

window.onload = () => {
  handleDisableButton();
}