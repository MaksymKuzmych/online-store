import { changeViewListener } from './change-view';
import { checkInputs } from './check-inputs';
import { fillQuantity } from './fill-quantity';
import { applyAllFilters, filteredArray, chosenBrands, filterProductsListener } from './filter-products';
import { setMultirange } from './multirange';
import { resetFiltersListener } from './reset-filters';
import { sortProductsListener } from './sort-products';

export function renderFilters(): HTMLElement {
  const filters = document.createElement('div');
  const itemsArray = chosenBrands.length ? chosenBrands : filteredArray;

  filters.classList.add('filters');
  filters.innerHTML = `
  <div class="search-bar">
  <input class="search-bar__input" type="search" placeholder="Search product">
  <p class="search-bar__found">Found: <span class="search_bar__result">0</span></p>
</div>
<div class="sort-bar">
  <select class="sort-bar__select" name="sort" id="sort" placeholder="hah">
    <option class="sort-bar__select-item" value="choose" disabled selected hidden>Choose sort option</option>
    <option class="sort-bar__select-item" value="price-up">Price 🡅</option>
    <option class="sort-bar__select-item" value="price-down">Price 🡇</option>
    <option class="sort-bar__select-item" value="availability-up">Stock Availability 🡅</option>
    <option class="sort-bar__select-item" value="availability-down">Stock Availability 🡇</option>
  </select>
  <div class="sort-bar__view">
    <div class="sort-bar__view-big">
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
      <div class="sort-bar__view-big-point"></div>
    </div>
    <div class="sort-bar__view-small">
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
      <div class="sort-bar__view-small-point"></div>
    </div>
  </div>
</div>
<div class="reset-total">
  <button class="reset-total__btn-reset">Reset Filters</button>
  <button class="reset-total__btn-copy">Copy Link</button>
</div>
<div class="filter">
  <h3 class="filter__title title">Options</h3>
  <div class="filter__list">
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="clockface-pointer" id="clockface-pointer">
      <label class="filter__label-checkbox" for="clockface-pointer">ClockFace: Pointer (<span class="clockface-pointer__result">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="clockface-digital" id="clockface-digital">
      <label class="filter__label-checkbox" for="clockface-digital">ClockFace: Digital (<span class="clockface-digital__result">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="mount-strap" id="mount-strap">
      <label class="filter__label-checkbox" for="mount-strap">Mount: Strap (<span class="mount-strap__result">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="mount-bracelet" id="mount-bracelet">
      <label class="filter__label-checkbox" for="mount-bracelet">Mount: Bracelet (<span class="mount-bracelet__result">0</span>)</label>
    </div>
  </div>
</div>
<div class="filter">
  <h3 class="filter__title title">Brand</h3>
  <div class="filter__list">
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="casio" id="casio" data-brand="Casio">
      <label class="filter__label-checkbox" for="casio">Casio (<span class="casio">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="citizen" id="citizen" data-brand="Citizen">
      <label class="filter__label-checkbox" for="citizen">Citizen (<span class="citizen">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="north-edge" id="north-edge" data-brand="North Edge">
      <label class="filter__label-checkbox" for="north-edge">North Edge (<span class="north-edge">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="seiko" id="seiko" data-brand="Seiko">
      <label class="filter__label-checkbox" for="seiko">Seiko (<span class="seiko">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="tag-heuer" id="tag-heuer" data-brand="TAG HEUER">
      <label class="filter__label-checkbox" for="tag-heuer">TAG HEUER (<span class="tag-heuer">0</span>)</label>
    </div>
    <div class="filter__checkbox">
      <input class="filter__input-checkbox" type="checkbox" name="fossil" id="fossil" data-brand="Fossil">
      <label class="filter__label-checkbox" for="fossil">Fossil (<span class="fossil">0</span>)</label>
    </div>
  </div>
</div>
<div class="slider">
  <h3 class="slider__title title">Price</h3>
  <div class="slider__out-data">
    <div class="slider__from-data">
      <span class="slider__usd">$</span>
      <input class="slider__from-data__input-price input-number" type="number" value="0">
    </div>
    <div class="slider__to-data">
      <span class="slider__usd">$</span>
      <input class="slider__to-data__input-price input-number" type="number" value="1000">
    </div>
  </div>
  <div class="slider__multi-range multi-range">
    <div class="multi-range__background"></div>
    <div class="multi-range__range">
      <div class="multi-range__background-color"></div>
      <button class="multi-range__btn left price" style="left: 0%;"></button>
      <button class="multi-range__btn right price" style="left: 100%;"></button>
    </div>
  </div>
</div>
<div class="slider">
  <h3 class="slider__title title">Stock</h3>
  <div class="slider__out-data">
    <div class="slider__from-data">
      <input class="slider__from-data__input-stock input-number" type="number" value="0">
    </div>
    <div class="slider__to-data">
      <input class="slider__to-data__input-stock input-number" type="number" value="100">
    </div>
  </div>
  <div class="slider__multi-range multi-range">
    <div class="multi-range__background"></div>
    <div class="multi-range__range">
      <div class="multi-range__background-color"></div>
      <button class="multi-range__btn left stock" style="left: 0%;"></button>
      <button class="multi-range__btn right stock" style="left: 100%;"></button>
    </div>
  </div>
</div>  
  `;

  setMultirange(filters);
  fillQuantity(filters, itemsArray);
  sortProductsListener(filters);
  filterProductsListener(filters);
  changeViewListener(filters);
  checkInputs(filters);
  applyAllFilters(filters);
  resetFiltersListener(filters);

  return filters;
}
