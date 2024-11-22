import {
  addClassesToElements,
  createBanerItem,
  elementHasClass,
  getCarouselNav,
} from './bannerHelper.js';

export default function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  const cloneBlock = block.cloneNode(true);
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
    block.append(cloneBlock.children[0]);
  }
}
