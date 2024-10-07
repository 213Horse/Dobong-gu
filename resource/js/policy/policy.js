/*******************tab-table-mobile********************/
let stateAutoplay = true
function toggleDetails1(rowItem) {
  let itemDetails = rowItem.querySelector('.item-details');
  let linkCount = itemDetails.querySelectorAll('a').length;

  if (linkCount === 0) {
      $('#popup').fadeIn();
      return;
  }

  if (rowItem.classList.contains('active')) {
      rowItem.classList.remove('active');
      itemDetails.style.display = 'none';
  } else {
      document.querySelectorAll('.row-item').forEach(item => {
          item.classList.remove('active');
          item.querySelector('.item-details').style.display = 'none'; 
      });

      rowItem.classList.add('active');
      itemDetails.style.display = 'block';
  }
}

function updateItemTitleWithCount() {
  $('.row-item').each(function() {
      let itemDetails = $(this).find('.item-details');
      
      let count = itemDetails.find('a').length;

      if (count > 0) {
          $(this).find('.item-title').append(' (' + count + ')');
      }
  });
}

$(document).ready(function() {
  updateItemTitleWithCount();
});




/*************count and open popop and table desktop**********/
function toggleDetails(row) {
  let detailsRow = row.nextElementSibling;
  const textColorRedSpan = row.querySelector('.text-color-red');
  
  if (!textColorRedSpan || textColorRedSpan.style.display === 'none') {
      $('#popup').fadeIn();
      return;
  }

  if (detailsRow && detailsRow.classList.contains('details-row')) {
      const detailsCount = row.querySelector('.details-count');
      const count = parseInt(detailsCount.textContent);

      if (count === 0) {
          $('#popup').fadeIn();
      } else {
          detailsRow.style.display = detailsRow.style.display === 'table-row' ? 'none' : 'table-row';
      }
  }
}



$(document).on('click', '.tab-content a, .item-details a', function (e) {
  e.preventDefault();
  $('#popup').fadeIn();
});



function updateDetailsCount() {
  const rows = document.querySelectorAll('.table-row');

  rows.forEach(row => {
      const detailsRow = row.nextElementSibling;
      if (detailsRow && detailsRow.classList.contains('details-row')) {
          const detailsContent = detailsRow.querySelector('.details-content .tab-content');
          const count = detailsContent ? detailsContent.querySelectorAll('a').length : 0;
          
          const textColorRedSpan = row.querySelector('.text-color-red');
          if (textColorRedSpan) {
              if (count === 0) {
                  textColorRedSpan.style.display = 'none';
              } else {
                  textColorRedSpan.style.display = '';
                  row.querySelector('.details-count').textContent = count;
              }
          }

          if (count === 0) {
              detailsRow.style.display = 'none';
          }
      }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateDetailsCount();
  $('#popup').fadeOut();
});



/**********popup************/


$('.show-popup').click(function () {
  $('#popup').fadeIn();
});

$('#closePopupBtn').click(function () {
  $('#popup').fadeOut();
});

$(window).click(function (event) {
  if ($(event.target).is('#popup')) {
    $('.main-popup').scrollTop(0)
      $('#popup').fadeOut();
  }
});


$(document).ready(function () {
  $(".carousel-container-content .owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: false,
      dotsData: true,
      items: 1,
      navText: [$('.custom-nav-pre'), $('.custom-nav-next')],
      autoplay: false,
      autoplayTimeout: 3000,
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
  });
  $(".carousel-container .owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 3000,
      onTranslated: updateSlidePositionAutoPlay,
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
  });
});


$(document).on('click', '.carousel-container-content .owl-carousel .owl-dot', function () {
  let owl = $('.carousel-container-content .owl-carousel');
  owl.trigger('to.owl.carousel', [$(this).index(), 300]);
  $('.carousel-container-content .owl-carousel .owl-dot').removeClass('active');
  $(this).addClass('active');
});
let autoplayTimeout;
let userInteraction = false;

function stopAutoplay() {
  clearTimeout(autoplayTimeout);
  $('.carousel-container .owl-carousel').trigger('stop.owl.autoplay');
  userInteraction = true;
}

function restartAutoplay() {
  clearTimeout(autoplayTimeout);
  autoplayTimeout = setTimeout(() => {
      userInteraction = false;
      $('.carousel-container .owl-carousel').trigger('play.owl.autoplay');
  }, 1000);
}

