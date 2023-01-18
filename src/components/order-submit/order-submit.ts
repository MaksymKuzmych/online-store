import { checkPaymentListener } from './check-payment';
import { closeFormListener } from './close-form';
import { fillCardViewListener } from './fill-card-view';
import { orderValidation } from './order-vaildation';

export function renderOrderForm(): HTMLDivElement {
  const orderBackground = document.createElement('div');

  orderBackground.classList.add('order-background');
  orderBackground.classList.add('hide');
  orderBackground.innerHTML = `
  <div class="order">
    <form action="#" method="post" class="order__form" novalidate>
      <h2 class="order__title">Personal details</h2>
      <div class="order__field">
        <label class="order__label" for="name">First and last name:</label>
        <input id="name" type="text" name="name" class="order__input" pattern="[a-zA-Z]{3,}(\\s[a-zA-Z]{3,})+" />
        <div class="order__field-message">Invalid name</div>
      </div>
      <div class="order__field">
        <label class="order__label" for="phone">Phone number:</label>
        <input id="phone" type="tel" name="phone" class="order__input" pattern="\\+[0-9]{9,}" />
        <div class="order__field-message">Invalid number</div>
      </div>
      <div class="order__field">
        <label class="order__label" for="address">Delivery address:</label>
        <input
          id="address"
          type="text"
          name="address"
          class="order__input"
          pattern="[a-zA-Z0-9]{5,}\\s[a-zA-Z0-9]{5,}(\\s[a-zA-Z0-9]{5,})+"
        />
        <div class="order__field-message">Invalid address</div>
      </div>
      <div class="order__field">
        <label class="order__label" for="email">E-mail:</label>
        <input
          id="email"
          type="email"
          name="email"
          class="order__input"
          pattern="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
        />
        <div class="order__field-message">Invalid e-mail</div>
      </div>
      <h3 class="order__card-title">Credit card details</h3>
      <div class="card-details">
        <div class="order__field">
          <label class="order__label" for="card-number">
            Card number:
            <img src="./assets/payment-systems/paypal.svg" alt="system" class="card-details__img" />
          </label>
          <input
            id="card-number"
            type="tel"
            name="card-number"
            class="order__input order__input_card"
            inputmode="numeric"
            autocomplete="cc-number"
            pattern="[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}"
            placeholder="xxxx xxxx xxxx xxxx"
          />
          <div class="order__field-message">Invalid card number</div>
        </div>
        <div class="card-details__additional-info">
          <div class="order__field">
            <label class="order__label" for="valid-date"> Valid date: </label>
            <input
              id="valid-date"
              type="text"
              name="valid-date"
              class="order__input order__input_card"
              size="5"
              pattern="^(0[1-9]|1[0-2])/([0-9]{2})$"
              placeholder="xx/xx"
            />
            <div class="order__field-message">Invalid date</div>
          </div>
          <div class="order__field">
            <label class="order__label" for="cvv"> CVV: </label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              class="order__input order__input_card"
              size="3"
              pattern="[0-9]{3}"
              placeholder="xxx"
            />
            <div class="order__field-message">Invalid cvv</div>
          </div>
        </div>
      </div>
      <button class="order__submit btn">Submit</button>
      <p class="order__processed-message hide">ORDER IS PROCESSED</p>
    </form>
  </div>
  `;

  orderValidation(orderBackground);
  checkPaymentListener(orderBackground);
  fillCardViewListener(orderBackground);
  closeFormListener(orderBackground);

  return orderBackground;
}
