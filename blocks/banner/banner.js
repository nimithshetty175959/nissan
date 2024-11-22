import { createBanerItem, getCarouselNav } from './bannerHelper.js';

export default function decorate(block) {
  const copyBlock = block.cloneNode(true);
  const copyBlockNav = block.cloneNode(true);
  const elements = copyBlock.children;
  block.innerHTML = '';
  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];
    const bannerItem = createBanerItem(element, index);
    block.append(bannerItem);
  }
  const carNav = getCarouselNav(copyBlockNav);
  block.append(carNav);
}
