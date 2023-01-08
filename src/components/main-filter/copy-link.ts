export function CopyLinkListener(component: HTMLElement): void {
  const copyLinkButton = component.querySelector('.reset-total__btn-copy') as HTMLButtonElement;

  copyLinkButton.addEventListener('click', () => {
    console.log(location.href);
  });
}
