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
            child.classList.add('offer-section', `slide-${index}`);
        });
    }

    gsap.registerPlugin(ScrollTrigger);

    const containers = gsap.utils.toArray(".vehicles");
    
    containers.forEach((cont, i) => {
        const { innerHeight } = window;
        const slides = gsap.utils.toArray(".offer-section", cont); // Get all the slides
        const marginValue = innerHeight * slides.length; // Determine how much scroll space we need
        const firstSlide = slides[0]; // First slide

        // Set the margin of the container to be long enough for the scroll
        gsap.set(cont, { marginBottom: marginValue });

        // Pin the first slide and keep it in place
        ScrollTrigger.create({
            trigger: cont,
            start: "top top",
            end: "max",
            pin: true,
            pinSpacing: false,
           
        });

        // Horizontal scroll animation for the other slides
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cont,
                start: "top top",
                end: "+=" + (marginValue + innerHeight * 0.5),
                scrub: true,
            
            }
        });

        // Animate the horizontal scroll of the slides (except the first one)
        tl.to(slides.slice(1), {
            xPercent: -(100 * (slides.length - 1)), // Move remaining slides horizontally
            duration: slides.length,
            ease: "none"
        });

        // Animate the blur effect on the first slide as you scroll
        gsap.to(firstSlide, {
            filter: "blur(10px)", // Maximum blur
            scrollTrigger: {
                trigger: cont,
                start: "top top", // Start as soon as the first slide is in view
                end: "+=" + (marginValue + innerHeight * 0.5), // End when the scroll is finished
                scrub: true, // Smooth scroll-based animation
              
                onUpdate: (self) => {
                    // Optional: You can log the progress to see how it behaves
                    console.log(self.progress); 
                }
            }
        });

        // Optional: Apply a blur effect to finalText
        const finalText = slides[2]?.querySelector("div");
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
                   
                }
            });
        }
    });
}
