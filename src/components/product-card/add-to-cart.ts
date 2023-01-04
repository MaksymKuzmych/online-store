import { IWatch } from '../../interfaces';
import { getLocalData } from '../../utils/get-local-data';
import { setLocalData } from '../../utils/set-local-data';

export function addToCartListener(cardEl: HTMLElement, item: IWatch): void {
  const cartCounter = document.querySelector('.purchases__counter') as HTMLParagraphElement;
  const totalAmount = document.querySelector('.purchases__amount_number') as HTMLSpanElement;
  
  cardEl.addEventListener('click', (event): void => {
    const target = event.target as HTMLElement;
    const local = getLocalData();


    if (target.classList.contains('options__btn_add')) {
      if (target.innerText === 'Add to Cart') {
        cartCounter.innerText = `${ local.localCounter + 1 }`;
        local.localCounter += 1;
        totalAmount.innerText = `${ local.localAmount + item.price }`;
        local.localAmount += item.price;
        local.localCart.push({id: item.id, quantity: 1});
        target.innerText = 'Remove from Cart';
      } else {
        cartCounter.innerText = `${ local.localCounter - 1 }`;
        local.localCounter -= 1;
        totalAmount.innerText = `${ local.localAmount - item.price }`;
        local.localAmount -= item.price;
        local.localCart = local.localCart.filter(element => element.id !== item.id);
        target.innerText = 'Add to Cart';
      }
      setLocalData(local);
    }
  });
}
