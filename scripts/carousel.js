import { addClassesToElements, removeClassesFromElements } from './dom.js';

class Carousel {
  constructor(container, config) {
    this.config = {
      itemsToShow: 3,
      slideTransition: 500,
      ...config,
    };
    this.container = container;
    this.carousel = this.container.querySelector('.carousel');
    this.items = this.container.querySelectorAll('.carousel-item');
    this.leftArrow = this.container.querySelector('.carousel-arrow.left');
    this.rightArrow = this.container.querySelector('.carousel-arrow.right');
    const body = document.querySelector('body');
    this.itemWidth = body.offsetWidth / this.config.itemsToShow;
    this.totalItems = this.items.length;

    for (let index = 0; index < this.totalItems; index += 1) {
      const element = this.items[index];
      element.style.width = `${this.itemWidth}px`;
    }

    this.currentIndex = 0;

    this.carousel.style.transitionDuration = `${this.config.slideTransition}ms`;

    this.updateVisibleItems();
    this.initArrowControls();
    this.initMouseSlide();
    this.updateCarouselPosition();
  }

  initArrowControls() {
    this.leftArrow.addEventListener('click', () => this.slide(-1));
    this.rightArrow.addEventListener('click', () => this.slide(1));
  }

  slide(direction) {
    this.currentIndex += direction;
    this.currentIndex = Math.max(
      0,
      Math.min(this.currentIndex, this.totalItems - this.config.itemsToShow),
    );
    this.updateCarouselPosition();
  }

  initMouseSlide() {
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    let linkClick = false;

    const startDrag = (e) => {
      e.preventDefault();
      isDragging = true;
      linkClick = false;
      startX = e.pageX || e.touches[0].pageX;
      currentTranslate = this.currentIndex * -this.itemWidth;
      this.carousel.style.transition = 'none';
    };

    const drag = (e) => {
      if (!isDragging) return;
      const currentX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
      const deltaX = currentX - startX;
      let transform = currentTranslate + deltaX;
      this.carousel.style.transform = `translateX(${transform}px)`;
      if (transform >= 0) {
        transform = 0;
      }

      this.currentIndex = Math.floor(Math.abs(transform / this.itemWidth));

      if (Math.abs(deltaX) > 5) {
        linkClick = true;
      }
    };

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.type.includes('touch')
        ? e.changedTouches[0].pageX
        : e.pageX;

      const deltaX = endX - startX;

      if (deltaX > 50) {
        this.slide(-1);
      } else if (deltaX < -50) {
        this.slide(1);
      } else {
        this.updateCarouselPosition();
      }
      this.carousel.style.transition = `${this.config.slideTransition}ms ease-in-out`;
    };

    const preventLinkClickDuringDrag = (e) => {
      if (linkClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    this.carousel.addEventListener('mousedown', startDrag);
    this.carousel.addEventListener('touchstart', startDrag);

    this.carousel.addEventListener('mousemove', drag);
    this.carousel.addEventListener('touchmove', drag);

    this.carousel.addEventListener('mouseup', endDrag);
    this.carousel.addEventListener('touchend', endDrag);

    this.carousel.addEventListener('mouseleave', () => {
      isDragging = false;
      linkClick = false;
    });

    this.carousel.addEventListener('click', () => {
      linkClick = true;
    });
    this.carousel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', preventLinkClickDuringDrag);
    });
  }

  updateCarouselPosition() {
    const offset = -this.currentIndex * this.itemWidth;
    let margin;
    removeClassesFromElements([this.leftArrow, this.rightArrow], ['disabled']);
    if (this.currentIndex === 0) {
      margin = 60;
      addClassesToElements([this.leftArrow], ['disabled']);
    } else if (
      this.currentIndex
      === this.totalItems - this.config.itemsToShow
    ) {
      margin = -100;
      addClassesToElements([this.rightArrow], ['disabled']);
    } else {
      margin = 60;
    }
    this.currentIndex = Math.ceil(this.currentIndex);
    this.carousel.style.transform = `translateX(${offset + margin}px)`;
  }

  updateVisibleItems() {
    const wrapper = this.container.querySelector('.carousel-wrapper');
    const visibleWidth = this.config.itemsToShow * this.itemWidth;
    this.carousel.style.width = `${this.itemWidth * this.totalItems}px`;
    wrapper.style.width = `${visibleWidth}px`;
  }
}

export default Carousel;
