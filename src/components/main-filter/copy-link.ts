export function CopyLinkListener(component: HTMLElement): void {
  const copyLinkButton = component.querySelector('.reset-total__btn-copy') as HTMLButtonElement;

  copyLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(location.href);
    copyLinkButton.innerText = 'Copied!';
    setTimeout(() => {
      copyLinkButton.innerText = 'Copy Link';
    }, 1000);
  });
}
