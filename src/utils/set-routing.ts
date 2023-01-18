import { getLocalData } from './get-local-data';

export function setRouting(view?: boolean, target?: HTMLElement): void {
  const oldHash = location.hash;
  const { localFilters } = getLocalData();
  const hash: string[] = [];
  const options: string[] = [];
  const brands: string[] = [];

  if (localFilters.search) {
    hash.push(`search=${localFilters.search}`);
  }

  if (localFilters.sort !== 'choose') {
    hash.push(`sort=${localFilters.sort}`);
  }

  if (view || oldHash.includes('view=')) {
    hash.push(`view=${localFilters.view}`);
  }

  if (localFilters.optionsPointer) {
    options.push('pointer');
  }
  if (localFilters.optionsDigital) {
    options.push('digital');
  }
  if (localFilters.optionsStrap) {
    options.push('strap');
  }
  if (localFilters.optionsBracelet) {
    options.push('bracelet');
  }
  if (options.length) {
    hash.push(`options=${options.join(',')}`);
  }

  if (localFilters.brandCasio) {
    brands.push('casio');
  }
  if (localFilters.brandCitizen) {
    brands.push('citizen');
  }
  if (localFilters.brandNorthEdge) {
    brands.push('north-edge');
  }
  if (localFilters.brandSeiko) {
    brands.push('seiko');
  }
  if (localFilters.brandTagHeuer) {
    brands.push('tag-heuer');
  }
  if (localFilters.brandFossil) {
    brands.push('fossil');
  }
  if (brands.length) {
    hash.push(`brands=${brands.join(',')}`);
  }

  if (target?.classList.contains('price')) {
    hash.push(
      `price=${localFilters.priceMin},${localFilters.priceFrom},${localFilters.priceTo},${localFilters.priceMax}`,
    );
    if (localFilters.stockFrom !== localFilters.stockMin || localFilters.stockTo !== localFilters.stockMax) {
      hash.push(
        `stock=${localFilters.stockMin},${localFilters.stockFrom},${localFilters.stockTo},${localFilters.stockMax}`,
      );
    }
  }
  if (target?.classList.contains('stock')) {
    if (localFilters.priceFrom !== localFilters.priceMin || localFilters.priceTo !== localFilters.priceMax) {
      hash.push(
        `price=${localFilters.priceMin},${localFilters.priceFrom},${localFilters.priceTo},${localFilters.priceMax}`,
      );
    }
    hash.push(
      `stock=${localFilters.stockMin},${localFilters.stockFrom},${localFilters.stockTo},${localFilters.stockMax}`,
    );
  }

  location.hash = `?${hash.join('&')}`;
}
