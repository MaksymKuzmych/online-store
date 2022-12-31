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

  const range = component.querySelector(".multi-range__range") as HTMLElement;
  const rangeButtons = component.querySelectorAll(".multi-range__btn") as NodeListOf<HTMLElement>;

  rangeButtons.forEach(button => button.addEventListener('mousedown', moveButton));
  function moveButton(eventDown: MouseEvent): void {
    const target = eventDown.target as HTMLElement;
    const mousePosition = eventDown.clientX;

    let minPosition = 0;
    let maxPosition = 0;
    if (target.className.includes('left')) {
      minPosition = 0;
      maxPosition = range.clientWidth - target.clientWidth * 2;
    }
    if (target.className.includes('right')) {
      minPosition = target.clientWidth * 2
      maxPosition = range.clientWidth;
    }

    let buttonPosition = 0;
    if (target.style.left === '0%') {
      buttonPosition = 0;
    } else if (target.style.left === '100%') {
      buttonPosition = maxPosition;
    } else {
      buttonPosition = parseInt(target.style.left.slice(0, -1));
    }

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
    
    function onMouseMove(eventMove: MouseEvent): void {
      const newButtonPosition = buttonPosition + eventMove.clientX - mousePosition;
      if (newButtonPosition < minPosition) {
        target.style.left = `${ minPosition }px`;
        connectButtonToInput(target).value = connectButtonToInput(target).min;
      } else if (newButtonPosition > maxPosition) {
        target.style.left = `${ maxPosition }px`;
        connectButtonToInput(target).value = connectButtonToInput(target).max;
      } else {
        target.style.left = `${ newButtonPosition }px`;
        connectButtonToInput(target).value =
        `${ Math.round((parseInt(connectButtonToInput(target).max) - parseInt(connectButtonToInput(target).min)) /
        (maxPosition - minPosition) * newButtonPosition) }`;
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mouseup', onMouseUp);
  }
}