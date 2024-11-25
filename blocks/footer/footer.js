import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.classList.add('footer-section-one');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const wrapper = document.createElement('div');
  wrapper.classList.add('section-one-wrapper');
  wrapper.append(footer);

  block.append(wrapper);

  const parentDiv = document.querySelector('.footer-section-one');
  let childDivs;
  if (parentDiv) {
    childDivs = parentDiv.querySelectorAll('.section');
  }
  if (childDivs.length >= 2) {
    childDivs[childDivs.length - 3].classList.add('social-media-links');
    childDivs[childDivs.length - 2].classList.add('section-two');
    childDivs[childDivs.length - 1].classList.add('section-two', 'footer-legal');
  }

  const secondfooter = parentDiv.querySelectorAll('.section-two');
  const newContainer = document.createElement('div');
  newContainer.classList.add('footer-section-two');
  secondfooter.forEach((element) => {
    newContainer.append(element);
  });
  document.body.appendChild(newContainer);
  const targetDiv = document.querySelector('.footer');
  targetDiv.appendChild(newContainer);

  // Social media links
  const links = document.querySelectorAll('.social-media-links p');
  const linksWrapper = document.createElement('div');
  links.forEach((element) => {
    linksWrapper.append(element);
  });
  linksWrapper.classList.add('social-media-wrapper');
  const socialMediaContainer = document.querySelector('.social-media-links div');
  socialMediaContainer.classList.add('nissan-on-social-media');
  const targetElement = document.querySelector('.nissan-on-social-media');
  targetElement.insertAdjacentElement('afterend', linksWrapper);

  gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".section");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".footer-section-one",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".footer-section-one").offsetWidth
  }
});

}
