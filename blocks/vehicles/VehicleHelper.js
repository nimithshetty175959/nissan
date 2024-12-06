import { addClassesToElements, createElement } from '../../scripts/dom.js';

const { gsap, ScrollTrigger } = window;

const getVehicleComponent = (block) => {
    const vehicleContainer = createElement('div', ['vehicle-container']);
    Array.from(block.children).forEach((child, index) => {
        const classes = ['offer-section', `slide-${index}`];
        if (index === 0) {
          classes.push('offer-text');
        } else {
          classes.push('slide');
        }
        child.classList.add(...classes);
        vehicleContainer.appendChild(child);
    });

    const offerSections = Array.from(
        vehicleContainer.querySelectorAll('.offer-section'),
      ).slice(1);

      offerSections.forEach((section) => {
        const [pictureContainer, richTextDiv, buttonContainerDiv] = section.children;
        if (!pictureContainer) {
          console.error('No picture container found for offer section.');
          return;
        }
    
        if (richTextDiv && buttonContainerDiv) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('offer-details');
          wrapper.append(richTextDiv, buttonContainerDiv);
          pictureContainer.parentElement.appendChild(wrapper);
        } else {
          console.warn('Missing richtext or button-container div in section.');
        }
      });

     

    return vehicleContainer;
  };
  
  
  export { getVehicleComponent };