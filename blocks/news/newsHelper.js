import { fetchApiGET } from '../../scripts/api.js';
import Carousel from '../../scripts/carousel.js';
import { addClassesToElements, createElement } from '../../scripts/dom.js';

const newsJson = [
  {
    title: 'Garantie Nissan Privilège',
    image:
      'https://main--nissan--nimithshetty175959.aem.page/media_138490dea3971ef313b314e5430382da7c6ac2be4.jpeg?width=2000&format=webply&optimize=medium',
    link: 'https://www.nissan.fr/actualites/garantie-nissan-privilege.html',
    date: '10/24/2024',
  },
  {
    title: 'Nouvel ARIYA Nismo',
    image:
      'https://main--nissan--nimithshetty175959.aem.page/media_19045aa2d4ac7d726aaf32fbffdbc8c9ac453389e.jpeg?width=2000&format=webply&optimize=medium',
    link: 'https://www.nissan.fr/vehicules/neufs/ariya/ariya-nismo.html',
    date: '10/17/2024',
  },
  {
    title: 'Making-of du grand saut Nissan',
    image:
      'https://main--nissan--nimithshetty175959.aem.page/media_15a967733e152c7e594a9f293ba18b7e25f4d1861.jpeg?width=2000&format=webply&optimize=medium',
    link: 'https://www.nissan.fr/actualites/le-grand-saut-qashqai-making-of.html',
    date: '09/26/2024',
  },
  {
    title: 'Live Nissan Qashqai',
    image:
      'https://main--nissan--nimithshetty175959.aem.page/media_1567d51820cd9b79949b8cbbd80e313964368c086.jpeg?width=2000&format=webply&optimize=medium',
    link: 'https://www.nissan.fr/actualites/live-nissan.html',
    date: '09/23/2024',
  },
  {
    title: 'Le grand saut par Qashqai',
    image:
      'https://main--nissan--nimithshetty175959.aem.page/media_1821cfa559b361b3199fb6e843a54bc7083730fb7.png?width=2000&format=webply&optimize=medium',
    link: 'https://www.nissan.fr/actualites/qashqai-stunt.html',
    date: '05/09/2024',
  },
];

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
  const arrowLeft = createElement('a', ['carousel-arrow', 'left']);
  const arrowRight = createElement('a', ['carousel-arrow', 'right']);
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
  let newsItems = await fetchApiGET(apiURL);
  newsItems = newsItems.length === 0 ? newsJson : newsItems;
  const carouselContainer = getCarouselContainer(newsItems);

  newsContainer.append(newsHead);
  newsContainer.append(carouselContainer);
  return newsContainer;
};

export { getNewsComponent, getCarouselContainer };
