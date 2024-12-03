import { addClassesToElements, createElement } from '../../scripts/dom.js';

const { gsap } = window;

const animate = (container, overlay, heading) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: overlay,
      endTrigger: container,
      start: 'top center-=200',
      end: 'bottom center',
    },
  });

  tl.fromTo(
    overlay,
    { backdropFilter: 'blur(0px)', webkitBackdropFilter: 'blur(0px)' },
    { backdropFilter: 'blur(15px)', webkitBackdropFilter: 'blur(15px)' },
  );

  const t2 = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: container,
      endTrigger: container,
      start: 'top bottom-=200',
      end: 'bottom center+=300',
    },
  });

  t2.fromTo(
    container,
    { clipPath: 'inset(0 60px)' },
    { clipPath: 'inset(0 0px)' },
  );

  const t3 = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: heading,
      endTrigger: container,
      start: 'top bottom',
      end: 'bottom center+=300',
    },
  });

  t3.fromTo(heading, { top: '5em' }, { top: '1.8em' });
};

const getEstimateComponent = (block) => {
  const blockCopy = block.cloneNode(true);
  const [esHead, esCar, esBgi, esText, esBtn] = blockCopy.children;
  const estimateContainer = createElement('div', ['estimate-container']);
  const estimateBackground = createElement('div', ['estimate-bg']);
  const estimateOverlay = createElement('div', ['estimate-overlay']);

  const bgImage = esBgi.querySelector('img');
  const imageSrc = bgImage.getAttribute('src');
  estimateBackground.style.backgroundImage = `url(${imageSrc})`;
  addClassesToElements([esHead], ['estimate-header']);
  addClassesToElements([esCar], ['estimate-car']);
  addClassesToElements([esText], ['estimate-text']);
  addClassesToElements([esBtn], ['estimate-btn']);

  estimateBackground.append(estimateOverlay);
  estimateBackground.append(esHead);
  estimateBackground.append(esCar);
  estimateBackground.append(esBtn);
  estimateBackground.append(esText);

  estimateContainer.append(estimateBackground);
  animate(estimateContainer, estimateOverlay, esHead);
  return estimateContainer;
};

export { getEstimateComponent, animate };
