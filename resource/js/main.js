let autoSlideInterval;
let totalImages;
let timeoutId;
document.addEventListener("DOMContentLoaded", function () {
    let currentIndexBanner = 0;
    const images = document.querySelectorAll('.banner-img');
    let clonedImages = document.querySelectorAll('.banner-img .cloned');
    totalImages = images.length - clonedImages.length;
    const updateSliderCount = () => {
        const sliderCount = document.querySelector('.slider-count');

        sliderCount.textContent = `${currentIndexBanner + 1}/${totalImages}`;
    };

    const updateSliderLine = () => {
        const sliderLine = document.querySelector('.slider-line-vertical');
        const progress = (currentIndexBanner + 1) / totalImages * 100;
        sliderLine.innerHTML = `<div class="current" style="height: ${progress}%;"></div>`;
    };
    $('.banner-grp-carousel').owlCarousel({
        loop: true,
        nav: false,
        touchDrag: false,
        mouseDrag: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
        onInitialized: function (event) {
            updateSliderCount()
            updateSliderLine()
        },
        onTranslated: function (event) {
            currentIndexBanner = event.page.index;
            updateSliderCount()
            updateSliderLine()
        }
    })






    document.querySelector('.arrow-next').addEventListener('click', () => {
        $('.banner-grp-carousel').trigger('prev.owl.carousel');

        currentIndexBanner = (currentIndexBanner + 1) % totalImages;

    });

    document.querySelector('.arrow-prev').addEventListener('click', () => {
        $('.banner-grp-carousel').trigger('next.owl.carousel');

        currentIndexBanner = (currentIndexBanner - 1 + totalImages) % totalImages;

    });

    document.querySelector('.arrow-play').addEventListener('click', () => {
        $('.banner-grp-carousel').trigger('stop.owl.autoplay');
        document.querySelector('.arrow-play').style.display = 'none';
        document.querySelector('.arrow-stop').style.display = 'block';
    });

    document.querySelector('.arrow-stop').addEventListener('click', () => {
        $('.banner-grp-carousel').trigger('play.owl.autoplay', [3000]);
        document.querySelector('.arrow-stop').style.display = 'none';
        document.querySelector('.arrow-play').style.display = 'block';
    });
});


window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**********************************************************************************************/


document.querySelectorAll('.main-menu ul li').forEach(item => {
    item.addEventListener('click', () => {
        const submenu = item.querySelector('.sub-menu');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});


/*--------------------third-content------------------------------- */
$('.third-content-container').owlCarousel({
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout:3000,
    margin: 50,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
// Listen to slide change of carousel
let previousSlide = 0; // Initialize previousSlide outside the event handler

$('.third-content-container').on('changed.owl.carousel', function (event) {
    var carousel = event.relatedTarget;
    var activeIndex = carousel.relative(carousel.current());
    $('.third-slide-item').removeClass('active');
    $('.third-slide-item').eq(activeIndex).addClass('active');

});

let autoplayState = true;
let autoplayStateFourth = true;
const autoplayDelay = 3000;

const handleAutoPlay = () => {
    const owl = $('.third-content-container');
    autoplayState = !autoplayState;
    const thirdPlayButton = document.querySelector('.control-button img')
    if (autoplayState) {
        owl.trigger('play.owl.autoplay', [autoplayDelay]);
        console.log(thirdPlayButton)
        thirdPlayButton.src = '/resource/image/main/third-slide-pause.png'
    } else {
        owl.trigger('stop.owl.autoplay');
        thirdPlayButton.src = '/resource/image/main/third-slide-replay.png'
    }

};

$(document).ready(function () {
    const listSlideItem = document.querySelectorAll('.third-slide-item');
    listSlideItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            $('.third-content-container').trigger('to.owl.carousel', index);
        })
    })

    const listSlideControlItem = document.querySelectorAll('.slide-control-item');
    listSlideControlItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            $('.fourth-section-container').trigger('to.owl.carousel', index);
        })
    })
})


/* fourth section */
$(document).ready(function () {
    $('.fourth-section-container').owlCarousel({
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        responsiveBaseElement: '.fourth-section-container',
        center: true, // Center the active item
        autoplay: true,
        autoplayTimeout:3000,
        responsive: {
            0: {
                margin: 2,
                mouseDrag: true,
                touchDrag: true,
                items: 1
            },
            768: {
                margin: -20,
                items: 1
            },
            1000: {
                margin:60,
                items: 1
            },
            1320: {
                margin:80,
                items: 1
            }
        },
        onInitialized: function (event) {
            // Add classes to the previous and next items
            $('.fourth-section-container .owl-item.active').prev().addClass('prev-slide');
            $('.fourth-section-container .owl-item.active').next().addClass('next-slide');
            updateControlItems(event);

        },
        onTranslated: function (event) {
            // Remove classes
            $('.fourth-section-container .owl-item').removeClass('prev-slide next-slide');
            // Add classes to the previous and next items
            $('.fourth-section-container .owl-item.active').prev().addClass('prev-slide');
            $('.fourth-section-container .owl-item.active').next().addClass('next-slide');
            updateControlItems(event);

        }
    });
});
const handleAutoPlayFourthSlide = () => {
    const owl = $('.fourth-section-container');
    autoplayStateFourth = !autoplayStateFourth;
    const iconPlay = document.querySelector('.slide-control-toggle')
    if (autoplayStateFourth) {
        owl.trigger('play.owl.autoplay', [autoplayDelay]);
        iconPlay.style.background = `url(/resource/image/main/main-pause-icon.png) no-repeat center`
    } else {
        owl.trigger('stop.owl.autoplay');
        iconPlay.style.background = `url(/resource/image/main/main-replay-icon.png) `

    }
}
function updateControlItems(event) {
    var carousel = event.relatedTarget;
    var activeIndex = carousel.relative(carousel.current());
    $('.slide-control-item').removeClass('active');
    $('.slide-control-item').eq(activeIndex).addClass('active');
}





