export function renderFilters(): HTMLElement {
  const filters = document.createElement('div');

  filters.classList.add('filters');
  filters.innerHTML = `
  <div class="search_bar">
  <input type="search" placeholder="Search product">
  <p>Found: 0</p>
</div>
<div class="sort_bar">
  <select class="select_sort" name="sort" id="sort">
    <option value="price-up">Price Up</option>
    <option value="price-down">Price Down</option>
    <option value="rating">Rating</option>
    <option value="discount">Discount</option>
  </select>
  <div class="view_mode">
    <div class="big_view">
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
      <div class="big_point"></div>
    </div>
    <div class="small_view">
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
      <div class="small_point"></div>
    </div>
  </div>
</div>
<div class="reset_total">
  <button class="btn_reset">Reset Filters</button>
  <button class="btn_copy">Copy Link</button>
</div>
<div class="filter_category">
  <h3 class="title">Options</h3>
  <div class="filter_list">
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="pointer" id="pointer">
      <label class="label_checkbox" for="pointer">ClockFace: Pointer</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="digital" id="digital">
      <label class="label_checkbox" for="digital">ClockFace: Digital</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="strap" id="strap">
      <label class="label_checkbox" for="strap">Mount: Strap</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="bracelet" id="bracelet">
      <label class="label_checkbox" for="bracelet">Mount: Bracelet</label>
      <span>(0)</span>
    </div>
  </div>
</div>
<div class="filter_brand">
  <h3 class="title">Brand</h3>
  <div class="filter_list">
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="Casio" id="Casio">
      <label class="label_checkbox" for="Casio">Casio</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="Citizen" id="Citizen">
      <label class="label_checkbox" for="Citizen">Citizen</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="North Edge" id="North Edge">
      <label class="label_checkbox" for="North Edge">North Edge</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="Seiko" id="Seiko">
      <label class="label_checkbox" for="Seiko">Seiko</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="TAG HEUER" id="TAG HEUER">
      <label class="label_checkbox" for="TAG HEUER">TAG HEUER</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input class="input_checkbox" type="checkbox" name="Fossil" id="Fossil">
      <label class="label_checkbox" for="Fossil">Fossil</label>
      <span>(0)</span>
    </div>
  </div>
</div>
<div class="slider_price">
  <h3 class="title">Price</h3>
  <div class="out_data">
    <div class="from_data">
      <span>$</span>
      <input type="number" value="0">
    </div>
    <div class="to_data">
      <span>$</span>
      <input type="number" value="1000">
    </div>
  </div>
  <div class="multi_range">
    <div class="range">
      <button class="range_btn left price" style="left: 0%;"></button>
      <button class="range_btn right price" style="left: 100%;"></button>
    </div>
  </div>
</div>
<div class="slider_stock">
  <h3 class="title">Stock</h3>
  <div class="out_data">
    <div class="from_data">
      <input type="number" value="0">
    </div>
    <div class="to_data">
      <input type="number" value="100">
    </div>
  </div>
  <div class="multi_range">
    <div class="range">
      <button class="range_btn left stock" style="left: 0%;"></button>
      <button class="range_btn right stock" style="left: 100%;"></button>
    </div>
  </div>
</div>
  `;
  return filters;
}
