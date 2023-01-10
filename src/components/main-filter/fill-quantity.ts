import { IWatch } from '../../interfaces';
import { watchData } from '../../watch-data/watch-data';

export function fillQuantity(filtersEl: HTMLElement, filteredArray: Array<IWatch>): void {
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

  pointerSpan.innerText = `${filteredArray.filter((el) => el.clockFace === 'pointer').length}/${
    watchData.filter((el) => el.clockFace === 'pointer').length
  }`;
  digitalSpan.innerText = `${filteredArray.filter((el) => el.clockFace === 'digital').length}/${
    watchData.filter((el) => el.clockFace === 'digital').length
  }`;

  strapSpan.innerText = `${filteredArray.filter((el) => el.mount === 'strap').length}/${
    watchData.filter((el) => el.mount === 'strap').length
  }`;
  braceletSpan.innerText = `${filteredArray.filter((el) => el.mount === 'bracelet').length}/${
    watchData.filter((el) => el.mount === 'bracelet').length
  }`;

  casioSpan.innerText = `${filteredArray.filter((el) => el.brand === 'Casio').length}/${
    watchData.filter((el) => el.brand === 'Casio').length
  }`;
  citizenSpan.innerText = `${filteredArray.filter((el) => el.brand === 'Citizen').length}/${
    watchData.filter((el) => el.brand === 'Citizen').length
  }`;
  northEdgeSpan.innerText = `${filteredArray.filter((el) => el.brand === 'North Edge').length}/${
    watchData.filter((el) => el.brand === 'North Edge').length
  }`;
  seikoSpan.innerText = `${filteredArray.filter((el) => el.brand === 'Seiko').length}/${
    watchData.filter((el) => el.brand === 'Seiko').length
  }`;
  tagHeuerSpan.innerText = `${filteredArray.filter((el) => el.brand === 'TAG HEUER').length}/${
    watchData.filter((el) => el.brand === 'TAG HEUER').length
  }`;
  fossilSpan.innerText = `${filteredArray.filter((el) => el.brand === 'Fossil').length}/${
    watchData.filter((el) => el.brand === 'Fossil').length
  }`;
}
