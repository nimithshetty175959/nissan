import { elementHasClass } from '../../scripts/dom.js';

let cloneBlock = null;

export default async function decorate(block) {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Helper function to add animation to elements
    const addScrollAnimation = (element, { start, end, pin, pinSpacing, scrub, blur, opacity }) => {
        if (element) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start,
                    end,
                    scrub,
                    pin,
                    pinSpacing,
                },
            }).to(element, {
                filter: blur,
                opacity,
                ease: 'power1.inOut',
            });
        } else {
            console.error("Element not found for animation.");
        }
    };

    // Apply blur and opacity animation to default content wrapper
    const defaultContentWrapper = document.querySelector(".default-content-wrapper");
    addScrollAnimation(defaultContentWrapper, {
        start: "top top",
        end: "bottom+=100 top",
        scrub: true,
        pin: true,
        pinSpacing: false,
        blur: 'blur(20px)',
        opacity: 0,
    });

    // Add unique and common classes to child elements in the parent container
    const parentContainer = document.querySelector(".nissancards-wrapper");
    if (parentContainer) {
        const childElements = parentContainer.querySelectorAll("[data-aue-type='component']");
        childElements.forEach((child, index) => {
            child.classList.add("sub-block");
            child.id = `id${index + 1}`;
        });
        console.log("Classes added to all child elements.");
    } else {
        console.error(".nissancards-wrapper not found in the DOM.");
    }

    // Add animations to each card
    const cards = document.querySelectorAll(".sub-block");
    cards.forEach((card, index) => {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: card,
                    start: `bottom center+=${index * 50}`,
                    toggleActions: "play reverse play reverse",
                },
            }
        );
    });

    // Enhance sub-blocks with text and link wrappers
    const enhanceSubBlock = (card) => {
        const picture = card.querySelector('picture');
        if (!picture) return;

        const textDiv = card.querySelector('[data-aue-prop="text"]');
        const linkDiv = card.querySelector('div > p > a')?.closest('div');

        // Function to create the SVG wrapped in an anchor tag
        const createArrowLink = () => {
            const anchor = document.createElement('a');
            anchor.href = "https://www.nissan.fr/vehicules/configurateur.html";
            anchor.title = "Configuration";
            anchor.setAttribute('aria-label', 'Configuration');
            anchor.innerHTML = `
                <svg width="50" height="16" viewBox="0 0 50 16">
                    <g>
                        <path d="M0 8H48M48 8L41 1M48 8L41 15" stroke="rgba(255, 255, 255, 1)" stroke-width="2"></path>
                    </g>
                </svg>`;
            return anchor;
        };

        if (linkDiv) {
            linkDiv.innerHTML = ""; // Clear the current content
            linkDiv.appendChild(createArrowLink());
        }

        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('wrapper-div');

        if (textDiv) wrapperDiv.appendChild(textDiv);
        if (linkDiv) wrapperDiv.appendChild(linkDiv);

        picture.parentElement.insertBefore(wrapperDiv, picture.nextSibling);
    };

    // Process all cards
    cards.forEach(enhanceSubBlock);
}
