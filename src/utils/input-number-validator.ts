export function inputNumberValidator(): void {
  const inputs = document.querySelectorAll('input[type=number]') as NodeListOf<HTMLInputElement>;
  Array.from(inputs).forEach((input) => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('input', () => {
      const value = +input.value;
      if (value > max) {
        input.value = String(max);
      } else if (value < min) {
        input.value = String(min);
      }
    });
  });
}
