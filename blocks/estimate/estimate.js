import { elementHasClass } from '../../scripts/dom.js';
import { getEstimateComponent } from './estimateHelper.js';

let cloneBlock = null;

export default async function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = block.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const estimateContainer = getEstimateComponent(block);
    block.innerHTML = '';
    block.append(estimateContainer);
  } else {
    block.innerHTML = '';
    const banners = cloneBlock.children;
    for (let index = 0; index < banners.length; index += 1) {
      const banner = banners[index];
      setTimeout(() => {
        block.append(banner);
      }, index);
    }
  }
}
