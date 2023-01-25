export function checkPaymentListener(orderBackgroundDiv: HTMLDivElement): void {
  const cardNumberField = orderBackgroundDiv.querySelector('#card-number') as HTMLInputElement;
  const paymentSystemImg = orderBackgroundDiv.querySelector('.card-details__img') as HTMLImageElement;

  cardNumberField.addEventListener('input', () => {
    switch (cardNumberField.value[0]) {
      case '4':
        paymentSystemImg.src = './assets/payment-systems/visa.svg';
        break;
      case '5':
        paymentSystemImg.src = './assets/payment-systems/mastercard.svg';
        break;
      default:
        paymentSystemImg.src = './assets/payment-systems/paypal.svg';
    }
  });
}
