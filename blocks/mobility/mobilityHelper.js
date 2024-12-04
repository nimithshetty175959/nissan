import { addClassesToElements, createElement } from '../../scripts/dom.js';




const getMobilityComponent = (block) => {
  const blockCopy = block.cloneNode(true);
  const [mobilityText, mobilityImage, mobilityLink, mbText] = blockCopy.children;
  const mobilityContainer = createElement('div', ['mobility-contianer']);

  
  addClassesToElements([mobilityText], ['mobility-text']);
  addClassesToElements([mobilityImage], ['mobility-image']);
  addClassesToElements([mobilityLink], ['mobility-link']);
  addClassesToElements([mbText], ['mb-text']);

  mobilityContainer.append(mobilityText);
  mobilityContainer.append(mobilityImage);
  mobilityContainer.append(mobilityLink);
  mobilityContainer.append(mbText);

  
  return mobilityContainer;
};

export { getMobilityComponent };
