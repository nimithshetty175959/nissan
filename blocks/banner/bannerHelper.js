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

const imageAnimate = (block) => {
  const imageMain = block.querySelector(
    '.banner-container.active .image-block img',
  );
  const imageElements = block.querySelectorAll(
    '.banner-container .image-block img',
  );
  const heads = block.querySelectorAll('.banner .data-wrapper .data-block h3');
  const imageSrc = imageMain.src;
  const animBlocks = block.querySelectorAll('.banner-img-anim-block');
  for (let index = 0; index < animBlocks.length; index += 1) {
    const element = animBlocks[index];
    const imageHolder = element.querySelector('.image-holder');
    imageHolder.style.backgroundImage = `url(${imageSrc})`;
    imageHolder.style.width = `${imageMain.width}px`;
    element.style.width = '100%';
    removeClassesFromElements([element], ['animate']);
    setTimeout(() => {
      addClassesToElements([element], ['animate']);
      element.style.width = '0';
    }, 0);
  }
  for (let index = 0; index < imageElements.length; index += 1) {
    const image = imageElements[index];
    addClassesToElements([image], ['animate']);
    setTimeout(() => {
      removeClassesFromElements([image], ['animate']);
    }, 700);
  }
  for (let index = 0; index < heads.length; index += 1) {
    const head = heads[index];
    setTimeout(() => {
      head.style.right = '1em';
      head.style.opacity = '0';
      setTimeout(() => {
        head.style.right = '0';
        head.style.opacity = '1';
      }, 500);
    }, 0);
  }
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
  const bannerOverlayBlock = createElement('div', ['banner-overlay-block']);
  const bannerDataBlock = createElement('div', ['banner-data-block']);
  const bannerImageAnimation = createElement('div', ['banner-img-anim-block']);
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

  const image = createElement('div', ['image-holder']);

  image.style.backgroundImage = '';
  image.style.width = `${window.screen.width}px`;
  bannerImageAnimation.append(image);
  imagesBlock.append(imageElements[0]);
  bannerDataBlock.append(imagesBlock);

  bannerDataBlock.append(bannerImageAnimation);

  dataWrapper.append(dataBlock);
  dataWrapper.append(buttonBlock);

  bannerDataBlock.append(dataWrapper);
  bannerContainer.append(bannerOverlayBlock);
  bannerContainer.append(bannerDataBlock);

  return bannerContainer;
};

const getCarouselNav = (block) => {
  const bannerNavConrainer = createElement('div', ['banner-nav-container']);
  const navTabs = createElement('div', ['nav-tabs']);
  const navSlideConatiner = createElement('div', ['nav-silde-container']);
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
  navImgBlocks.style.width = `${153 * thumnailImages.length}px`;
  navImgBlocks.style.left = 0;
  thumnailImages.forEach((image, i) => {
    const imageItem = createElement('div', ['nav-image-block']);
    imageItem.setAttribute('data-block', `nav-image-block-${i}`);
    imageItem.setAttribute('data-count', i);
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
        const parentBlock = bannerNavConrainer.parentElement;
        imageAnimate(parentBlock);
        removeClassesFromElements(navElements, ['active']);
        addClassesToElements([imageItem], ['active']);

        const bannerBlocks = parentBlock.querySelectorAll(
          '.banner .banner-container',
        );
        const bannerBlock = parentBlock.querySelector(
          `.banner .banner-container.${dataBlock}`,
        );

        removeClassesFromElements(bannerBlocks, ['active']);
        addClassesToElements([bannerBlock], ['active']);
        setTimeout(() => {
          const dataCount = imageItem.getAttribute('data-count');
          navImgBlocks.style.left = `-${153 * Number(dataCount)}px`;
        }, 10);
      }
    });
    imageItem.append(image);
    navImgBlocks.append(imageItem);
  });
  bannerNavConrainer.append(navTabs);
  navSlideConatiner.append(navImgBlocks);
  bannerNavConrainer.append(navSlideConatiner);
  return bannerNavConrainer;
};

export {
  createBanerItem,
  createElement,
  getCarouselNav,
  elementHasClass,
  addClassesToElements,
};
