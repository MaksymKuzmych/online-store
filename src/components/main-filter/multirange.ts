import { moveButtonMouse, moveButtonTouch } from './move-range-button';
import { setLimitValue } from './set-limit-value';

export function setMultirange(filtersContainer: HTMLDivElement): void {
  const rangeButtons = filtersContainer.querySelectorAll('.multi-range__btn') as NodeListOf<HTMLButtonElement>;
  const rangeInputs = filtersContainer.querySelectorAll('.input-number') as NodeListOf<HTMLInputElement>;

  updateMultirangePosition(filtersContainer);

  rangeButtons.forEach((button) => button.addEventListener('mousedown', moveButtonMouse));
  rangeButtons.forEach((button) => button.addEventListener('touchstart', moveButtonTouch));
  rangeInputs.forEach((input) => input.addEventListener('input', changeInput));
}

export function updateMultirangePosition(filtersContainer: HTMLDivElement) {
  const rangeInputs = filtersContainer.querySelectorAll('.input-number') as NodeListOf<HTMLInputElement>;

  setLimitValue(filtersContainer);
  rangeInputs.forEach((input) => changeRange(input));
}

export function findOpposite<Type>(current: Type): Type {
  if ((current as HTMLButtonElement).tagName === 'BUTTON') {
    const rangeButtons = [
      ...((current as HTMLButtonElement).parentElement?.querySelectorAll(
        '.multi-range__btn',
      ) as NodeListOf<HTMLButtonElement>),
    ];
    return rangeButtons.find((buttonToFind) => buttonToFind !== current) as Type;
  }
  const rangeInputs = [
    ...((current as HTMLInputElement).parentElement?.parentElement?.querySelectorAll(
      '.input-number',
    ) as NodeListOf<HTMLInputElement>),
  ];
  return rangeInputs.find((inputToFind) => inputToFind !== current) as Type;
}

function changeInput(eventChange: Event): void {
  const targetInput = eventChange.target as HTMLInputElement;
  changeRange(targetInput);
}

export function connectButtonToInput(currentButton: HTMLButtonElement): HTMLInputElement {
  const rangeInputs = [
    ...(currentButton.parentElement?.parentElement?.parentElement?.querySelectorAll(
      '.input-number',
    ) as NodeListOf<HTMLInputElement>),
  ];
  const fromInput = rangeInputs.find((inputToFind) => inputToFind.classList.contains('from')) as HTMLInputElement;
  const toInput = rangeInputs.find((inputToFind) => inputToFind.classList.contains('to')) as HTMLInputElement;

  if (currentButton.classList.contains('left')) {
    fromInput.max = toInput.value;
    return fromInput;
  }

  toInput.min = fromInput.value;
  return toInput;
}

function connectInputToButton(currentInput: HTMLInputElement): HTMLButtonElement {
  const rangeInputs = [
    ...(currentInput.parentElement?.parentElement?.querySelectorAll('.input-number') as NodeListOf<HTMLInputElement>),
  ];
  const fromInput = rangeInputs.find((inputToFind) => inputToFind.classList.contains('from')) as HTMLInputElement;
  const toInput = rangeInputs.find((inputToFind) => inputToFind.classList.contains('to')) as HTMLInputElement;
  const rangeButtons = [
    ...(currentInput.parentElement?.parentElement?.parentElement?.querySelectorAll(
      '.multi-range__btn',
    ) as NodeListOf<HTMLButtonElement>),
  ];
  const leftButton = rangeButtons.find((buttonToFind) => buttonToFind.classList.contains('left')) as HTMLButtonElement;
  const rightButton = rangeButtons.find((buttonToFind) =>
    buttonToFind.classList.contains('right'),
  ) as HTMLButtonElement;

  if (currentInput.classList.contains('from')) {
    fromInput.max = toInput.value;
    return leftButton;
  }

  toInput.min = fromInput.value;
  return rightButton;
}

export function changeRange(targetInput: HTMLInputElement): void {
  const buttonInput = connectInputToButton(targetInput);
  const oppositeInput = findOpposite(targetInput) as HTMLInputElement;
  const rangeBackground = targetInput.parentElement?.parentElement?.parentElement?.querySelector(
    '.multi-range__background-color',
  ) as HTMLDivElement;

  if (buttonInput.classList.contains('left')) {
    if (
      +targetInput.value > +oppositeInput.value ||
      +targetInput.value > +oppositeInput.max ||
      +targetInput.value < +targetInput.min
    ) {
      targetInput.classList.add('invalid');
    } else {
      targetInput.classList.remove('invalid');
      buttonInput.style.left = `${
        ((+targetInput.value - +targetInput.min) / (+oppositeInput.max - +targetInput.min)) * 100
      }%`;
      rangeBackground.style.width = `${
        ((+oppositeInput.value - +targetInput.value) / (+oppositeInput.max - +targetInput.min)) * 100
      }%`;
      rangeBackground.style.marginLeft = `${
        ((+targetInput.value - +targetInput.min) / (+oppositeInput.max - +targetInput.min)) * 100
      }%`;

      if (oppositeInput.classList.contains('invalid') && +oppositeInput.value >= +targetInput.value) {
        changeRange(oppositeInput);
      }
    }
  } else if (
    +targetInput.value < +oppositeInput.value ||
    +targetInput.value < +oppositeInput.min ||
    +targetInput.value > +targetInput.max
  ) {
    targetInput.classList.add('invalid');
  } else {
    targetInput.classList.remove('invalid');
    buttonInput.style.left = `${
      ((+targetInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min)) * 100
    }%`;
    rangeBackground.style.width = `${
      ((+targetInput.value - +oppositeInput.value) / (+targetInput.max - +oppositeInput.min)) * 100
    }%`;
    rangeBackground.style.marginLeft = `${
      ((+oppositeInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min)) * 100
    }%`;

    if (oppositeInput.classList.contains('invalid') && +oppositeInput.value <= +targetInput.value) {
      changeRange(oppositeInput);
    }
  }
}
