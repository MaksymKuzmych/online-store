import { getLocalData } from './get-local-data';
import { FlatArray } from '../interfaces';

export function setRouting(view?: boolean, target?: HTMLElement): void {
  const oldHash = location.hash;
  const local = getLocalData();
  const hash: FlatArray<string> = [];
  const options: FlatArray<string> = [];
  const brands: FlatArray<string> = [];

  if (local.localFilters.search) {
    hash.push(`search=${local.localFilters.search}`);
  }

  if (local.localFilters.sort !== 'choose') {
    hash.push(`sort=${local.localFilters.sort}`);
  }

  if (view || oldHash.includes('view=')) {
    hash.push(`view=${local.localFilters.view}`);
  }

  if (local.localFilters.optionsPointer) {
    options.push('pointer');
  }
  if (local.localFilters.optionsDigital) {
    options.push('digital');
  }
  if (local.localFilters.optionsStrap) {
    options.push('strap');
  }
  if (local.localFilters.optionsBracelet) {
    options.push('bracelet');
  }
  if (options.length) {
    hash.push(`options=${options.join(',')}`);
  }

  if (local.localFilters.brandCasio) {
    brands.push('casio');
  }
  if (local.localFilters.brandCitizen) {
    brands.push('citizen');
  }
  if (local.localFilters.brandNorthEdge) {
    brands.push('north-edge');
  }
  if (local.localFilters.brandSeiko) {
    brands.push('seiko');
  }
  if (local.localFilters.brandTagHeuer) {
    brands.push('tag-heuer');
  }
  if (local.localFilters.brandFossil) {
    brands.push('fossil');
  }
  if (brands.length) {
    hash.push(`brands=${brands.join(',')}`);
  }

  if (target?.classList.contains('price')) {
    hash.push(
      `price=${local.localFilters.priceMin},${local.localFilters.priceFrom},${local.localFilters.priceTo},${local.localFilters.priceMax}`,
    );
    if (
      local.localFilters.stockFrom !== local.localFilters.stockMin ||
      local.localFilters.stockTo !== local.localFilters.stockMax
    ) {
      hash.push(
        `stock=${local.localFilters.stockMin},${local.localFilters.stockFrom},${local.localFilters.stockTo},${local.localFilters.stockMax}`,
      );
    }
  }
  if (target?.classList.contains('stock')) {
    if (
      local.localFilters.priceFrom !== local.localFilters.priceMin ||
      local.localFilters.priceTo !== local.localFilters.priceMax
    ) {
      hash.push(
        `price=${local.localFilters.priceMin},${local.localFilters.priceFrom},${local.localFilters.priceTo},${local.localFilters.priceMax}`,
      );
    }
    hash.push(
      `stock=${local.localFilters.stockMin},${local.localFilters.stockFrom},${local.localFilters.stockTo},${local.localFilters.stockMax}`,
    );
  }

  location.hash = hash.join('&');
}
