(function(){
    "use strict";
    console.log('reading js');

    // Function to detect if 75% of the element is in view
    function isInView(element) {
        const rect = element.getBoundingClientRect();
        const elementHeight = rect.height || element.offsetHeight; // Get element height
        const threshold = elementHeight * 0.75; //Threshold at least 75% of element's height

        return (
            rect.top >= -threshold && 
            rect.bottom <= window.innerHeight + threshold // Section must be mostly in view
        );
    }

    function handleScroll() {

    const sections = document.querySelectorAll('.section');
    
    // Check if we're back at the header (scrolling up)
    if (window.scrollY === 0) {
        // Reset all sections
        sections.forEach(section => section.classList.remove('in-view'));

        // Reset background color and gradient to white
        document.body.style.backgroundColor = '#ffffff'; 
        document.body.style.backgroundImage = ''; // Remove any gradient

        console.log('Resetting interactions and background color as we are back at the header.');
        return; // Exit early since we're at the top
    }

    // Handle section interactions
    sections.forEach(section => {
        if (isInView(section)) {
            // Trigger animations when mostly in view
            if (!section.classList.contains('in-view')) {
                console.log('Adding in-view class:', section);
                section.classList.add('in-view');
            }
        }
    });
    }

    // Trigger scroll event on page load and on scroll
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

})();