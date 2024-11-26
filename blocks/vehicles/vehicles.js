import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the promotional offer
 * @param {Element} block 
 */
export default async function decorate(block) {
    const parentDiv = document.querySelector('.vehicles');
    let childDivs;

    if (parentDiv) {
        Array.from(parentDiv.children).forEach((child, index) => {
            child.classList.add('offer-section', `slide-${index}`);

        });
    }


    gsap.registerPlugin(ScrollTrigger);

    const containers = gsap.utils.toArray(".vehicles");

    containers.forEach((cont, i) => {
        const { innerHeight } = window;
        const slides = gsap.utils.toArray(".offer-section", cont); // Get all the slides
        const marginValue = innerHeight * slides.length; // Determine how much scroll space we need
        const finalText = slides[0]?.querySelector("div");

        // Set the margin of the container to be long enough for the scroll
        gsap.set(cont, { marginBottom: marginValue });

        // Pin the first slide and keep it in place
        ScrollTrigger.create({
            trigger: cont,
            start: "top top",
            end: "max",
            pin: true,
            pinSpacing: false,
            markers: true // Optional: Remove this in production
        });

        // Horizontal scroll animation for the other slides
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cont,
                start: "top top",
                end: "+=" + (marginValue + innerHeight * 0.5),
                scrub: true,
                markers: true // Optional: Remove this in production
            }
        });

        // Animate the horizontal scroll of the slides (except the first one)
        tl.to(slides.slice(1), {
            xPercent: -(100 * (slides.length - 1)), // Move remaining slides horizontally
            duration: slides.length,
            ease: "none"
        });

        // Optional: Apply a blur effect to finalText
        if (finalText) {
            gsap.to(finalText, {
                filter: "blur(10px)",
                ease: "none",
                scrollTrigger: {
                    trigger: finalText,
                    start: "left 70%",
                    end: "left 75%",
                    containerAnimation: tl,
                    scrub: true,
                    markers: { startColor: "red", endColor: "red" } // Optional: for debugging
                }
            });
        }
    });
}