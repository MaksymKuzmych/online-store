export function renderFilters(): HTMLElement {
  const filters = document.createElement('div');

  filters.classList.add('filters');
  filters.innerHTML = `
  <div class="search_bar">
  <input type="search" placeholder="Search product">
  <p>Found: 0</p>
</div>
<div class="sort_bar">
  <select name="" id="">
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
  <button>Reset Filters</button>
  <button>Copy Link</button>
</div>
<div class="filter_category">
  <h3>Options</h3>
  <div class="filter_list">
    <div class="checkbox">
      <input type="checkbox" name="pointer" id="pointer">
      <label for="pointer">ClockFace: Pointer</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="digital" id="digital">
      <label for="digital">ClockFace: Digital</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="strap" id="strap">
      <label for="strap">Mount: Strap</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="bracelet" id="bracelet">
      <label for="bracelet">Mount: Bracelet</label>
      <span>(0)</span>
    </div>
  </div>
</div>
<div class="filter_brand">
  <h3>Brand</h3>
  <div class="filter_list">
    <div class="checkbox">
      <input type="checkbox" name="Casio" id="Casio">
      <label for="Casio">Casio</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="Citizen" id="Citizen">
      <label for="Citizen">Citizen</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="North Edge" id="North Edge">
      <label for="North Edge">North Edge</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="Seiko" id="Seiko">
      <label for="Seiko">Seiko</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="TAG HEUER" id="TAG HEUER">
      <label for="TAG HEUER">TAG HEUER</label>
      <span>(0)</span>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="Fossil" id="Fossil">
      <label for="Fossil">Fossil</label>
      <span>(0)</span>
    </div>
  </div>
</div>
<div class="slider_price">
  <h3>Price</h3>
  <div class="out_data">
    <div class="from_data">$100</div>
    <div class="to_data">$1000</div>
  </div>
  <div class="multi_range">
    <input type="range" name="" id="">
    <input type="range" name="" id="">
  </div>
</div>
<div class="slider_stock">
  <h3>Stock</h3>
  <div class="out_data">
    <div class="from_data">0</div>
    <div class="to_data">100</div>
  </div>
  <div class="multi_range">
    <input type="range" name="" id="">
    <input type="range" name="" id="">
  </div>
</div>
  `;
  return filters;
}
