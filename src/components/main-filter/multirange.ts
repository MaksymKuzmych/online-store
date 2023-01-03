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
  const rangeBackgrounds = [...component.querySelectorAll(".multi-range__background-color") as NodeListOf<HTMLElement>];
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

    connectButtonToInput(target).classList.remove("invalid");

    let minPosition = 0;
    let maxPosition = 100;

    function setLimitPosition(): void {
      if (target.classList.contains('left')) {
        maxPosition = +findOppositeButton(target).style.left.slice(0, -1);
      } else {
        minPosition = +findOppositeButton(target).style.left.slice(0, -1);
      }
    }
    setLimitPosition();

    const buttonPosition = +target.style.left.slice(0, -1);
    
    function onMouseMove(eventMove: MouseEvent): void {
      const offset = (eventMove.clientX - mousePosition) / range.clientWidth * 100;
      
      if (buttonPosition + offset < minPosition) {
        target.style.left = `${ minPosition }%`;
        connectButtonToInput(target).value = connectButtonToInput(target).min;
        if (target.classList.contains('price')) {
          rangeBackgrounds[0].style.marginLeft = `${ minPosition }%`;
          if (target.classList.contains('left')) {
            rangeBackgrounds[0].style.width = `${ maxPosition - minPosition }%`;
          } else {
            rangeBackgrounds[0].style.width = `0%`;
          }
        } else {
          rangeBackgrounds[1].style.marginLeft = `${ minPosition }%`;
          if (target.classList.contains('left')) {
            rangeBackgrounds[1].style.width = `${ maxPosition - minPosition }%`;
          } else {
            rangeBackgrounds[1].style.width = `0%`;
          }
        }
      } else if (buttonPosition + offset > maxPosition) {
        target.style.left = `${ maxPosition }%`;
        connectButtonToInput(target).value = connectButtonToInput(target).max;
        if (target.classList.contains('price')) {
          if (target.classList.contains('left')) {
            rangeBackgrounds[0].style.marginLeft = `${ maxPosition }%`;
            rangeBackgrounds[0].style.width = `0%`;
          } else {
            rangeBackgrounds[0].style.marginLeft = `${ minPosition }%`;
            rangeBackgrounds[0].style.width = `${ maxPosition - minPosition }%`;
          }
        } else {
          if (target.classList.contains('left')) {
            rangeBackgrounds[1].style.marginLeft = `${ maxPosition }%`;
            rangeBackgrounds[1].style.width = `0%`;
          } else {
            rangeBackgrounds[1].style.marginLeft = `${ minPosition }%`;
            rangeBackgrounds[1].style.width = `${ maxPosition - minPosition }%`;
          }
        }
      } else {
        target.style.left = `${ buttonPosition + offset }%`;
        if (target.classList.contains('left')) {
          connectButtonToInput(target).value =
          `${ Math.round((+connectButtonToInput(findOppositeButton(target)).max -
          +connectButtonToInput(target).min) * (offset + buttonPosition) / 100 +
          +connectButtonToInput(target).min) }`;
          if (target.classList.contains('price')) {
            rangeBackgrounds[0].style.width = `${ maxPosition - buttonPosition - offset }%`;
            rangeBackgrounds[0].style.marginLeft = `${ buttonPosition + offset }%`
          } else {
            rangeBackgrounds[1].style.width = `${ maxPosition - buttonPosition - offset }%`;
            rangeBackgrounds[1].style.marginLeft = `${ buttonPosition + offset }%`
          }
        } else {
          connectButtonToInput(target).value =
          `${ Math.round((+connectButtonToInput(target).max -
          +connectButtonToInput(findOppositeButton(target)).min) * (offset + buttonPosition) /
          100 + +connectButtonToInput(findOppositeButton(target)).min) }`;
          if (target.classList.contains('price')) {
            rangeBackgrounds[0].style.width = `${ buttonPosition + offset - minPosition }%`;
            rangeBackgrounds[0].style.marginLeft = `${ minPosition }%`
          } else {
            rangeBackgrounds[1].style.width = `${ buttonPosition + offset - minPosition }%`;
            rangeBackgrounds[1].style.marginLeft = `${ minPosition }%`
          }
        }
      }
      if (+connectButtonToInput(findOppositeButton(target)).value >=
      +connectButtonToInput(findOppositeButton(target)).min &&
      +connectButtonToInput(findOppositeButton(target)).value <=
      +connectButtonToInput(findOppositeButton(target)).max) {
        setLimitPosition();
        changeRange(connectButtonToInput(findOppositeButton(target)));
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

  function changeRange(targetInput: HTMLInputElement): void {
    const buttonInput = connectInputToButton(targetInput);
    const oppositeInput = connectButtonToInput(findOppositeButton(buttonInput));

    if (buttonInput.classList.contains('left')) {
      if (+targetInput.value > +oppositeInput.value || +targetInput.value < +targetInput.min) {
        targetInput.classList.add("invalid");
      } else {
        targetInput.classList.remove("invalid");
        buttonInput.style.left = `${ (+targetInput.value - +targetInput.min) /
        (+oppositeInput.max - +targetInput.min) * 100 }%`;
        if (buttonInput.classList.contains('price')) {
          rangeBackgrounds[0].style.width = `${ (+oppositeInput.value - +targetInput.value) /
          (+oppositeInput.max - +targetInput.min) * 100 }%`;
          rangeBackgrounds[0].style.marginLeft = `${ (+targetInput.value - +targetInput.min) /
          (+oppositeInput.max - +targetInput.min) * 100 }%`;
        } else {
          rangeBackgrounds[1].style.width = `${ (+oppositeInput.value - +targetInput.value) /
          (+oppositeInput.max - +targetInput.min) * 100 }%`;
          rangeBackgrounds[1].style.marginLeft = `${ (+targetInput.value - +targetInput.min) /
          (+oppositeInput.max - +targetInput.min) * 100 }%`;
        }
        const invalid: HTMLInputElement | null = component.querySelector(".invalid");
        if (invalid) {
          if (+invalid.value >= +targetInput.value) {
            changeRange(oppositeInput);
          }
        }
      }

    } else if (+targetInput.value < +oppositeInput.value || +targetInput.value > +targetInput.max) {
      targetInput.classList.add("invalid");
    } else {
      targetInput.classList.remove("invalid");
      buttonInput.style.left = `${ (+targetInput.value - +oppositeInput.min) / (+targetInput.max - +oppositeInput.min) *
      100 }%`;
      if (buttonInput.classList.contains('price')) {
        rangeBackgrounds[0].style.width = `${ (+targetInput.value - +oppositeInput.value) /
        (+targetInput.max - +oppositeInput.min) * 100 }%`;
        rangeBackgrounds[0].style.marginLeft = `${ (+oppositeInput.value - +oppositeInput.min) /
        (+targetInput.max - +oppositeInput.min) * 100 }%`;
      } else {
        rangeBackgrounds[1].style.width = `${ (+targetInput.value - +oppositeInput.value) /
        (+targetInput.max - +oppositeInput.min) * 100 }%`;
        rangeBackgrounds[1].style.marginLeft = `${ (+oppositeInput.value - +oppositeInput.min) /
        (+targetInput.max - +oppositeInput.min) * 100 }%`;
      }
      const invalid: HTMLInputElement | null = component.querySelector(".invalid");
      if (invalid) {
        if (+invalid.value <= +targetInput.value) {
          changeRange(oppositeInput);
        }
      }
    }
  }

  function changeInput(eventChange: Event): void {
    const targetInput = eventChange.target as HTMLInputElement;
    changeRange(targetInput);
  }
  rangeInputs.forEach(input => input.addEventListener('input', changeInput));
}