export function orderValidation(orderBackgroundDiv: HTMLElement) {
  const inputs = orderBackgroundDiv.querySelectorAll('.order__input') as NodeListOf<HTMLInputElement>;
  const submit = orderBackgroundDiv.querySelector('.order__submit') as HTMLButtonElement;

  submit.addEventListener('click', (event) => {
    event.preventDefault();
    inputs.forEach((el) => {
      const errorMessage = el.nextElementSibling as HTMLElement;
      if (el.value !== '' && el.checkValidity()) {
        errorMessage.style.visibility = 'hidden';
      } else {
        errorMessage.style.visibility = 'visible';
      }
    });
  });
}
