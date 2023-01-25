import { resetFilters } from '../main-filter/reset-filters';
import { renderOrderForm } from './order-submit';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function orderValidation(orderBackgroundDiv: HTMLDivElement): void {
  const inputs = orderBackgroundDiv.querySelectorAll('.order__input') as NodeListOf<HTMLInputElement>;
  const submit = orderBackgroundDiv.querySelector('.order__submit') as HTMLButtonElement;

  submit.addEventListener('click', (event) => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const processedMessage = orderBackgroundDiv.querySelector('.order__processed-message') as HTMLParagraphElement;

    let invalidElements = 0;

    event.preventDefault();

    inputs.forEach((inputEl) => {
      const errorMessage = inputEl.nextElementSibling as HTMLDivElement;

      if (inputEl.value !== '' && inputEl.checkValidity()) {
        errorMessage.style.visibility = 'hidden';
      } else {
        errorMessage.style.visibility = 'visible';
        invalidElements++;
      }
    });

    if (!invalidElements) {
      const local = getLocalData();

      processedMessage.classList.remove('hide');

      setTimeout(() => {
        const orderForm = document.querySelector('.order-background') as HTMLDivElement;
        const headerCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
        const headerAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;

        local.localCart.length = 0;
        local.localCounter = 0;
        local.localAmount = 0;

        headerCounter.innerText = String(local.localCounter);
        headerAmount.innerText = String(local.localAmount);

        setLocalData(local);

        body.removeChild(orderForm);
        body.appendChild(renderOrderForm());

        resetFilters();
      }, 3000);
    }
  });
}
