
// Fetches nav links
var home = document.getElementById("homeLink");
var about = document.getElementById("aboutLink");
var work = document.getElementById("workLink");
var contact = document.getElementById("contactLink");

// Removes selected class from tabs that have it
function resetSelection() {
    if(home.classList.contains("selected")) { home.classList.remove("selected"); }
    if(about.classList.contains("selected")) { about.classList.remove("selected"); }
    if(work.classList.contains("selected")) { work.classList.remove("selected"); }
    if(contact.classList.contains("selected")) { contact.classList.remove("selected"); }
}

// Scroll behavior
window.addEventListener('scroll', function(e) {

    // Fetches position of sections
    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var aboutScroll = document.getElementById("home").getBoundingClientRect().height - 125 - 56;
    var workScroll = aboutScroll + document.getElementById("about").getBoundingClientRect().height;
    var contactScroll = workScroll + document.getElementById("work").getBoundingClientRect().height;

    // Changes tab selection based on scroll position
    if(scroll < aboutScroll) {
        resetSelection();
        home.classList.add("selected");
    } else if(scroll < workScroll) {
        resetSelection();
        about.classList.add("selected");
    } else if(scroll < contactScroll) {
        resetSelection();
        work.classList.add("selected");
    } else {
        resetSelection();
        contact.classList.add("selected");
    }
});

// Code repeated to initialize while respecting scope
var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
var aboutScroll = document.getElementById("home").getBoundingClientRect().height - 125 - 56;
var workScroll = aboutScroll + document.getElementById("about").getBoundingClientRect().height;
var contactScroll = workScroll + document.getElementById("work").getBoundingClientRect().height - 125;

if(scroll < aboutScroll) {
    resetSelection();
    home.classList.add("selected");
} else if(scroll < workScroll) {
    resetSelection();
    about.classList.add("selected");
} else if(scroll < contactScroll) {
    resetSelection();
    work.classList.add("selected");
} else {
    resetSelection();
    contact.classList.add("selected");
}


