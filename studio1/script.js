(function () {
    "use strict";
    console.log('reading js');

    // Capture form and overlay elements
    const myform = document.querySelector('#madLibForm');
    const madLibOverlay = document.getElementById('madLibOverlay');
    const madLibResult = document.getElementById('madLibResult');
    const closeOverlayButton = document.getElementById('closeOverlay');

    if (!myform || !madLibOverlay || !madLibResult || !closeOverlayButton) {
        console.error("One or more elements are missing in the HTML structure.");
        return;
    }

    myform.addEventListener('submit', function(event) {
        event.preventDefault();

        // Capture user input values
        const noun = document.querySelector('#noun').value;
        const food = document.querySelector('#food').value;
        const adjective = document.querySelector('#adjective').value;
        const pluralNoun = document.querySelector('#pluralNoun').value;
        const place = document.querySelector('#place').value;

        let mytext = '';

        // Check for empty fields and set error messages if needed
        if (noun === "") {
            mytext = "Please provide a noun.";
            document.querySelector("#noun").focus();
        } 
        else if (food === "") {
            mytext = "Please provide a type of food.";
            document.querySelector("#food").focus();
        } 
        else if (adjective === "") {
            mytext = "Please provide an adjective.";
            document.querySelector("#adjective").focus();
        } 
        else if (pluralNoun === "") {
            mytext = "Please provide a plural noun.";
            document.querySelector("#pluralNoun").focus();
        } 
        else if (place === "") {
            mytext = "Please provide a place.";
            document.querySelector("#place").focus();
        } 
        else {
            // Generate Mad Lib if all fields are filled
            mytext = `This picnic is going to be amazing! I'm bringing my trusty ${noun} for grilling, a huge batch of ${food} to share, and a colorful ${adjective} blanket to sit on. We can't forget the ${pluralNoun} for entertainment and, of course, some sparklers to light up the ${place}!`;

            // Clear input fields
            document.querySelector('#noun').value = '';
            document.querySelector('#food').value = '';
            document.querySelector('#adjective').value = '';
            document.querySelector('#pluralNoun').value = '';
            document.querySelector('#place').value = '';

            // Show result in overlay
            madLibResult.innerHTML = mytext;
            madLibOverlay.classList.remove('hidden');
        }
    });

    // Close overlay button
    closeOverlayButton.addEventListener('click', function () {
        madLibOverlay.classList.add('hidden'); // Hide the overlay
    });

})();
