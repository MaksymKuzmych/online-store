import { setLimitValue } from './set-limit-value';

let filtersContainer: HTMLDivElement;

export function setMultirange(filters: HTMLDivElement): void {
  const fromPrice = filters.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const toPrice = filters.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const fromStock = filters.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const toStock = filters.querySelector('.slider__to-data__input-stock') as HTMLInputElement;
  const rangeButtons = [...(filters.querySelectorAll('.multi-range__btn') as NodeListOf<HTMLButtonElement>)];
  const rangeInputs = [fromPrice, toPrice, fromStock, toStock];

  filtersContainer = filters;

  setLimitValue(filters);

  rangeButtons.forEach((button) => button.addEventListener('mousedown', moveButton));
  rangeInputs.forEach((input) => input.addEventListener('input', (event) => changeInput(event, filters)));

  changeRange(fromPrice, filters);
  changeRange(toPrice, filters);
  changeRange(fromStock, filters);
  changeRange(toStock, filters);
}

function moveButton(eventDown: MouseEvent): void {
  const target = eventDown.target as HTMLButtonElement;

  connectButtonToInput(target).classList.remove('invalid');

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(): void {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function changeInput(eventChange: Event, component: HTMLDivElement): void {
  const targetInput = eventChange.target as HTMLInputElement;
  changeRange(targetInput, component);
}

function findOppositeButton(currentButton: HTMLButtonElement): HTMLButtonElement {
  const rangeButtons = [...(filtersContainer.querySelectorAll('.multi-range__btn') as NodeListOf<HTMLElement>)];

  if (currentButton.classList.contains('price')) {
    return rangeButtons.find(
      (buttonToFind) => buttonToFind.classList.contains('price') && buttonToFind !== currentButton,
    ) as HTMLButtonElement;
  } else {
    return rangeButtons.find(
      (buttonToFind) => !buttonToFind.classList.contains('price') && buttonToFind !== currentButton,
    ) as HTMLButtonElement;
  }
}

function connectButtonToInput(button: HTMLButtonElement): HTMLInputElement {
  const fromPrice = filtersContainer.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const toPrice = filtersContainer.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const fromStock = filtersContainer.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const toStock = filtersContainer.querySelector('.slider__to-data__input-stock') as HTMLInputElement;

  if (button.classList.contains('left') && button.classList.contains('price')) {
    fromPrice.max = toPrice.value;
    return fromPrice;
  }
  if (button.classList.contains('right') && button.classList.contains('price')) {
    toPrice.min = fromPrice.value;
    return toPrice;
  }
  if (button.classList.contains('left') && button.classList.contains('stock')) {
    fromStock.max = toStock.value;
    return fromStock;
  }
  toStock.min = fromStock.value;
  return toStock;
}

function connectInputToButton(element: HTMLInputElement): HTMLButtonElement {
  const fromPrice = filtersContainer.querySelector('.slider__from-data__input-price') as HTMLInputElement;
  const toPrice = filtersContainer.querySelector('.slider__to-data__input-price') as HTMLInputElement;
  const fromStock = filtersContainer.querySelector('.slider__from-data__input-stock') as HTMLInputElement;
  const toStock = filtersContainer.querySelector('.slider__to-data__input-stock') as HTMLInputElement;
  const rangeButtons = [...(filtersContainer.querySelectorAll('.multi-range__btn') as NodeListOf<HTMLButtonElement>)];

  if (element.classList.contains('slider__from-data__input-price')) {
    fromPrice.max = toPrice.value;
    return rangeButtons.find(
      (buttonToFind) => buttonToFind.classList.contains('price') && buttonToFind.classList.contains('left'),
    ) as HTMLButtonElement;
  }
  if (element.classList.contains('slider__to-data__input-price')) {
    toPrice.min = fromPrice.value;
    return rangeButtons.find(
      (buttonToFind) => buttonToFind.classList.contains('price') && buttonToFind.classList.contains('right'),
    ) as HTMLButtonElement;
  }
  if (element.classList.contains('slider__from-data__input-stock')) {
    fromStock.max = toStock.value;
    return rangeButtons.find(
      (buttonToFind) => buttonToFind.classList.contains('stock') && buttonToFind.classList.contains('left'),
    ) as HTMLButtonElement;
  }
  toStock.min = fromStock.value;
  return rangeButtons.find(
    (buttonToFind) => buttonToFind.classList.contains('stock') && buttonToFind.classList.contains('right'),
  ) as HTMLButtonElement;
}

function setLimitPosition(target: HTMLButtonElement): number[] {
  let minPosition = 0;
  let maxPosition = 100;

  if (target.classList.contains('left')) {
    maxPosition = +findOppositeButton(target).style.left.slice(0, -1);
  } else {
    minPosition = +findOppositeButton(target).style.left.slice(0, -1);
  }

  return [minPosition, maxPosition];
}

function onMouseMove(eventMove: MouseEvent): void {
  const mousePosition = eventDown.clientX;
  const buttonPosition = +target.style.left.slice(0, -1);
  const range = component.querySelector('.multi-range__range') as HTMLElement;
  const rangeBackgrounds = [
    ...(component.querySelectorAll('.multi-range__background-color') as NodeListOf<HTMLElement>),
  ];
  const minPosition = setLimitPosition(target)[0];
  const maxPosition = setLimitPosition(target)[1];
  const offset = ((eventMove.clientX - mousePosition) / range.clientWidth) * 100;

  if (buttonPosition + offset < minPosition) {
    target.style.left = `${minPosition}%`;
    connectButtonToInput(target).value = connectButtonToInput(target).min;
    if (target.classList.contains('price')) {
      rangeBackgrounds[0].style.marginLeft = `${minPosition}%`;
      if (target.classList.contains('left')) {
        rangeBackgrounds[0].style.width = `${maxPosition - minPosition}%`;
      } else {
        rangeBackgrounds[0].style.width = `0%`;
      }
    } else {
      rangeBackgrounds[1].style.marginLeft = `${minPosition}%`;
      if (target.classList.contains('left')) {
        rangeBackgrounds[1].style.width = `${maxPosition - minPosition}%`;
      } else {
        rangeBackgrounds[1].style.width = `0%`;
      }
    }
  } else if (buttonPosition + offset > maxPosition) {
    target.style.left = `${maxPosition}%`;
    connectButtonToInput(target).value = connectButtonToInput(target).max;
    if (target.classList.contains('price')) {
      if (target.classList.contains('left')) {
        rangeBackgrounds[0].style.marginLeft = `${maxPosition}%`;
        rangeBackgrounds[0].style.width = `0%`;
      } else {
        rangeBackgrounds[0].style.marginLeft = `${minPosition}%`;
        rangeBackgrounds[0].style.width = `${maxPosition - minPosition}%`;
      }
    } else {
      if (target.classList.contains('left')) {
        rangeBackgrounds[1].style.marginLeft = `${maxPosition}%`;
        rangeBackgrounds[1].style.width = `0%`;
      } else {
        rangeBackgrounds[1].style.marginLeft = `${minPosition}%`;
        rangeBackgrounds[1].style.width = `${maxPosition - minPosition}%`;
      }
    }
  } else {
    target.style.left = `${buttonPosition + offset}%`;
    if (target.classList.contains('left')) {
      connectButtonToInput(target).value = `${Math.round(
        ((+connectButtonToInput(findOppositeButton(target)).max - +connectButtonToInput(target).min) *
          (offset + buttonPosition)) /
          100 +
          +connectButtonToInput(target).min,
      )}`;
      if (target.classList.contains('price')) {
        rangeBackgrounds[0].style.width = `${maxPosition - buttonPosition - offset}%`;
        rangeBackgrounds[0].style.marginLeft = `${buttonPosition + offset}%`;
      } else {
        rangeBackgrounds[1].style.width = `${maxPosition - buttonPosition - offset}%`;
        rangeBackgrounds[1].style.marginLeft = `${buttonPosition + offset}%`;
      }
    } else {
      connectButtonToInput(target).value = `${Math.round(
        ((+connectButtonToInput(target).max - +connectButtonToInput(findOppositeButton(target)).min) *
          (offset + buttonPosition)) /
          100 +
          +connectButtonToInput(findOppositeButton(target)).min,
      )}`;
      if (target.classList.contains('price')) {
        rangeBackgrounds[0].style.width = `${buttonPosition + offset - minPosition}%`;
        rangeBackgrounds[0].style.marginLeft = `${minPosition}%`;
      } else {
        rangeBackgrounds[1].style.width = `${buttonPosition + offset - minPosition}%`;
        rangeBackgrounds[1].style.marginLeft = `${minPosition}%`;
      }
    }
  }
  if (
    connectButtonToInput(findOppositeButton(target)).classList.contains('invalid') &&
    +connectButtonToInput(findOppositeButton(target)).value >= +connectButtonToInput(findOppositeButton(target)).min &&
    +connectButtonToInput(findOppositeButton(target)).value <= +connectButtonToInput(findOppositeButton(target)).max
  ) {
    changeRange(connectButtonToInput(findOppositeButton(target)));
    setLimitPosition();
  }
}

function changeRange(targetInput: HTMLInputElement, component: HTMLDivElement): void {
  const buttonInput = connectInputToButton(targetInput);
  const oppositeInput = connectButtonToInput(findOppositeButton(buttonInput));
  const rangeBackgrounds = [
    ...(component.querySelectorAll('.multi-range__background-color') as NodeListOf<HTMLDivElement>),
  ];

  if (buttonInput.classList.contains('left')) {
    if (+targetInput.value > +oppositeInput.value || +targetInput.value < +targetInput.min) {
      targetInput.classList.add('invalid');
    } else {
      targetInput.classList.remove('invalid');
      buttonInput.style.left = `${
        ((+targetInput.value - +targetInput.min) / (+oppositeInput.max - +targetInput.min)) * 100
      }%`;
      if (buttonInput.classList.contains('price')) {
        rangeBackgrounds[0].style.width = `${
          ((+oppositeInput.value - +targetInput.value) / (+oppositeInput.max - +targetInput.min)) * 100
        }%`;
        rangeBackgrounds[0].style.marginLeft = `${
          ((+targetInput.value - +targetInput.min) / (+oppositeInput.max - +targetInput.min)) * 100
        }%`;
      } else {
        rangeBackgrounds[1].style.width = `${
          ((+oppositeInput.value - +targetInput.value) / (+oppositeInput.max - +targetInput.min)) * 100
        }%`;
        rangeBackgrounds[1].style.marginLeft = `${
          ((+targetInput.value - +targetInput.min) / (+oppositeInput.max - +targetInput.min)) * 100
        }%`;
      }
      if (oppositeInput.classList.contains('invalid') && +oppositeInput.value >= +targetInput.value) {
        changeRange(oppositeInput, component);
      }
    }
  } else if (+targetInput.value < +oppositeInput.value || +targetInput.value > +targetInput.max) {
    targetInput.classList.add('invalid');
  } else {
    targetInput.classList.remove('invalid');
    buttonInput.style.left = `${
      ((+targetInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min)) * 100
    }%`;
    if (buttonInput.classList.contains('price')) {
      rangeBackgrounds[0].style.width = `${
        ((+targetInput.value - +oppositeInput.value) / (+targetInput.max - +oppositeInput.min)) * 100
      }%`;
      rangeBackgrounds[0].style.marginLeft = `${
        ((+oppositeInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min)) * 100
      }%`;
    } else {
      rangeBackgrounds[1].style.width = `${
        ((+targetInput.value - +oppositeInput.value) / (+targetInput.max - +oppositeInput.min)) * 100
      }%`;
      rangeBackgrounds[1].style.marginLeft = `${
        ((+oppositeInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min)) * 100
      }%`;
    }
    if (oppositeInput.classList.contains('invalid') && +oppositeInput.value <= +targetInput.value) {
      changeRange(oppositeInput, component);
    }
  }
}
