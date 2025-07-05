let menuIcon = document.querySelector('.menu-icon');
let hambergerIcon = document.querySelector('.hamberger-icon');
let crossIcon = document.querySelector('.cross-icon');
let dropDown = document.querySelector('.drop-down');

menuIcon.addEventListener('click', () => {
    hambergerIcon.classList.toggle('enable');
    hambergerIcon.classList.toggle('disable');
    crossIcon.classList.toggle('enable');
    crossIcon.classList.toggle('disable');
    dropDown.classList.toggle('enable');
    dropDown.classList.toggle('disable');
})