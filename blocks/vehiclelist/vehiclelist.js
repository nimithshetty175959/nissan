import { elementHasClass } from '../../scripts/dom.js';
import { getVehicleListComponent } from './vehilelistHelper.js';

let cloneBlock = null;

export default async function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = block.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const vehicleBlock = await getVehicleListComponent(block);
    block.innerHTML = '';
    block.append(vehicleBlock);
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
