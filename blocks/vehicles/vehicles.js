import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the promotional offer
 * @param {Element} block 
 */
export default async function decorate(block) {
    const parentDiv = document.querySelector('.vehicles');
    
    if (parentDiv) {
        Array.from(parentDiv.children).forEach((child, index) => {
            
            if(index){
                child.classList.add('offer-section', 'slide',`slide-${index}`);
            } else{
                child.classList.add('offer-section','offer-text',`slide-${index}`);
            }
        });
        
    }

     const offerSections = document.querySelectorAll('.offer-section');
    const sections = Array.from(offerSections).slice(1);
 
    sections.forEach((section) => {
        // Find the picture container
        const pictureContainer = section.querySelector('picture');

        // Ensure the picture container exists
        if (pictureContainer) {
            // Find the richtext div and button-container div
            const richTextDiv = section.querySelector('[data-aue-type="richtext"]');
            const buttonContainerDiv = section.querySelector('.button-container');
            const wrapper = document.createElement('div');
            wrapper.classList.add('offer-details');
            wrapper.appendChild(richTextDiv);
            wrapper.appendChild(buttonContainerDiv);
            
            pictureContainer.parentElement.appendChild(wrapper);
    
        } 
    });
    gsap.registerPlugin(ScrollTrigger);

    const containers = gsap.utils.toArray(".vehicles");

    containers.forEach((cont) => {
        const { innerHeight } = window;
        const slides = gsap.utils.toArray(".offer-section", cont); // Get all the slides
        const marginValue = innerHeight * slides.length-1; // Determine how much scroll space we need
        const additionalSpace = innerHeight * 0.05; // Reduced space below the container
        const firstSlide = slides[0]; // First slide

        // Set the margin of the container to be long enough for the scroll
        gsap.set(cont, { marginBottom: marginValue + additionalSpace });

        // Pin the first slide and keep it in place
        ScrollTrigger.create({
            trigger: cont,
            start: "top top",
            end: "+=" + (marginValue + additionalSpace),
            pin: true,
            pinSpacing: false,
        });

        // Horizontal scroll animation for the other slides
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cont,
                start: "top top",
                end: "+=" + (marginValue + additionalSpace),
                scrub: true,
            },
        });

        // Animate the horizontal scroll of the slides
        tl.to(slides.slice(1), {
            xPercent: -(125 * (slides.length - 1)), // Move remaining slides horizontally
            duration: slides.length,
            ease: "none",
        });

        // Animate the vertical scroll of the entire container
        tl.to(cont, {
            yPercent: -100, // Move the container upwards
            duration: 1,
            ease: "none",
        });

        // Animate the blur effect on the first slide
        gsap.to(firstSlide, {
            filter: "blur(50px)", // Maximum blur
            scrollTrigger: {
                trigger: cont,
                start: "top top",
                end: "+=" + (marginValue + additionalSpace), // End when the scroll is finished
                scrub: true,
            },
        });
    });
}