/* fifth section */
$(document).ready(function () {
    $('.fifth-slide-icons').owlCarousel({
        autoWidth: true,
        touchDrag: false,
        mouseDrag: false,
        responsiveBaseElement: ".fifth-slide-icons",
        responsive: {
            0: {
                margin: -80,
                items: 1
            },
            360: {
                margin: -65,
                items: 1
            },
            540: {
                margin: -30,
                gap: 20,
                items: 1
            },
            768: {
                margin: 0,
                items: 3,
            },
            1000: {
                margin: 40,
                items: 3
            }
        },
    })
    $('.fifth-slide-wrapper.owl-carousel').owlCarousel({
        loop: true,
        autoWidth: true,
        autoplay: true, 
        autoplayTimeout:3000,
        responsiveClass: true,
        responsiveBaseElement: ".fifth-slide-wrapper",
        responsive: {
            0: {
                margin: -80,
                items: 1
            },
            360: {
                margin: -65,
                items: 1
            },
            540: {
                margin: -30,
                gap: 20,
                items: 1
            },
            768: {
                margin: 0,
                items: 3,
            },
            1000: {
                margin: 40,
                items: 3
            }
        },
        onInitialized: function (event) {
            updateProgressBar(event);


        },
        onTranslated: function (event) {
            updateProgressBar(event);

        },
        onResized: function (event) {
            console.log(event)
            trackSlideWidth(event);
        }
    })
    function updateProgressBar(event) {
        if (event.page.index == -1) {
            activeLevelBar.style.width = '20%';
            return;
        }
        const activeIndex = event.page.index;
        const totalItems = event.item.count;
        const progressBar = document.querySelector('.fifth-active-bar');
        progressBar.style.width = `${((activeIndex + 1) / totalItems) * 100}%`;
    }
    function trackSlideWidth(event) {
        const slideWidth = event.relatedTarget._widths[0] // Get the width of a slide

        document.querySelectorAll('.fifth-icon-item').forEach(item => {
            item.style.minWidth = 'unset'
            item.style.width = `${slideWidth}px`
        })
    }

})

let activeLevelBar = document.querySelector('.fifth-active-bar')

let currentIndex = 0;


document.querySelector('.fifth-next').addEventListener('click', () => {
    $('.fifth-slide-wrapper').trigger('next.owl.carousel');
});
document.querySelector('.fifth-prev').addEventListener('click', () => {
    $('.fifth-slide-wrapper').trigger('prev.owl.carousel');
});




$(".seventh-carousel.owl-carousel").owlCarousel({
    loop: true,
    autoWidth: true,
    responsiveBaseElement: ".seventh-carousel",
    autoplay: true,
    center: true,
    autoplayTimeout:3000,
    responsive: {
        0: {
            mouseDrag: true,
            touchDrag: true,
            margin: 10,
            items: 1
        },
        400: {
            mouseDrag: true,
            touchDrag: true,
            margin: 20,
            items: 1
        },
        768: {
            margin: 20,
            items: 1,
            mouseDrag: false,
            touchDrag: false
        },
        1000: {
            mouseDrag: false,
            touchDrag: false,
            margin: 20,
            items: 1.5
        },
        1400: {
            mouseDrag: false,
            touchDrag: false,
            margin: 40,
            items: 1.1
        },
        1537: {
            mouseDrag: false,
            touchDrag: false,
            margin: 60,
            items: 2
        }
    },
});
$(window).on('resize', function () {


});
$(document).ready(function () {
    $(".seventh-carousel .item").click(function () {
        if (!$(this).hasClass("active")) {
            $(".seventh-carousel .item").removeClass("active");
            $(this).addClass("active");
        }
    });
});


// const handleTranslated = (event) => {
//     activeIndex = event.item.index;
//     updateActiveClass();
//     updateTransform();
// };
// let activeIndex = 0;

// const handlePrevSeventhSlide = () => {
//     const owl = $('.seventh-carousel');
//     owl.trigger('prev.owl.carousel', [500]);
// };

// const handleNextSeventhSlide = () => {
//     const owl = $('.seventh-carousel');
//     owl.trigger('next.owl.carousel', [500]);
// };




