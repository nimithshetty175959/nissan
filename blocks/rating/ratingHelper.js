import { addClassesToElements, createElement } from '../../scripts/dom.js';

const createRatingInputComponent = () => {
  const ratingInputContainer = createElement('div', ['rating-input-container']);
  const ratingInputStars = createElement('div', ['rating-input-stars']);
  const ratingInputForm = createElement('form', ['input-stars-form']);

  const inputWrap = createElement('div', ['input-name-wrap']);
  const inputText = createElement('input', ['input-name']);
  inputText.setAttribute('type', 'text');

  for (let index = 5; index >= 1; index -= 1) {
    const input = createElement('input', ['input-star']);
    input.setAttribute('id', `rating-${index}`);
    input.setAttribute('value', index);
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'rating');

    const label = createElement('label', ['label-star']);
    label.setAttribute('for', `rating-${index}`);
    ratingInputForm.append(input);
    ratingInputForm.append(label);
  }

  const ratingInfo = createElement('div', ['rating-info']);
  const textOne = createElement('span', ['text-status']);
  const textTwo = createElement('span', ['text-status']);
  textOne.append('Not satisfactory');
  textTwo.append('Very satisfactory');
  ratingInfo.append(textOne);
  ratingInfo.append(textTwo);

  inputWrap.append(inputText);
  ratingInputStars.append(ratingInputForm);
  ratingInputStars.append(ratingInfo);
  ratingInputContainer.append(ratingInputStars);

  return ratingInputContainer;
};

const renderRatingComponent = (block) => {
  const blockCopy = block.cloneNode(true);
  const elements = blockCopy.children;
  const ratingComponent = createElement('div', ['rating-component']);
  const ratingWrapper = createElement('div', ['rating-wrappper']);
  const [head, subhead, ratePara, button, richtext] = elements;

  addClassesToElements([head], ['rating-head']);
  addClassesToElements([subhead], ['rating-sub-head']);
  addClassesToElements([ratePara], ['rating-para']);
  addClassesToElements([button], ['rating-submit']);
  addClassesToElements([richtext], ['rating-richtext']);
  const ratingInputComponent = createRatingInputComponent();

  const apiButton = button.querySelector('a');
  //   const apiUrl = apiButton.getAttribute('href');
  apiButton.removeAttribute('href');
  //   console.log(apiUrl);

  ratingWrapper.append(head);
  ratingWrapper.append(subhead);
  ratingWrapper.append(ratingInputComponent);
  ratingWrapper.append(ratePara);
  ratingWrapper.append(button);

  ratingComponent.append(ratingWrapper);
  ratingComponent.append(richtext);

  return ratingComponent;
};

export { renderRatingComponent, createRatingInputComponent };
