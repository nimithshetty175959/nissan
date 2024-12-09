import { elementHasClass } from '../../scripts/dom.js';
import { getcardsComponent } from './nissancardsHelper.js';

let cloneBlock = null;

const { gsap, ScrollTrigger } = window;

function nissanCard() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Helper function to add animation to elements
  const addScrollAnimation = (
    element,
    {
      start, end, pin, pinSpacing, scrub, blur, opacity,
    },
  ) => {
    if (element) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
            pin,
            pinSpacing,
          },
        })
        .to(element, {
          filter: blur,
          opacity,
          ease: 'power1.inOut',
        });
    } else {
      console.error('Element not found for animation.');
    }
  };

  // Apply blur and opacity animation to default content wrapper
  const defaultContentWrapper = document.querySelector('.nissan-heading-text');

  addScrollAnimation(defaultContentWrapper, {
    start: 'top top',
    end: 'bottom+=100 top',
    scrub: true,
    pin: true,
    pinSpacing: false,
    blur: 'blur(20px)',
    opacity: 0,
  });
}

export default async function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = block.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const nissancardsContainer = getcardsComponent(block);
    block.innerHTML = '';
    block.append(nissancardsContainer);
    nissanCard();
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
