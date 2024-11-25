import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the promotional offer
 * @param {Element} block 
 */
export default async function decorate(block) {
    block.innerHTML = ''; // clear any existing content
    const wrapper = document.createElement('div');
    wrapper.classList.add('promotional-offer');
    block.append(wrapper);

    const parentDiv = document.querySelector('.vehicles-wrapper');

    // Clone the element to avoid circular reference
    if (parentDiv) {
        const clonedDiv = parentDiv.cloneNode(true);
        wrapper.append(clonedDiv);
    } else {
        console.warn('No element with the class "vehicles-wrapper" found.');
    }
  
    
}