// const updateActiveClass = () => {
//     document.querySelectorAll('.seventh-carousel .item').forEach((item, index) => {
//         if (index === activeIndex) {
//             item.classList.add('active');
//         } else {
//             item.classList.remove('active');
//         }
//     });
// };

// const updateTransform = () => {
//     const owlInstance = $('.seventh-carousel').data('owl.carousel');
//     const margin = owlInstance.settings.margin || 0;

//     const itemWidth = document.querySelector('.seventh-carousel .owl-stage-outer .owl-stage .owl-item').getBoundingClientRect().width; 
//     document.querySelector('.seventh-carousel .owl-stage-outer .owl-stage').style.transform = `translate3d(-${(itemWidth + margin) * activeIndex}px, 0, 0)`;
// };


function toggleDropdown(element) {
    element.classList.toggle('active');
    var content = element.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function toggleDropdown(element) {
    const dropdownContent = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');

    if (dropdownContent.style.maxHeight) {
        dropdownContent.style.maxHeight = null; 
        arrow.classList.remove('arrow-down'); 
    } else {
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px"; 
        arrow.classList.add('arrow-down'); 
    }
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
    });

    item.addEventListener('mouseleave', function () {
        const dropdown = this.querySelector('.dropdown-menu');
        if (dropdown) {
            timeoutId = setTimeout(() => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-20px)';
            }, 50);
        }
    });
});


let autoplayTimeout;
let userInteraction = false;

function stopAutoplay() {
  clearTimeout(autoplayTimeout);
  $('.fifth-slide-wrapper.owl-carousel').trigger('stop.owl.autoplay');
  userInteraction = true;
}

function restartAutoplay() {
  clearTimeout(autoplayTimeout);
  autoplayTimeout = setTimeout(() => {
      userInteraction = false;
      $('.fifth-slide-wrapper.owl-carousel').trigger('play.owl.autoplay');
  }, 1000);
}

function updateSlidePositionAutoPlay(event) {
  const totalSlides = event.item.count;
  let currentSlide = (event.item.index - event.relatedTarget._clones.length / 2) % totalSlides;
  currentSlide = currentSlide >= 0 ? currentSlide : totalSlides - 1;
  if (!userInteraction) {
      restartAutoplay();
  }
}

$('.fifth-prev').click(function () {
  stopAutoplay();
  $('.fifth-slide-wrapper.owl-carousel').trigger('prev.owl.carousel');
  restartAutoplay();
});

$('.fifth-next').click(function () {
  stopAutoplay();
  $('.fifth-slide-wrapper.owl-carousel').trigger('next.owl.carousel');
  restartAutoplay();
});

let autoplayTimeout1;
let userInteraction1 = false;

function stopAutoplay() {
  clearTimeout(autoplayTimeout1);
  $('.fourth-section-container.owl-carousel').trigger('stop.owl.autoplay');
  userInteraction1 = true;
}

function restartAutoplay() {
  clearTimeout(autoplayTimeout1);
  autoplayTimeout1 = setTimeout(() => {
      userInteraction1 = false;
      $('.fourth-section-container.owl-carousel').trigger('play.owl.autoplay');
  }, 1000);
}

function updateSlidePositionAutoPlay(event) {
  const totalSlides = event.item.count;
  let currentSlide = (event.item.index - event.relatedTarget._clones.length / 2) % totalSlides;
  currentSlide = currentSlide >= 0 ? currentSlide : totalSlides - 1;
  if (!userInteraction1) {
      restartAutoplay();
  }
}

$('.prev-button').click(function () {
  stopAutoplay();
  $('.fourth-section-container.owl-carousel').trigger('prev.owl.carousel');
  restartAutoplay();
});

$('.next-button').click(function () {
  stopAutoplay();
  $('.fourth-section-container.owl-carousel').trigger('next.owl.carousel');
  restartAutoplay();
});

let autoplayTimeout2;
let userInteraction2 = false;

function stopAutoplay() {
  clearTimeout(autoplayTimeout2);
  $('.seventh-carousel.owl-carousel').trigger('stop.owl.autoplay');
  userInteraction2 = true;
}

function restartAutoplay() {
  clearTimeout(autoplayTimeout2);
  autoplayTimeout2 = setTimeout(() => {
      userInteraction2 = false;
      $('.seventh-carousel.owl-carousel').trigger('play.owl.autoplay');
  }, 1000);
}

function updateSlidePositionAutoPlay(event) {
  const totalSlides = event.item.count;
  let currentSlide = (event.item.index - event.relatedTarget._clones.length / 2) % totalSlides;
  currentSlide = currentSlide >= 0 ? currentSlide : totalSlides - 1;

  if (!userInteraction2) {
      restartAutoplay();
  }
}

$('.seventh-prev').click(function () {
  stopAutoplay();
  $('.seventh-carousel.owl-carousel').trigger('prev.owl.carousel');

  restartAutoplay();
});

$('.seventh-next').click(function () {
  stopAutoplay();
  $('.seventh-carousel.owl-carousel').trigger('next.owl.carousel');

  restartAutoplay();
});
