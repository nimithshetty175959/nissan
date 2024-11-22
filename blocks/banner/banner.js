import {
  addClassesToElements,
  createBanerItem,
  elementHasClass,
  getCarouselNav,
} from './bannerHelper.js';

let cloneBlock = null;

export default function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = block.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const copyBlock = block.cloneNode(true);
    const copyBlockNav = block.cloneNode(true);
    const elements = copyBlock.children;
    addClassesToElements([block], ['banner-block']);
    block.innerHTML = '';
    for (let index = 0; index < elements.length; index += 1) {
      const element = elements[index];
      const bannerItem = createBanerItem(element, index);
      block.append(bannerItem);
    }
    const carNavigation = getCarouselNav(copyBlockNav);
    block.append(carNavigation);
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
