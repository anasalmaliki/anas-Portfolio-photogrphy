let listf = document.querySelector('.sliderf .listf');
let itemsf = document.querySelectorAll('.sliderf .listf .itemf');
let dotsf = document.querySelectorAll('.sliderf .dotsf li');
let prevf = document.getElementById('prevf');
let nextf = document.getElementById('nextf');

let activef = 0;
let lengthitemsf = itemsf.length - 1;
let refreshsliderf; // Rename the variable

nextf.onclick = function () {
    if (activef + 1 > lengthitemsf) {
        activef = 0;
    } else {
        activef = activef + 1;
    }
    reloadSliderf();
};

prevf.onclick = function () {
    if (activef - 1 < 0) {
        activef = lengthitemsf;
    } else {
        activef = activef - 1;
    }
    reloadSliderf();
};

function reloadSliderf() {
    let checkLeft = itemsf[activef].offsetLeft;
    listf.style.left = -checkLeft + 'px';

    let lastactivefDot = document.querySelector('.sliderf .dotsf li.activef');
    lastactivefDot.classList.remove('activef'); // Fix typo
    dotsf[activef].classList.add('activef'); // Fix typo

    clearInterval(refreshsliderf); // Clear the interval using the correct variable
    refreshsliderf = setInterval(() => { nextf.click(); }, 5000);
}

dotsf.forEach((li, key) => {
    li.addEventListener('click', function () { // Fix typo
        activef = key;
        reloadSliderf();
    });
});

// Initial interval setup
refreshsliderf = setInterval(() => { nextf.click(); }, 5000);
