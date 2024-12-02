import {
    addClassesToElements,
    createElement,
    removeClassesFromElements,
  } from '../../scripts/dom.js';

const getNissanCardComponent = async (block) => {
    const blockElement = block.cloneNode(true);
    const cardContainer = createElement('div', ['nissan-cards-container']);
    cardContainer.append(blockElement);
    return cardContainer;
  };

  export {getNissanCardComponent};