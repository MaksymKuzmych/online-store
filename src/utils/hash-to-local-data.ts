import { getLocalData } from './get-local-data';
import { setLocalData } from './set-local-data';

export function hashToLocalData() {
  const local = getLocalData();
  const hash = location.hash
    .slice(1)
    .split('&')
    .map((key) => key.split('='));
  const search = hash.find((filter) => filter[0] === 'search');
  const sort = hash.find((filter) => filter[0] === 'sort');
  const view = hash.find((filter) => filter[0] === 'view');
  const options = hash.find((filter) => filter[0] === 'options');
  const brands = hash.find((filter) => filter[0] === 'brands');
  const price = hash.find((filter) => filter[0] === 'price');
  const stock = hash.find((filter) => filter[0] === 'stock');

  if (search) {
    local.localFilters.search = search[1];
  }
  if (sort) {
    local.localFilters.sort = sort[1];
  }
  if (view) {
    local.localFilters.sort = view[1];
  }
  if (options) {
    const pointer = options[1].split(',').find((option) => option === 'pointer');
    const digital = options[1].split(',').find((option) => option === 'digital');
    const strap = options[1].split(',').find((option) => option === 'strap');
    const bracelet = options[1].split(',').find((option) => option === 'bracelet');

    if (pointer) {
      local.localFilters.optionsPointer = true;
    }
    if (digital) {
      local.localFilters.optionsDigital = true;
    }
    if (strap) {
      local.localFilters.optionsStrap = true;
    }
    if (bracelet) {
      local.localFilters.optionsBracelet = true;
    }
  }
  if (brands) {
    const casio = brands[1].split(',').find((option) => option === 'casio');
    const citizen = brands[1].split(',').find((option) => option === 'citizen');
    const northEdge = brands[1].split(',').find((option) => option === 'north-edge');
    const seiko = brands[1].split(',').find((option) => option === 'seiko');
    const tagHeuer = brands[1].split(',').find((option) => option === 'tag-heuer');
    const fossil = brands[1].split(',').find((option) => option === 'fossil');

    if (casio) {
      local.localFilters.brandCasio = true;
    }
    if (citizen) {
      local.localFilters.brandCitizen = true;
    }
    if (northEdge) {
      local.localFilters.brandNorthEdge = true;
    }
    if (seiko) {
      local.localFilters.brandSeiko = true;
    }
    if (tagHeuer) {
      local.localFilters.brandTagHeuer = true;
    }
    if (fossil) {
      local.localFilters.brandFossil = true;
    }
  }
  if (price) {
    local.localFilters.priceMin = +price[1].split(',')[0];
    local.localFilters.priceFrom = +price[1].split(',')[1];
    local.localFilters.priceTo = +price[1].split(',')[2];
    local.localFilters.priceMax = +price[1].split(',')[3];
  }
  if (stock) {
    local.localFilters.stockMin = +stock[1].split(',')[0];
    local.localFilters.stockFrom = +stock[1].split(',')[1];
    local.localFilters.stockTo = +stock[1].split(',')[2];
    local.localFilters.stockMax = +stock[1].split(',')[3];
  }

  setLocalData(local);
}
