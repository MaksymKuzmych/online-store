import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';

export function fillQuantity(filtersEl: HTMLDivElement, filteredArray: Array<IWatch>): void {
  const foundItems = filtersEl.querySelector('.search_bar__result') as HTMLSpanElement;

  const pointerSpan = filtersEl.querySelector('.clockface-pointer__result') as HTMLSpanElement;
  const digitalSpan = filtersEl.querySelector('.clockface-digital__result') as HTMLSpanElement;

  const strapSpan = filtersEl.querySelector('.mount-strap__result') as HTMLSpanElement;
  const braceletSpan = filtersEl.querySelector('.mount-bracelet__result') as HTMLSpanElement;

  const casioSpan = filtersEl.querySelector('.casio') as HTMLSpanElement;
  const citizenSpan = filtersEl.querySelector('.citizen') as HTMLSpanElement;
  const northEdgeSpan = filtersEl.querySelector('.north-edge') as HTMLSpanElement;
  const seikoSpan = filtersEl.querySelector('.seiko') as HTMLSpanElement;
  const tagHeuerSpan = filtersEl.querySelector('.tag-heuer') as HTMLSpanElement;
  const fossilSpan = filtersEl.querySelector('.fossil') as HTMLSpanElement;

  foundItems.innerText = String(filteredArray.length);

  pointerSpan.innerText = writeclockFaceQuantity(filteredArray, 'pointer');
  digitalSpan.innerText = writeclockFaceQuantity(filteredArray, 'digital');

  strapSpan.innerText = writeMountQuantity(filteredArray, 'strap');
  braceletSpan.innerText = writeMountQuantity(filteredArray, 'bracelet');

  casioSpan.innerText = writeBrandQuantity(filteredArray, 'Casio');
  citizenSpan.innerText = writeBrandQuantity(filteredArray, 'Citizen');
  northEdgeSpan.innerText = writeBrandQuantity(filteredArray, 'North Edge');
  seikoSpan.innerText = writeBrandQuantity(filteredArray, 'Seiko');
  tagHeuerSpan.innerText = writeBrandQuantity(filteredArray, 'TAG HEUER');
  fossilSpan.innerText = writeBrandQuantity(filteredArray, 'Fossil');
}

function writeclockFaceQuantity(filteredArray: Array<IWatch>, option: string) {
  return `${filteredArray.filter((watch) => watch.clockFace === option).length}/${
    watchData.filter((watch) => watch.clockFace === option).length
  }`;
}

function writeMountQuantity(filteredArray: Array<IWatch>, option: string) {
  return `${filteredArray.filter((watch) => watch.mount === option).length}/${
    watchData.filter((watch) => watch.mount === option).length
  }`;
}

function writeBrandQuantity(filteredArray: Array<IWatch>, option: string) {
  return `${filteredArray.filter((watch) => watch.brand === option).length}/${
    watchData.filter((watch) => watch.brand === option).length
  }`;
}
