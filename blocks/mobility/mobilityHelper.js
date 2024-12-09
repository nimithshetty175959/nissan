import { addClassesToElements, createElement } from '../../scripts/dom.js';

const { gsap, ScrollTrigger } = window;

const getMobilityComponent = (block) => {
  const blockCopy = block.cloneNode(true);
  const [mobilityText, mobilityImage, mobilityLink, mbText] = blockCopy.children;
  const mobilityContainer = createElement('div', ['mobility-contianer']);
  const mobilityOverlay = createElement('div', ['mobility-overlay']);

  // Add classes to each element
  addClassesToElements([mobilityText], ['mobility-text']);
  addClassesToElements([mobilityImage], ['mobility-image']);
  addClassesToElements([mobilityLink], ['mobility-link']);
  addClassesToElements([mbText], ['mb-text']);
  mobilityImage.append(mobilityOverlay);

  // Append mobilityText to the mobilityContainer
  mobilityContainer.append(mobilityText);

  // Append mobilityImage to the mobilityContainer
  mobilityContainer.append(mobilityImage);

  // Create a new container for mobilityLink and mbText
  const mobilityLinkContainer = createElement('div', [
    'mobility-link-container',
  ]);

  // Append mobilityLink and mbText to the new container
  mobilityLinkContainer.append(mobilityLink);
  mobilityLinkContainer.append(mbText);

  // Find the child div inside mobilityImage container that contains the <picture> tag
  const childDiv = mobilityImage.querySelector('div');

  // Append the mobilityLinkContainer inside the child div of mobilityImage
  if (childDiv) {
    childDiv.appendChild(mobilityLinkContainer);
  }

  // Define the SVG icon as a string
  const svgIcon = ` <svg width="50" height="16" viewBox="0 0 50 16">
                    <g>
                        <path d="M0 8H48M48 8L41 1M48 8L41 15" stroke="rgba(255, 255, 255, 1)" stroke-width="2"></path>
                    </g>
                </svg>`;

  // Find the <a> tag within mbText
  const linkElement = mbText.querySelector('a');

  // Check if the <a> tag exists and replace its content with the SVG
  if (linkElement) {
    linkElement.innerHTML = svgIcon; // Insert the SVG inside the <a> tag
  }

  // Using GSAP to pin the .mobility-text and apply the blur effect on scroll
  gsap.registerPlugin(ScrollTrigger);

  // Pin .mobility-text and add the blur effect while scrolling
  gsap.to(mobilityText, {
    scrollTrigger: {
      trigger: mobilityText,
      start: 'top top', // When the top of the element hits the top of the viewport
      end: 'bottom top', // When the bottom of the element reaches the top of the viewport
      pin: true, // Pin the element during scroll
      scrub: true, // Smoothly animate during scroll
    },
    filter: 'blur(5px)',
    opacity: 0,
    // Apply blur effect
    ease: 'none', // Keep the animation at a constant rate
  });

  // Move the mobilityImage over the mobilityText while scrolling
  gsap.to(mobilityImage, {
    scrollTrigger: {
      trigger: mobilityText,
      start: 'top top', // Start when the top of .mobility-text hits the top of the viewport
      end: 'bottom top', // End when the bottom of .mobility-text reaches the top of the viewport
      scrub: true, // Smoothly animate during scroll
    },
    y: '-50%', // Move the image upwards (over the text)
    ease: 'none', // Keep the animation at a constant rate
  });

  // Return the final mobilityContainer
  return mobilityContainer;
};

// eslint-disable-next-line import/prefer-default-export
export { getMobilityComponent };
