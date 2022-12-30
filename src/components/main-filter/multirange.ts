export function setMultirange() {
  const range = document.querySelector(".multi-range__range") as HTMLElement;
  const fromPriceBtn = document.querySelector(".left-price") as HTMLElement;
  // const toPriceBtn = document.querySelector(".right-price") as HTMLElement;
  // const fromStockBtn = document.querySelector(".left-stock") as HTMLElement;
  // const toStockBtn = document.querySelector(".right-stock") as HTMLElement;

  fromPriceBtn.onmousedown = function (eventDown: MouseEvent): void {
    const buttonPosition = fromPriceBtn.style.left.slice(0, -1);
    const mousePosition = eventDown.clientX;
    const rangeWidth = range.clientWidth - fromPriceBtn.clientWidth;
    
    // console.log(buttonPosition);
    // console.log(range.clientWidth);
    function onMouseMove(eventMove: MouseEvent): void {
      fromPriceBtn.style.left = `${ +buttonPosition + ((eventMove.clientX - mousePosition) / rangeWidth) * 100 }%`
      // console.log(eventMove.clientX);
    }
    document.addEventListener('mousemove', onMouseMove);

    onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      onmouseup = null;
    };
  }
}