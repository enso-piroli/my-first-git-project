let imageArray = ["../images/apple-logo.jpg", "../images/iphone.png"]; // Your image sources
let currentIndex = 0;

let img = document.querySelector(".img-visual-container");
let rightArrow = document.querySelector(".arrow-right");
let leftArrow = document.querySelector(".arrow-left");

rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imageArray.length;
    changeImageWithFade(currentIndex);
});

leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    changeImageWithFade(currentIndex);
});

function changeImageWithFade(index) {
    // Fade out the image
    img.style.opacity = 0;

    // Wait for the fade-out to complete before changing the source
    setTimeout(() => {
        img.src = imageArray[index];

        // Fade back in
        img.style.opacity = 1;
    }, 500); // 500ms matches the CSS transition time
}

changeImageWithFade(currentIndex);