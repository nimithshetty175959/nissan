import {
  addClassesToElements,
  createElement,
  onAnyElemntClick,
} from '../../scripts/dom.js';

const callFeedBackAPI = async (apiData) => {
  const rawResponse = await fetch(apiData.api, {
    method: 'POST',
    body: JSON.stringify(apiData.data),
  });
  await rawResponse.json();
};

const createRatingInputComponent = () => {
  const ratingInputContainer = createElement('div', ['rating-input-container']);
  const ratingInputStars = createElement('div', ['rating-input-stars']);
  const ratingInputForm = createElement('form', ['input-stars-form']);

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

  const inputFeedbackWrap = createElement('div', ['input-feedback-wrap']);
  const feedbackHead = createElement('p', ['feedback-head']);
  const inputfeedback = createElement('textarea', ['input-name']);
  feedbackHead.append('How could we improve your experience?');

  inputFeedbackWrap.append(feedbackHead);
  inputFeedbackWrap.append(inputfeedback);

  const starLables = ratingInputComponent.querySelectorAll('.label-star');

  onAnyElemntClick(starLables, () => {
    addClassesToElements([inputFeedbackWrap], ['active']);
  });

  ratingWrapper.append(head);
  ratingWrapper.append(subhead);
  ratingWrapper.append(ratingInputComponent);
  ratingWrapper.append(inputFeedbackWrap);
  ratingWrapper.append(ratePara);
  ratingWrapper.append(button);

  ratingComponent.append(ratingWrapper);
  ratingComponent.append(richtext);

  const apiButton = button.querySelector('a');
  const apiUrl = apiButton.getAttribute('href');
  apiButton.removeAttribute('href');

  apiButton.addEventListener('click', () => {
    const formElem = ratingComponent.querySelector('form');
    const data = Object.fromEntries(new FormData(formElem).entries());
    const feedBack = inputfeedback.value;
    const successMessage = createElement('div', ['feedback-success']);
    successMessage.innerHTML = '<p class="text">We thank you for your review.</p>';
    ratingWrapper.innerHTML = '';
    ratingWrapper.append(successMessage);
    callFeedBackAPI({
      api: apiUrl,
      data: {
        ...data,
        feedBack,
      },
    });
  });

  return ratingComponent;
};

export { renderRatingComponent, createRatingInputComponent };
