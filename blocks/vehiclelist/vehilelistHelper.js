import {
  addClassesToElements,
  createElement,
  removeClassesFromElements,
} from '../../scripts/dom.js';

import { fetchApiGET } from '../../scripts/api.js';

const { gsap } = window;

const vehicleJSON = [
  {
    vehicle: 'All models',
    number: 2000,
    link: 'https://www.nissan.fr/achat/voitures-a-vendre',
  },
  {
    vehicle: 'ARIYA',
    number: 50,
    link: 'https://www.nissan.fr/achat/voitures-a-vendre?modelCodes=ariya&modelCodes=nouveau-ariya',
  },
  {
    vehicle: 'Juke',
    number: 750,
    link: 'https://www.nissan.fr/achat/voitures-a-vendre?modelCodes=juke&modelCodes=nouveau-juke',
  },
  {
    vehicle: 'Qashqai',
    number: 1150,
    link: 'https://www.nissan.fr/achat/voitures-a-vendre',
  },
  {
    vehicle: 'X-Trail',
    number: 300,
    link: 'https://www.nissan.fr/achat/voitures-a-vendre?modelCodes=x-trail&modelCodes=nouveau-x-trail',
  },
];

const animate = (vehicleContainer, vehicleOverlay, vehicleBGI) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: vehicleOverlay,
      endTrigger: vehicleContainer,
      start: 'top center-=300',
      end: 'bottom center-=300',
      ease: 'power2.inOut',
    },
  });

  const t2 = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      trigger: vehicleBGI,
      endTrigger: vehicleContainer,
      start: 'top center-=200',
      end: 'bottom center-=200',
      ease: 'power2.inOut',
    },
  });

  tl.fromTo(
    vehicleOverlay,
    { backdropFilter: 'blur(0px)', webkitBackdropFilter: 'blur(0px)' },
    { backdropFilter: 'blur(100px)', webkitBackdropFilter: 'blur(100px)' },
  );

  t2.fromTo(
    vehicleBGI,
    { width: '100%', left: '0' },
    { width: '103%', left: '-3%' },
  );
};

const getAnimCircles = () => {
  const circleMain = createElement('div', ['anim-circle-b']);
  for (let index = 0; index < 5; index += 1) {
    const circle = createElement('div', ['anim-circle', 'circle']);
    circleMain.append(circle);
  }
  return circleMain;
};

const updateDomData = (block, value) => {
  const option = JSON.parse(value);
  const textElem = block.querySelector('.vehiclelist-subtext p');
  const buttonElem = block.querySelector('.vehicle-submit .button-container a');
  buttonElem.setAttribute('target', '_blank');
  buttonElem.setAttribute('href', option.link);
  const textString = textElem.textContent;
  const stringAray = textString.split(' ');
  stringAray[2] = option.number;
  textElem.textContent = stringAray.join(' ');
};

const getDynamicContent = async (apiLink, block) => {
  const apiURL = apiLink.querySelector('a').href;
  let vehicleList = await fetchApiGET(apiURL);
  vehicleList = vehicleList.length === 0 ? vehicleJSON : vehicleList;
  const customSelect = createElement('div', ['v-custom-select']);
  const selectTrigger = createElement('div', ['v-select-trigger']);
  const selectOptions = createElement('ul', ['v-select-options']);
  const initialValue = vehicleList[0]?.vehicle || 'Tous les modèles';
  selectTrigger.append(initialValue);
  vehicleList.forEach((item, i) => {
    const option = createElement('li', ['v-option']);
    if (i === 0) {
      option.classList.add('active');
    }
    option.setAttribute('data-option', JSON.stringify(item));
    option.append(item.vehicle);
    selectOptions.append(option);
  });
  customSelect.append(selectTrigger);
  customSelect.append(selectOptions);

  const options = selectOptions.querySelectorAll('.v-option');

  selectTrigger.addEventListener('click', () => {
    selectOptions.style.display = selectOptions.style.display === 'block' ? 'none' : 'block';
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-option');
      const text = option.textContent;

      removeClassesFromElements(options, ['active']);

      addClassesToElements([option], ['active']);

      selectTrigger.textContent = text;
      selectOptions.style.display = 'none';
      updateDomData(block, value);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.v-custom-select')) {
      selectOptions.style.display = 'none';
    }
  });

  return customSelect;
};

const getVehicleListComponent = async (block) => {
  const blockElement = block.cloneNode(true);
  const elementList = blockElement.children;
  const [heading, subtext, image, button, apiLink] = elementList;
  const vehicleContainer = createElement('div', ['vehicle-list-container']);
  const vehicleBGI = createElement('div', ['vehicle-bg-image']);
  const vehicleOverlay = createElement('div', ['vehicle-overlay']);
  const dataContainer = createElement('div', ['vehicle-data-container']);
  const dataInput = createElement('div', ['vehicle-data-input']);
  const dynamicInput = createElement('div', ['vehicle-dynamic-input']);
  const buttonSubmit = createElement('div', ['vehicle-submit']);
  const animCircle = getAnimCircles();
  buttonSubmit.append(button);

  const dynamicContent = await getDynamicContent(apiLink, block);
  dynamicInput.append(dynamicContent);

  dataInput.append(dynamicInput);
  dataInput.append(buttonSubmit);

  const bgImageSrc = image.querySelector('img').src;
  vehicleBGI.style.backgroundImage = `url(${bgImageSrc})`;
  addClassesToElements([heading], ['vehiclelist-head']);
  addClassesToElements([subtext], ['vehiclelist-subtext']);
  subtext.append(animCircle);
  dataContainer.append(heading);
  dataContainer.append(subtext);
  dataContainer.append(dataInput);

  vehicleContainer.append(vehicleBGI);
  vehicleContainer.append(vehicleOverlay);
  vehicleContainer.append(dataContainer);

  animate(vehicleContainer, vehicleOverlay, vehicleBGI);
  return vehicleContainer;
};

export { getVehicleListComponent, getAnimCircles };
