import { fetchApiGET } from '../../scripts/api.js';
import Carousel from '../../scripts/carousel.js';
import { addClassesToElements, createElement } from '../../scripts/dom.js';

const getArrow = () => `
      <svg width="50" height="16" viewBox="0 0 50 16">
          <g>
              <path d="M0 8H48M48 8L41 1M48 8L41 15" stroke="rgba(0, 0, 0, 1)" stroke-width="2"></path>
          </g>
      </svg>
      `;

const getNewsItemHTML = (newsItem) => {
  const {
    date, image, link, title,
  } = newsItem;
  return `
    <div class="news-item">
        <a class="news-item-link" href="${link}">
            <div class="news-image-wrap">
                <img src="${image}" class="item-image" alt="${title}" />
            </div>
            <div class="news-data-wrap">
                <div class="news-date"><span>${date}</span></div>
                <div class="news-title"><span>${title}</span></div>
            </div>
        </a>
    </div>
    `;
};

const getCarouselContainer = (newsItems) => {
  const carouselContainer = createElement('div', [
    'carousel-container',
    'news-item-list',
  ]);
  const arrowWrap = createElement('div', ['arrow-wrapper']);
  const arrowLeft = createElement('button', ['carousel-arrow', 'left']);
  const arrowRight = createElement('button', ['carousel-arrow', 'right']);
  arrowLeft.innerHTML = getArrow();
  arrowRight.innerHTML = getArrow();
  arrowWrap.append(arrowLeft);
  arrowWrap.append(arrowRight);

  const carouselWrap = createElement('div', ['carousel-wrapper']);
  const carousel = createElement('div', ['carousel']);

  newsItems.forEach((item) => {
    const carouselItem = createElement('div', ['carousel-item']);
    carouselItem.innerHTML = getNewsItemHTML(item);
    carousel.append(carouselItem);
  });

  carouselWrap.append(carousel);

  carouselContainer.append(arrowWrap);
  carouselContainer.append(carouselWrap);

  // eslint-disable-next-line no-unused-vars
  const carouselObj = new Carousel(carouselContainer, {
    itemsToShow: 3.4,
    slideTransition: 300,
  });

  return carouselContainer;
};

const getNewsComponent = async (block) => {
  const blockCopy = block.cloneNode(true);
  const [newsHead, apiElement] = blockCopy.children;
  const newsContainer = createElement('div', ['news-container']);
  addClassesToElements([newsHead], ['news-heading']);

  const linkElem = apiElement.querySelector('a');
  const apiURL = linkElem.getAttribute('href');
  const newsItems = await fetchApiGET(apiURL);
  const carouselContainer = getCarouselContainer(newsItems);

  newsContainer.append(newsHead);
  newsContainer.append(carouselContainer);
  return newsContainer;
};

export { getNewsComponent, getCarouselContainer };
