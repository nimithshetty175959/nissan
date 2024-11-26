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
        childDivs = parentDiv.querySelectorAll('div');
        console.log(childDivs);
        Array.from(parentDiv.children).forEach(child => {
            // Step 3: Append each immediate child to the wrapper
            console.log("child", child);
            child.classList.add('offer-sec');
        });
        
    }
    // gsap.registerPlugin(ScrollTrigger);

    // let sections = gsap.utils.toArray(".offer-sec");

    // gsap.to(sections, {
    //   xPercent: -100 * (sections.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".vehicles",
    //     pin: true,
    //     scrub: 1,
    //     snap: 1 / (sections.length - 1),
    //     end: () => "+=" + document.querySelector(".vehicles").offsetWidth
    //   }
    // });
    

}

