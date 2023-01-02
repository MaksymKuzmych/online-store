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
      return fromPrice;
    }
    if (element.classList.contains('right') && element.classList.contains('price')) {
      return toPrice;
    }
    if (element.classList.contains('left') && element.classList.contains('stock')) {
      return fromStock;
    }
    return toStock;
  }

  const range = component.querySelector(".multi-range__range") as HTMLElement;
  const rangeButtons = [...component.querySelectorAll(".multi-range__btn") as NodeListOf<HTMLElement>];

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
      parseFloat(findOppositeButton(target).style.left.slice(0, -1));
    }
    if (target.classList.contains('right')) {
      minPosition = target.clientWidth * 2 / range.clientWidth * 100 +
      parseFloat(findOppositeButton(target).style.left.slice(0, -1));
    }

    const buttonPosition = parseFloat(target.style.left.slice(0, -1));
    
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
        connectButtonToInput(target).value =
        `${ Math.round((parseInt(connectButtonToInput(target).max) - parseInt(connectButtonToInput(target).min)) *
        (offset + buttonPosition) / 100) }`;
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mouseup', onMouseUp);
  }
  rangeButtons.forEach(button => button.addEventListener('mousedown', moveButton));
}