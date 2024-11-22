/**
 *
 * @param {*} type
 * @param {*} classes
 * @returns
 */
const createElement = (type = 'div', classes = []) => {
  const element = document.createElement(type);
  classes.forEach((c) => {
    element.classList.add(c);
  });
  return element;
};

const elementHasClass = (elem, classname) => elem.classList.contains(classname);

const removeClassesFromElements = (elements, classes) => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    classes.forEach((cl) => {
      element.classList.remove(cl);
    });
  }
};

const addClassesToElements = (elements, classes) => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    classes.forEach((cl) => {
      element.classList.add(cl);
    });
  }
};

const getThumbnailImages = (block) => {
  const thumbnailImages = [];
  const mainElements = block.children;
  for (let i = 0; i < mainElements.length; i += 1) {
    const element = mainElements[i];
    const subElements = element.children;
    const images = [];
    for (let j = 0; j < subElements.length; j += 1) {
      const subElement = subElements[j];
      const tagName = subElement.children[0].tagName.toLowerCase();
      if (tagName === 'picture') {
        images.push(subElement);
      }
    }
    thumbnailImages.push(images[1]);
  }
  return thumbnailImages;
};

/**
 *
 * @param {*} element
 * @returns
 */
const createBanerItem = (element, index) => {
  const dataItems = element.children;
  const bannerContainer = createElement('div', [
    'banner-container',
    `nav-image-block-${index}`,
  ]);
  if (index === 0) {
    addClassesToElements([bannerContainer], ['active']);
  }
  const imagesBlock = createElement('div', ['image-block']);
  const dataWrapper = createElement('div', ['data-wrapper']);
  const dataBlock = createElement('div', ['data-block']);
  const buttonBlock = createElement('div', ['button-block']);
  const imageElements = [];

  for (let i = 0; i < dataItems.length; i += 1) {
    const elementCopy = dataItems[i].cloneNode(true);
    const tagName = elementCopy.children[0].tagName.toLowerCase();
    if (tagName === 'picture') {
      elementCopy.classList.add('image-item');
      imageElements.push(elementCopy);
    } else if (elementHasClass(elementCopy.children[0], 'button-container')) {
      elementCopy.classList.add('button-item');
      buttonBlock.append(elementCopy);
    } else {
      dataBlock.append(elementCopy);
    }
  }
  imagesBlock.append(imageElements[0]);
  bannerContainer.append(imagesBlock);
  dataWrapper.append(dataBlock);
  dataWrapper.append(buttonBlock);
  bannerContainer.append(dataWrapper);
  return bannerContainer;
};

const getCarouselNav = (block) => {
  const bannerNavConrainer = createElement('div', ['banner-nav-container']);
  const navTabs = createElement('div', ['nav-tabs']);
  const navImgBlocks = createElement('div', ['nav-image-blocks']);
  const activeClass = 'active';
  ['HYBRID', '100% ELECTRIC', 'ESSENCE'].forEach((value, i) => {
    const navTab = createElement('div', ['nav-tab']);
    navTab.innerHTML = `<span>${value}</span>`;
    if (i === 0) {
      navTab.classList.add(activeClass);
    }
    navTabs.append(navTab);
  });
  const thumnailImages = getThumbnailImages(block);
  thumnailImages.forEach((image, i) => {
    const imageItem = createElement('div', ['nav-image-block']);
    imageItem.setAttribute('data-block', `nav-image-block-${i}`);
    if (i === 0) {
      imageItem.classList.add(activeClass);
    }
    image.classList.add('image-item');
    imageItem.addEventListener('click', () => {
      if (!elementHasClass(imageItem, 'active')) {
        const navElements = bannerNavConrainer.querySelectorAll(
          '.nav-image-blocks .nav-image-block',
        );
        const dataBlock = imageItem.getAttribute('data-block');
        removeClassesFromElements(navElements, ['active']);
        addClassesToElements([imageItem], ['active']);

        const parentBlock = bannerNavConrainer.parentElement;

        const bannerBlocks = parentBlock.querySelectorAll(
          '.banner .banner-container',
        );
        const bannerBlock = parentBlock.querySelector(
          `.banner .banner-container.${dataBlock}`,
        );

        removeClassesFromElements(bannerBlocks, ['active']);
        addClassesToElements([bannerBlock], ['active']);
      }
    });
    imageItem.append(image);
    navImgBlocks.append(imageItem);
  });
  bannerNavConrainer.append(navTabs);
  bannerNavConrainer.append(navImgBlocks);
  return bannerNavConrainer;
};

export { createBanerItem, createElement, getCarouselNav };
