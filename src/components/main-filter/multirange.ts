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

  function connectButtonToInput(element: HTMLElement) {
    if (element.className.includes('left') && element.className.includes('price')) {
      return fromPrice;
    }
    if (element.className.includes('right') && element.className.includes('price')) {
      return toPrice;
    }
    if (element.className.includes('left') && element.className.includes('stock')) {
      return fromStock;
    }
    return toStock;
  }

  const range = component.querySelector(".multi-range__range") as HTMLElement;
  const rangeButtons = [...component.querySelectorAll(".multi-range__btn") as NodeListOf<HTMLElement>];

  function findOppositeButton(currentButton: HTMLElement): HTMLElement {
    if (currentButton.className.includes('price')) {
      return rangeButtons.find(buttonToFind => buttonToFind.className.includes('price') &&
      buttonToFind !== currentButton) as HTMLElement;
    } else {
      return rangeButtons.find(buttonToFind => !buttonToFind.className.includes('price') &&
      buttonToFind !== currentButton) as HTMLElement;
    }
  }

  function moveButton(eventDown: MouseEvent): void {
    const target = eventDown.target as HTMLElement;
    const mousePosition = eventDown.clientX;

    let minPosition = 0;
    let maxPosition = 100;
    if (target.className.includes('left')) {
      maxPosition = (range.clientWidth - target.clientWidth * 2) / range.clientWidth * 100 - 100 +
      parseFloat(findOppositeButton(target).style.left.slice(0, -1));
    }
    if (target.className.includes('right')) {
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