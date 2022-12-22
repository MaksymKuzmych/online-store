export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');

  footer.classList.add('footer');
  footer.innerHTML = `
  <button class="footer__btn-github btn">
    <img src="./assets/icons/github.svg" alt="github" class="footer__github-logo logo" />
  </button>
  <p class="footer__text">Online Store 2022</p>
  <button class="footer__btn-rsschool btn">
    <img src="./assets/icons/rs_school_js.svg" alt="rsschool" class="footer__rsschool-logo logo" />
  </button>
  `;
  return footer;
}
