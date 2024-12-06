import { addClassesToElements, createElement } from '../../scripts/dom.js';

const { gsap, ScrollTrigger } = window;

const getcardsComponent = (block) => {
    const nissancardsWrapper = createElement('div', ['nissan-cards-wrapper']);
    const nissantext = createElement('div', ['nissan-text']);
    const cardsContainer = createElement('div', ['cards-container']);

    Array.from(block.children).forEach((child, index) => {

        if (!index){
            child.classList.add('nissan-heading-text');
            nissantext.appendChild(child);
            return;
        }

        child.classList.add('sub-block');
        child.id = `id${index}`;

        // Apply GSAP animation to the card
        gsap.fromTo(
            child,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: child,
                    start: `top center+=${index * 50}`,
                    toggleActions: 'play reverse play reverse',
                },
            }
        );

        const picture = child.querySelector('picture');
        if (picture) {
            const [image, text, link] = child.children;

            // Add classes to elements
            if (image) addClassesToElements([image], ['cards-image']);
            if (link) addClassesToElements([link], ['cards-link']);
            if (text) addClassesToElements([text], ['cards-text']);

            // Create a container for link and text
            const cardsLinkContainer = createElement('div', ['cards-link-container']);
            if (text) cardsLinkContainer.appendChild(text);
            if (link) cardsLinkContainer.appendChild(link);

            // Append the cardsLinkContainer inside the image container
            if (image) image.appendChild(cardsLinkContainer);

            // Insert SVG inside the <a> tag within the link element, if it exists
            const linkElement = link?.querySelector('a');
            if (linkElement) {
                const svgIcon = `<svg width="50" height="16" viewBox="0 0 50 16">
                    <g>
                        <path d="M0 8H48M48 8L41 1M48 8L41 15" stroke="rgba(255, 255, 255, 1)" stroke-width="2"></path>
                    </g>
                </svg>`;
                linkElement.innerHTML = svgIcon;
            }
        }

        // Append the modified child to the container
        cardsContainer.appendChild(child);
    });
    nissancardsWrapper.appendChild(nissantext);
    nissancardsWrapper.appendChild(cardsContainer);


    return nissancardsWrapper;
};

export { getcardsComponent };
