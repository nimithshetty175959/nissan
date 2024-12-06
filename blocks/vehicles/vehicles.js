import { elementHasClass } from '../../scripts/dom.js';
import { addClassesToElements, createElement } from '../../scripts/dom.js';
import { getVehicleComponent } from './VehicleHelper.js';

const { gsap, ScrollTrigger } = window;

let cloneBlock = null;

/**
 * Loads and decorates the promotional offer.
 * @param {Element} block - The block element to decorate.
 */
function vehicles() {

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  const containers = gsap.utils.toArray('.vehicle-container');
  containers.forEach((cont) => {
    const { innerHeight } = window;
    const slides = gsap.utils.toArray('.offer-section', cont);
    const totalMargin = innerHeight * (slides.length - 2);
    const additionalSpace = innerHeight * 2;

    // Remove or override max-height to prevent GSAP from limiting container height
    gsap.set(cont, { maxHeight: 'none' });

    // Adjust container margin for scroll space
    gsap.set(cont, { marginBottom: totalMargin + additionalSpace });

    // Pin the first slide
    ScrollTrigger.create({
      trigger: cont,
      start: 'top top',
      end: `+=${totalMargin + additionalSpace}`,
      pin: true,
      pinSpacing: false,
    });

    // Horizontal scrolling for other slides
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: cont,
        start: 'top top',
        end: `+=${totalMargin + additionalSpace}`,
        scrub: 1, // Smooth out the animation
      },
    });

    // Move remaining slides horizontally with smooth easing
    timeline.to(slides.slice(1), {
      xPercent: -(125 * (slides.length - 1)), // Adjusted to match natural flow
      duration: 3,
      ease: 'power5.inOut', // Smooth easing curve
    });

    // Blur effect and opacity transition for the first slide
    gsap.to(slides[0], {
      filter: 'blur(20px)', // Reduced blur intensity for smoothness
      opacity: 0,
      ease: 'power5.inOut', // Smooth entry/exit for opacity
      scrollTrigger: {
        trigger: cont,
        start: 'top top',
        end: `+=${totalMargin + additionalSpace}`,
        scrub: 1,
      },
    });
  });
}

export default async function decorate(block) {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = block.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const vehicleContainer = getVehicleComponent(block);
    block.innerHTML = '';
    block.append(vehicleContainer);
    vehicles();
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
