import { elementHasClass } from '../../scripts/dom.js';
import { getNissanCardComponent } from './nissancardHelper.js';

let cloneBlock = null;

export default async function decorate(block) {
    const htmlElem = window.document.getElementsByTagName('html');
    if (cloneBlock === null) {
      cloneBlock = block.cloneNode(true);
    }
  
    if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
      const cardsBlock = await getNissanCardComponent(block);
      block.innerHTML = '';
      block.append(cardsBlock);
    } else {
      
    }
  }
  