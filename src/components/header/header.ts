export function renderHeader(): void {
  const purchasesAmount: HTMLParagraphElement | null = document.querySelector('.purchases__amount');
  const purchasesCounter: HTMLParagraphElement | null = document.querySelector('.purchases__counter');

  // here will be getter from localStorage or 0 during render
  if (purchasesAmount) purchasesAmount.innerHTML = `Total amount: 0$`;
  if (purchasesCounter) purchasesCounter.innerHTML = '0';
}
