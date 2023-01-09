export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');

  footer.classList.add('footer');
  footer.innerHTML = `
  <div class="footer__github">
    <a href="https://github.com/MaksymKuzmych" class="footer__btn-github btn">
      <img src="./assets/icons/github.svg" alt="github" class="footer__github-logo logo" />
    </a>
    <a href="https://github.com/vladyka-nazarii" class="footer__btn-github btn">
      <img src="./assets/icons/github.svg" alt="github" class="footer__github-logo logo" />
    </a>
  </div>
  <p class="footer__text">Online Store 2022</p>
  <a href="https://rs.school/js/" class="footer__btn-rsschool btn">
    <img src="./assets/icons/rs_school_js.svg" alt="rsschool" class="footer__rsschool-logo logo" />
  </a>
  `;
  return footer;
}