function updateSlidePositionAutoPlay(event) {
  const totalSlides = event.item.count;
  let currentSlide = (event.item.index - event.relatedTarget._clones.length / 2) % totalSlides;
  currentSlide = currentSlide >= 0 ? currentSlide : totalSlides - 1;

  $('.slide-position').html(`${currentSlide + 1} <span class="count-slide">/ ${totalSlides}</span>`);

  $('#carousel-dots-mobile .owl-dot').removeClass('active');
  $('#carousel-dots-mobile .owl-dot').eq(currentSlide).addClass('active');

  if (!userInteraction) {
      restartAutoplay();
  }
}

$('.am-prev').click(function () {
  stopAutoplay();
  $('.carousel-container .owl-carousel').trigger('prev.owl.carousel');
  updateSlidePositionAfterManual();
  restartAutoplay();
});

$('.am-next').click(function () {
  stopAutoplay();
  $('.carousel-container .owl-carousel').trigger('next.owl.carousel');
  updateSlidePositionAfterManual();
  restartAutoplay();
});

function updateSlidePositionAfterManual() {
  const owl = $('.carousel-container .owl-carousel').data('owl.carousel');
  const totalSlides = owl.items().length;
  let currentSlide = owl.relative(owl.current());

  $('#carousel-dots-mobile .owl-dot').removeClass('active');
  $('#carousel-dots-mobile .owl-dot').eq(currentSlide).addClass('active');
}

$('#carousel-dots-mobile .owl-dot').click(function () {
  stopAutoplay();
  let owl = $('.carousel-container .owl-carousel');
  let index = $(this).index();
  owl.trigger('to.owl.carousel', [index, 300]);

  $('#carousel-dots-mobile .owl-dot').removeClass('active');
  $(this).addClass('active');

  restartAutoplay();
});

$('#pause').on('click', function () {
  if (stateAutoplay) {
      $('.carousel-container .owl-carousel').trigger('stop.owl.autoplay');
  } else {
      $('.carousel-container .owl-carousel').trigger('play.owl.autoplay');
  }
  stateAutoplay = !stateAutoplay;

  // Đổi ảnh cho nút pause
  let currentImage = $(this).css('background-image');
  if (currentImage.includes('/resource/image/share-component/policy-popup/images/carousel-pause.png')) {
      $(this).css('background-image', 'url("/resource/image/share-component/policy-popup/images/carousel-replay.png")');
  } else {
      $(this).css('background-image', 'url("/resource/image/share-component/policy-popup/images/carousel-pause.png")');
  }
});

