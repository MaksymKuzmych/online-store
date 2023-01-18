export function fillCardViewListener(orderBackgroundDiv: HTMLDivElement): void {
  const cardNumberField = orderBackgroundDiv.querySelector('#card-number') as HTMLInputElement;
  const cardDateField = orderBackgroundDiv.querySelector('#valid-date') as HTMLInputElement;
  const cardCVVField = orderBackgroundDiv.querySelector('#cvv') as HTMLInputElement;

  cardNumberField.addEventListener('input', () => {
    if (
      cardNumberField.value.length === 4 ||
      cardNumberField.value.length === 9 ||
      cardNumberField.value.length === 14
    ) {
      cardNumberField.value += ' ';
    } else if (
      cardNumberField.value.length === 5 ||
      cardNumberField.value.length === 10 ||
      cardNumberField.value.length === 15
    ) {
      cardNumberField.value = cardNumberField.value.trim();
    }

    if (cardNumberField.value.length > 19) {
      cardNumberField.value = cardNumberField.value.slice(0, cardNumberField.value.length - 1);
    }
  });

  cardDateField.addEventListener('input', () => {
    if (cardDateField.value.length === 2) {
      cardDateField.value += '/';
    } else if (cardDateField.value.length === 3) {
      cardDateField.value = cardDateField.value.slice(0, cardDateField.value.length - 1);
    }

    if (cardDateField.value.length > 5) {
      cardDateField.value = cardDateField.value.slice(0, cardDateField.value.length - 1);
    }
  });

  cardCVVField.addEventListener('input', () => {
    if (cardCVVField.value.length > 3) {
      cardCVVField.value = cardCVVField.value.slice(0, cardCVVField.value.length - 1);
    }
  });
}
