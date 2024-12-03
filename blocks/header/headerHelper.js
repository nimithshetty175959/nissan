import {
  createElement,
  elementHasClass,
  addClassesToElements,
  removeClassesFromElements,
} from '../../scripts/dom.js';

let cloneBlock = null;

const createMenuIcon = () => {
  const menuIcon = createElement('div', ['h-menu-icon']);
  for (let index = 1; index <= 3; index += 1) {
    const menuBar = createElement('div', ['h-menu-bar', `menu-bar-${index}`]);
    menuIcon.append(menuBar);
  }
  return menuIcon;
};

const createSearchBar = () => {
  const menuSearchBar = createElement('div', ['menu-search-bar']);
  const inputElem = createElement('input', ['menu-search-input']);
  const inputSearch = createElement('img', ['menu-search-img']);
  inputElem.type = 'text';
  inputElem.setAttribute('placeholder', 'What are you looking for?');
  inputSearch.src = '/content/nissan-universal-editor.resource/icons/search-black.svg';
  menuSearchBar.append(inputSearch);
  menuSearchBar.append(inputElem);

  return menuSearchBar;
};

const groupElements = (elements) => {
  const groupedElements = [];
  let currentGroup = [];

  const getTagName = (elem) => elem.tagName.toLocaleLowerCase();

  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];
    if (getTagName(element) === 'h3') {
      if (currentGroup.length > 0) {
        groupedElements.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(element);
    } else if (getTagName(element) === 'ul') {
      if (
        currentGroup.length > 0
        && getTagName(currentGroup[0]) === 'h3'
        && currentGroup.length === 1
      ) {
        currentGroup.push(element);
      } else {
        if (currentGroup.length > 0) {
          groupedElements.push(currentGroup);
        }
        currentGroup = [element];
      }
    }
  }
  if (currentGroup.length > 0) {
    groupedElements.push(currentGroup);
  }
  return groupedElements;
};
const getMenuLinksContainer = (groupedElements) => {
  const menuListWrapper = createElement('div', ['menu-list-wrapper']);
  for (let index = 0; index < groupedElements.length; index += 1) {
    const elementArray = groupedElements[index];
    const menuListOne = createElement('div', ['menu-list-level-1']);
    const menuListTwo = createElement('div', ['menu-list-level-2']);
    if (elementArray.length === 1) {
      menuListOne.append(elementArray[0]);
    } else if (elementArray.length === 2) {
      menuListOne.append(elementArray[0]);
      menuListTwo.append(elementArray[1]);
      menuListOne.append(menuListTwo);
    }
    menuListWrapper.append(menuListOne);
  }
  return menuListWrapper;
};

const createMenuBar = (navContainer) => {
  const navMenuBar = createElement('div', ['header-nav-menu']);
  const menuIcon = createMenuIcon();
  const menuContainer = createElement('div', ['header-menu-container']);
  const menuOverlay = createElement('div', ['header-menu-overlay']);
  const menuList = createElement('div', ['header-menu-list']);
  const groupedElements = groupElements(navContainer.children);
  const menuLinks = getMenuLinksContainer(groupedElements);
  const searchBar = createSearchBar();
  menuList.append(searchBar);
  menuList.append(menuLinks);
  menuContainer.append(menuOverlay);
  menuContainer.append(menuList);

  navMenuBar.append(menuIcon);
  navMenuBar.append(menuContainer);

  const menuToggle = () => {
    const body = document.querySelector('body');
    if (!elementHasClass(menuContainer, 'active')) {
      const widthBefore = body.offsetWidth;
      addClassesToElements([menuContainer, menuIcon], ['active']);
      body.style.overflow = 'hidden';
      body.style.marginRight = `${body.offsetWidth - widthBefore}px`;
      setTimeout(() => {
        menuList.style.right = 0;
      }, 0);
    } else {
      menuList.style.right = '-380px';
      setTimeout(() => {
        removeClassesFromElements([menuContainer, menuIcon], ['active']);
        body.style.overflow = 'auto';
        body.style.marginRight = '';
      }, 500);
    }
  };

  menuIcon.addEventListener('click', () => {
    menuToggle();
  });
  menuOverlay.addEventListener('click', () => {
    menuToggle();
  });
  return navMenuBar;
};

const createMenuNavigation = (navWrapper) => {
  const htmlElem = window.document.getElementsByTagName('html');
  if (cloneBlock === null) {
    cloneBlock = navWrapper.cloneNode(true);
  }

  if (!elementHasClass(htmlElem[0], 'adobe-ue-edit')) {
    const navContainer = navWrapper.querySelector(
      '.nav-wrapper .nav-sections .default-content-wrapper',
    );
    const navContainerCopy = navContainer.cloneNode(true);
    const icons = navContainerCopy.querySelectorAll('p');
    navContainer.innerHTML = '';
    for (let index = 0; index < icons.length; index += 1) {
      const icon = icons[index];
      navContainer.append(icon);
    }
    const menuBar = createMenuBar(navContainerCopy);
    navContainer.append(menuBar);
  } else {
    navWrapper.innerHTML = '';
    const elems = cloneBlock.children;
    for (let index = 0; index < elems.length; index += 1) {
      const elem = elems[index];
      setTimeout(() => {
        navWrapper.append(elem);
      }, index);
    }
  }
  return navWrapper;
};

export { createMenuNavigation, groupElements };