$('.icon-heart-popup').click(function () {
  var currentImage = $(this).css('background-image');
  if (currentImage.includes('/resource/image/policy/icon/icon-heart-fill.png')) {
      $(this).css('background-image', 'url("/resource/image/policy/icon/gray-heart-iconnew.png")');
  } else {
      $(this).css('background-image', 'url("/resource/image/policy/icon/icon-heart-fill.png")');
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".policy-detail-search");
  const dropdown = document.querySelector(".conditional-detail-search");
  const searchContainer = document.querySelector(".policy-table-search");

  toggleButton.addEventListener("click", function () {
    toggleButton.classList.toggle("active");
    if (dropdown.style.display == "" || dropdown.style.display == "none") {
      dropdown.style.display = "flex";
    } else {
      dropdown.style.display = "none";
    }
    dropdown.style.width = "100%";
  });

  let listConditionSearch = [];
  let conditionChosenItems = document.querySelector(".condition-chosen-items");
  let conditionSearchChosenWrapper = document.querySelector(
    ".condition-search-chosen-wrapper"
  );
  const searchConditionList = document.querySelector(".condition-search-list");

  if (listConditionSearch.length === 0) {
    conditionSearchChosenWrapper.style.display = "none";
    searchConditionList.style.display = "none";
  }

  let objectiveItems = document.querySelectorAll(".objective-item");
  let areaItems = document.querySelectorAll(".area-item");

  function updateConditionChosenItems() {
    let innerHTML = "";
    listConditionSearch.forEach((conditionObj, index) => {
      innerHTML += `<li class="condition-chosen-item">
                          <span>${conditionObj.condition}</span>
                          <button onclick="removeItemFromListCondition(${index})"><img src="/resource/image/policy/icon/policy-delete-icon.png" alt="close icon"></button>
                        </li>`;
    });
    conditionChosenItems.innerHTML = innerHTML;

    if (listConditionSearch.length === 0) {
      conditionSearchChosenWrapper.style.display = "none";
      searchConditionList.style.display = "none";
    } else {
      conditionSearchChosenWrapper.style.display = "block";
      searchConditionList.style.display = "flex";
    }
  }

  function removeItemFromListCondition(index) {
    const conditionObj = listConditionSearch[index];
    listConditionSearch.splice(index, 1);

    if (conditionObj.type === "objective") {
      listConditionSearchObjective = listConditionSearchObjective.filter(
        (cond) => cond.condition !== conditionObj.condition
      );
    } else if (conditionObj.type === "area") {
      listConditionSearchArea = listConditionSearchArea.filter(
        (cond) => cond.condition !== conditionObj.condition
      );
    }

    updateConditionChosenItems();

    let items;
    if (conditionObj.type === "objective") {
      items = objectiveItems;
    } else if (conditionObj.type === "area") {
      items = areaItems;
    }

    items.forEach((item) => {
      if (item.textContent === conditionObj.condition) {
        item.classList.remove("active");
        item.classList.remove("active-black");
        item.classList.remove("active-red");
      }
    });
  }

  let listConditionSearchObjective = [];
  let listConditionSearchArea = [];

  function handleItemClick(item, index, items, itemType) {
    if (itemType === "objective") {
      if (index === 0) {
        if (item.classList.contains("active-black")) {
          item.classList.remove("active-black");
          listConditionSearchObjective = [];
        } else {
          listConditionSearchObjective = [{ type: 'objective', condition: item.textContent }];
          updateConditionChosenItems();

          items.forEach((otherItem) => {
            otherItem.classList.remove("active-black");
            otherItem.classList.remove("active-red");
            otherItem.classList.remove("active");
          });

          item.classList.add("active-black");
        }
      } else {
        items[0].classList.remove("active-black");
        listConditionSearchObjective = listConditionSearchObjective.filter(
          (cond) => cond.condition !== items[0].textContent
        );

        if (item.classList.contains("active-red")) {
          item.classList.remove("active-red");
          listConditionSearchObjective = listConditionSearchObjective.filter(
            (cond) => cond.condition !== item.textContent
          );
        } else {
          item.classList.add("active-red");
          listConditionSearchObjective.push({ type: 'objective', condition: item.textContent });
        }
      }
    } else if (itemType === "area") {
      if (index === 0) {
        if (item.classList.contains("active-black")) {
          item.classList.remove("active-black");
          listConditionSearchArea = [];
        } else {
          listConditionSearchArea = [{ type: 'area', condition: item.textContent }];
          updateConditionChosenItems();

          items.forEach((otherItem) => {
            otherItem.classList.remove("active-black");
            otherItem.classList.remove("active-red");
            otherItem.classList.remove("active");
          });

          item.classList.add("active-black");
        }
      } else {
        items[0].classList.remove("active-black");
        listConditionSearchArea = listConditionSearchArea.filter(
          (cond) => cond.condition !== items[0].textContent
        );

        if (item.classList.contains("active-red")) {
          item.classList.remove("active-red");
          listConditionSearchArea = listConditionSearchArea.filter(
            (cond) => cond.condition !== item.textContent
          );
        } else {
          item.classList.add("active-red");
          listConditionSearchArea.push({ type: 'area', condition: item.textContent });
        }
      }
    }

    listConditionSearch = [
      ...listConditionSearchObjective,
      ...listConditionSearchArea,
    ];
    updateConditionChosenItems();
  }

  objectiveItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      handleItemClick(item, index, objectiveItems, "objective");
    });
  });

  areaItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      handleItemClick(item, index, areaItems, "area");
    });
  });

  window.removeItemFromListCondition = removeItemFromListCondition;
});

/*********change icon heath slide*******/
document.querySelectorAll('.heart-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    if (this.getAttribute('data-liked') === 'false') {
      this.classList.add('liked');
      this.setAttribute('data-liked', 'true');
    } else {
      this.classList.remove('liked');
      this.setAttribute('data-liked', 'false');
    }
  });
});

/******************logic dropdown-popup***************/
function selectOption1(element) {
  var selectedText = element.innerText;
  document.getElementById("dropdownButton1").innerHTML = selectedText;
  
  var dropdownContent = element.parentElement;
  dropdownContent.style.display = "none";
}

function selectOption(element) {
  var selectedText = element.innerText;
  document.getElementById("dropdownButton").innerHTML = selectedText + '<img src="/resource/image/policy/icon/down-icon-new.png" class="custom-icon" alt="down arrow">';
  
  var dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.style.display = "none";
}

window.onload = function() {
  var defaultOption1 = document.querySelector(".dropdown-container-policy-moblie .dropdown-content a");
  if (defaultOption1) {
    selectOption1(defaultOption1);
  }
  
  var defaultOption2 = document.querySelector(".dropdown-content a");
  if (defaultOption2) {
    selectOption(defaultOption2);
  }
};

