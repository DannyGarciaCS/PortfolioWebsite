
// On page load
document.addEventListener("DOMContentLoaded", (event) => {

    // When viewport intersects spwn element
    let timer = 0;
    let intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {

                // Play show animation on an increasing delay
                setTimeout(function() { entry.target.classList.add("show") }, timer);
                timer += 50;
                intersectionObserver.unobserve(entry.target);
                setTimeout(function() { timer = 0; }, 1000)
            }
        })
    })

    // Observes all spawn objects
    document.querySelectorAll(".spawn").forEach(obj => {
        intersectionObserver.observe(obj);
    });
})
