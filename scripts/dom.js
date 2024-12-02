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

const onAnyElemntClick = (elements, callback) => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    element.addEventListener('click', callback);
  }
};
const removeClickEvent = (elements, callback) => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    element.removeEventListener('click', callback, false);
  }
};

export {
  createElement,
  elementHasClass,
  addClassesToElements,
  removeClassesFromElements,
  onAnyElemntClick,
  removeClickEvent,
};
