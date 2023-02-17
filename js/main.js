// Removes selected class from tabs that have it
function resetSelection(home, about, work, contact) {
    if(home.classList.contains("selected")) { home.classList.remove("selected"); }
    if(about.classList.contains("selected")) { about.classList.remove("selected"); }
    if(work.classList.contains("selected")) { work.classList.remove("selected"); }
    if(contact.classList.contains("selected")) { contact.classList.remove("selected"); }
}

// Picks selection to be displayed on nav
function pickClass(home, about, work, contact) {

    // Determines location of different parts of page
    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var aboutScroll = document.getElementById("home").getBoundingClientRect().height - 125 - 56;
    var workScroll = aboutScroll + document.getElementById("about").getBoundingClientRect().height;
    var contactScroll = workScroll + document.getElementById("work").getBoundingClientRect().height - 125;

    // Resets and chooses new nav selection
    if(scroll < aboutScroll) {
        if(!home.classList.contains("selected")) {
            resetSelection(home, about, work, contact);
            home.classList.add("selected");
        }
    } else if(scroll < workScroll) {
        if(!about.classList.contains("selected")) {
            resetSelection(home, about, work, contact);
            about.classList.add("selected");
        }
    } else if(scroll < contactScroll) {
        if(!work.classList.contains("selected")) {
            resetSelection(home, about, work, contact);
            work.classList.add("selected");
        }
    } else {
        if(!contact.classList.contains("selected")) {
            resetSelection(home, about, work, contact);
            contact.classList.add("selected");
        }
    }
}

// On page load determine current nav selection
document.addEventListener("DOMContentLoaded", (event) => {

    // Fetches nav links
    let home = document.getElementById("homeLink");
    let about = document.getElementById("aboutLink");
    let work = document.getElementById("workLink");
    let contact = document.getElementById("contactLink");
    pickClass(home, about, work, contact);

    // Scroll behavior
    window.addEventListener('scroll', function(e) {
        pickClass(home, about, work, contact);
    });
})