document.getElementById("dropdownButton1").addEventListener("click", function() {
  var dropdownContent = document.querySelector(".dropdown-container-policy-moblie .dropdown-content");
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

document.getElementById("dropdownButton").addEventListener("click", function() {
  var dropdownContent = document.querySelector(".dropdown-content");
  dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

/**************************************************/


/*****************slide policy-core******************/

const cards = [
  {
    img: "/resource/image/policy/dobongsan-mountain.png",
    title: "도봉산 둘레길 2.0 추진",
  },
  {
    img: "/resource/image/policy/employment-support.png",
    title:
      "도봉구 청년 취업지원 및 자립기반 구축 사업 - ① 공공기관 실무형 청년인턴십 운영",
    description: "",
  },
  {
    img: "/resource/image/policy/promotion-support.png",
    title: "재난취약주택 개폐식방법창 및 완강기 무상 설치 지원 사업 추진",
    description: "",
  },
  {
    img: "/resource/image/policy/promotion-support.png",
    title: "재난취약주택 개폐식방법창 및 완강기 무상 설치 지원 사업 추진",
    description: "",
  },
  {
    img: "/resource/image/policy/employment-support.png",
    title:
      "도봉구 청년 취업지원 및 자립기반 구축 사업 - ① 공공기관 실무형 청년인턴십 운영",
    description: "",
  },
  {
    img: "/resource/image/policy/dobongsan-mountain.png",
    title: "도봉산 둘레길 2.0 추진",
  },


];

let currentIndex = 0;
const itemsPerPage = 3;

const cardImages = document.querySelectorAll(".card img");
const cardTitles = document.querySelectorAll(".card-title");
const cardDescriptions = document.querySelectorAll(".card-content p");
const slideCurrent = document.querySelector(".policy-slide-current");
const slideTotal = document.querySelector(".policy-slide-total");
const totalPages = Math.ceil(cards.length / itemsPerPage);
const progressBarLevel = document.querySelector(".slide-progressbar-level");

function updateProgressBar() {
  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;
  const progressPercentage = (currentPage / totalPages) * 100;
  progressBarLevel.style.width = `${progressPercentage}%`;
}
const dots = document.querySelectorAll(".dot");
function createDots() {
  const dotsContainer = document.querySelector(".dots-pagination");
  dotsContainer.innerHTML = "";
  const totalDots = Math.ceil(cards.length / itemsPerPage);

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", handleDotClick);
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const currentPage = Math.floor(currentIndex / itemsPerPage);
  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot, index) => {
    if (index === currentPage) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

createDots();

function updateCards() {
  for (let i = 0; i < itemsPerPage; i++) {
    const cardIndex = (currentIndex + i) % cards.length;
    cardImages[i].src = cards[cardIndex].img;
    cardTitles[i].textContent = cards[cardIndex].title;
    cardDescriptions[i].textContent = cards[cardIndex].description;
  }
  slideCurrent.textContent = Math.floor(currentIndex / itemsPerPage) + 1;
  slideTotal.textContent = totalPages;

  updateDots(); 
}

function updateCards() {
  for (let i = 0; i < itemsPerPage; i++) {
    const cardIndex = (currentIndex + i) % cards.length;
    cardImages[i].src = cards[cardIndex].img;
    cardTitles[i].textContent = cards[cardIndex].title;
    cardDescriptions[i].textContent = cards[cardIndex].description;
  }
  slideCurrent.textContent = Math.floor(currentIndex / itemsPerPage) + 1;
  slideTotal.textContent = totalPages;

  updateDots();
  updateProgressBar();
}

function handlePolicySlideNext() {
  currentIndex = (currentIndex + itemsPerPage) % cards.length;
  updateCards();
  updateProgressBar();
}

function handlePolicySlidePrev() {
  currentIndex = (currentIndex - itemsPerPage + cards.length) % cards.length;
  updateCards();
  updateProgressBar();
}


function handleDotClick(event) {
  const dotIndex = parseInt(event.target.getAttribute("data-index"), 10);
  currentIndex = dotIndex * itemsPerPage;
  updateCards();
}

function handlePolicySlideNext() {
  currentIndex = (currentIndex + itemsPerPage) % cards.length;
  updateCards();
}

function handlePolicySlidePrev() {
  currentIndex = (currentIndex - itemsPerPage + cards.length) % cards.length;
  updateCards();
}

dots.forEach((dot) => {
  dot.addEventListener("click", handleDotClick);
});

let autoplayInterval;
function handlePolicySlideAutoplay() {
  const playButton = document.querySelector(".policy-slide-play img");
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    playButton.src = "/resource/image/policy/icon/play-icon.png";
  } else {
    autoplayInterval = setInterval(handlePolicySlideNext, 5000);
    playButton.src = "/resource/image/policy/icon/pause-icon.png";
  }
}

// Initialize the first state
updateCards();





