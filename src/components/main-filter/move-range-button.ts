import { connectButtonToInput, findOppositeButton } from './multirange';

export function moveButtonMouse(eventMousedown: MouseEvent): void {
  const target = eventMousedown.target as HTMLButtonElement;
  const buttonPosition = +target.style.left.slice(0, -1);
  const startMousePosition = eventMousedown.clientX;

  connectButtonToInput(target).classList.remove('invalid');

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousemove', onMouseUp);
  }

  function onMouseMove(eventMouseMove: MouseEvent): void {
    const currentMousePosition = eventMouseMove.clientX;
    moveButton(target, buttonPosition, startMousePosition, currentMousePosition);
  }
}

export function moveButtonTouch(eventTouchstart: TouchEvent): void {
  const target = eventTouchstart.target as HTMLButtonElement;
  const buttonPosition = +target.style.left.slice(0, -1);
  const startMousePosition = eventTouchstart.touches[0].clientX;

  connectButtonToInput(target).classList.remove('invalid');

  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);

  function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }

  function onTouchMove(eventTouchMove: TouchEvent): void {
    const currentMousePosition = eventTouchMove.touches[0].clientX;
    moveButton(target, buttonPosition, startMousePosition, currentMousePosition);
  }
}

function moveButton(
  target: HTMLButtonElement,
  buttonPosition: number,
  startMousePosition: number,
  currentMousePosition: number,
): void {
  const range = target.parentElement as HTMLDivElement;
  const rangeBackground = target.parentElement?.querySelector('.multi-range__background-color') as HTMLDivElement;
  const minPosition = setLimitPosition(target)[0];
  const maxPosition = setLimitPosition(target)[1];
  const offset = ((currentMousePosition - startMousePosition) / range.clientWidth) * 100;

  if (buttonPosition + offset < minPosition) {
    target.style.left = `${minPosition}%`;
    connectButtonToInput(target).value = connectButtonToInput(target).min;
    rangeBackground.style.marginLeft = `${minPosition}%`;

    if (target.classList.contains('left')) {
      rangeBackground.style.width = `${maxPosition - minPosition}%`;
    } else {
      rangeBackground.style.width = `0%`;
    }
  } else if (buttonPosition + offset > maxPosition) {
    target.style.left = `${maxPosition}%`;
    connectButtonToInput(target).value = connectButtonToInput(target).max;

    if (target.classList.contains('left')) {
      rangeBackground.style.marginLeft = `${maxPosition}%`;
      rangeBackground.style.width = `0%`;
    } else {
      rangeBackground.style.marginLeft = `${minPosition}%`;
      rangeBackground.style.width = `${maxPosition - minPosition}%`;
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
      rangeBackground.style.width = `${maxPosition - buttonPosition - offset}%`;
      rangeBackground.style.marginLeft = `${buttonPosition + offset}%`;
    } else {
      connectButtonToInput(target).value = `${Math.round(
        ((+connectButtonToInput(target).max - +connectButtonToInput(findOppositeButton(target)).min) *
          (offset + buttonPosition)) /
          100 +
          +connectButtonToInput(findOppositeButton(target)).min,
      )}`;
      rangeBackground.style.width = `${buttonPosition + offset - minPosition}%`;
      rangeBackground.style.marginLeft = `${minPosition}%`;
    }
  }
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
