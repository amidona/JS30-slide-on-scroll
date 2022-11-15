function debounce(func, wait = 20, immediate = true) {
    //debounce prevents the event from logging continuously, so this used below means the event listener is only firing every 20 miliseconds, otherwise you're going to be overrun with events (it'll trigger 50 times in the second it takes you to scroll from the top of the page to the bottom)
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
    //console.log(window.scrollY); - this tells you how much you're scrolled down, based off the very top of the browser (i.e. the height of the very top of the page as you scroll)
    sliderImages.forEach(sliderImage => {
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2; 
        // (window.scrollY + window.innerHeight) gives you how far you've scrolled but based on the bottom of the screen. Full calculation will give you the point at which you're halfway through the image, i.e., when you want the image to start sliding in
        
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // this gives you the pixel level of the bottom of each image, so we can work the animation whether we're going up or down

        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add("active");
        } else {
            sliderImage.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", debounce(checkSlide));

