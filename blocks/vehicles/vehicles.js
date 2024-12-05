import { elementHasClass } from '../../scripts/dom.js';

const { gsap, ScrollTrigger } = window;

let cloneBlock = null;

/**
 * Loads and decorates the promotional offer.
 * @param {Element} block - The block element to decorate.
 */
function vehicles() {
  const parentDiv = document.querySelector('.vehicles');

  // Add classes to child elements of the vehicles container
  if (parentDiv) {
    Array.from(parentDiv.children).forEach((child, index) => {
      const classes = ['offer-section', `slide-${index}`];
      if (index === 0) {
        classes.push('offer-text');
      } else {
        classes.push('slide');
      }
      child.classList.add(...classes);
    });
  }

  const offerSections = Array.from(
    document.querySelectorAll('.offer-section'),
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

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  const containers = gsap.utils.toArray('.vehicles');
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
