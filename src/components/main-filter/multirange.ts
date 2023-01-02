import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';

export function findLimitValue(array: IWatch[], value: 'price' | 'stock', type: 'min' | 'max') {
  return Math[type](...array.map(item => item[value]));
}

export function setMultirange(component: HTMLElement): void {
  const fromPrice = component.querySelector(".slider__from-data__input-price") as HTMLInputElement;
  const toPrice = component.querySelector(".slider__to-data__input-price") as HTMLInputElement;
  const fromStock = component.querySelector(".slider__from-data__input-stock") as HTMLInputElement;
  const toStock = component.querySelector(".slider__to-data__input-stock") as HTMLInputElement;

  fromPrice.value = fromPrice.min = toPrice.min =
  `${findLimitValue(watchData, 'price', 'min')}`;

  toPrice.value = fromPrice.max = toPrice.max =
  `${findLimitValue(watchData, 'price', 'max')}`;

  fromStock.value = fromStock.min = toStock.min =
  `${findLimitValue(watchData, 'stock', 'min')}`;

  toStock.value = fromStock.max = toStock.max =
  `${findLimitValue(watchData, 'stock', 'max')}`;

  function connectButtonToInput(element: HTMLButtonElement): HTMLInputElement {
    if (element.classList.contains('left') && element.classList.contains('price')) {
      fromPrice.max = toPrice.value;
      return fromPrice;
    }
    if (element.classList.contains('right') && element.classList.contains('price')) {
      toPrice.min = fromPrice.value;
      return toPrice;
    }
    if (element.classList.contains('left') && element.classList.contains('stock')) {
      fromStock.max = toStock.value;
      return fromStock;
    }
    toStock.min = fromStock.value;
    return toStock;
  }

  const range = component.querySelector(".multi-range__range") as HTMLElement;
  const rangeButtons = [...component.querySelectorAll(".multi-range__btn") as NodeListOf<HTMLElement>];
  const rangeInputs = [fromPrice, toPrice, fromStock, toStock];

  function findOppositeButton(currentButton: HTMLButtonElement): HTMLButtonElement {
    if (currentButton.classList.contains('price')) {
      return rangeButtons.find(buttonToFind => buttonToFind.classList.contains('price') &&
      buttonToFind !== currentButton) as HTMLButtonElement;
    } else {
      return rangeButtons.find(buttonToFind => !buttonToFind.classList.contains('price') &&
      buttonToFind !== currentButton) as HTMLButtonElement;
    }
  }

  function moveButton(eventDown: MouseEvent): void {
    const target = eventDown.target as HTMLButtonElement;
    const mousePosition = eventDown.clientX;

    let minPosition = 0;
    let maxPosition = 100;
    if (target.classList.contains('left')) {
      maxPosition = (range.clientWidth - target.clientWidth * 2) / range.clientWidth * 100 - 100 +
      +(findOppositeButton(target).style.left.slice(0, -1));
    } else {
      minPosition = target.clientWidth * 2 / range.clientWidth * 100 +
      +(findOppositeButton(target).style.left.slice(0, -1));
    }

    const buttonPosition = +(target.style.left.slice(0, -1));
    
    function onMouseMove(eventMove: MouseEvent): void {
      const offset = (eventMove.clientX - mousePosition) / range.clientWidth * 100;
      
      if (buttonPosition + offset < minPosition) {
        target.style.left = `${ minPosition }%`;
        connectButtonToInput(target).value = connectButtonToInput(target).min;
      } else if (buttonPosition + offset > maxPosition) {
        target.style.left = `${ maxPosition }%`;
        connectButtonToInput(target).value = connectButtonToInput(target).max;
      } else {
        target.style.left = `${ buttonPosition + offset }%`;
        if (target.classList.contains('left')) {
          connectButtonToInput(target).value =
          `${ Math.round((+(connectButtonToInput(findOppositeButton(target)).max) -
          +(connectButtonToInput(target).min)) *
          (offset + buttonPosition) / ((range.clientWidth - target.clientWidth * 2) /
          range.clientWidth * 100)) }`;
        } else {
          connectButtonToInput(target).value =
          `${ Math.round((+(connectButtonToInput(target).max) -
          +(connectButtonToInput(findOppositeButton(target)).min)) *
          (offset + buttonPosition - (target.clientWidth * 2 / range.clientWidth * 100)) /
          ((range.clientWidth - target.clientWidth * 2) / range.clientWidth * 100)) }`;
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mouseup', onMouseUp);
  }
  rangeButtons.forEach(button => button.addEventListener('mousedown', moveButton));

  function connectInputToButton(element: HTMLInputElement): HTMLButtonElement{
    if (element.classList.contains('slider__from-data__input-price')) {
      fromPrice.max = toPrice.value;
      return rangeButtons.find(buttonToFind => buttonToFind.classList.contains('price') &&
      buttonToFind.classList.contains('left')) as HTMLButtonElement;
    }
    if (element.classList.contains('slider__to-data__input-price')) {
      toPrice.min = fromPrice.value;
      return rangeButtons.find(buttonToFind => buttonToFind.classList.contains('price') &&
      buttonToFind.classList.contains('right')) as HTMLButtonElement;
    }
    if (element.classList.contains('slider__from-data__input-stock')) {
      fromStock.max = toStock.value;
      return rangeButtons.find(buttonToFind => buttonToFind.classList.contains('stock') &&
      buttonToFind.classList.contains('left')) as HTMLButtonElement;
    }
    toStock.min = fromStock.value;
    return rangeButtons.find(buttonToFind => buttonToFind.classList.contains('stock') &&
    buttonToFind.classList.contains('right')) as HTMLButtonElement;
  }

  function changeInput(eventChange: Event): void {
    const targetInput = eventChange.target as HTMLInputElement;
    const buttonInput = connectInputToButton(targetInput);
    const oppositeInput = connectButtonToInput(findOppositeButton(buttonInput));
    const offset = (buttonInput.clientWidth * 2) / range.clientWidth;

    if (buttonInput.classList.contains('left')) {
      if (+targetInput.value > +oppositeInput.value || +targetInput.value < +targetInput.min) {
        targetInput.classList.add("invalid");
      } else {
        targetInput.classList.remove("invalid");
        buttonInput.style.left = `${+targetInput.value / (+oppositeInput.max - +targetInput.min) *
        100 * (1 - offset)}%`;
      }
    } else if (+targetInput.value < +oppositeInput.value || +targetInput.value > +targetInput.max) {
      targetInput.classList.add("invalid");
    } else {
      targetInput.classList.remove("invalid");
      buttonInput.style.left = `${+targetInput.value / (+targetInput.max - +oppositeInput.min) *
      100 * (1 - offset) + (offset * 100)}%`;
    }
  }
  rangeInputs.forEach(input => input.addEventListener('input', changeInput));
}