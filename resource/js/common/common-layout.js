



document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav__item');

  navItems.forEach(item => {
    item.addEventListener('click', function(event) {
      navItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherMenu = otherItem.querySelector('.dropdown-menu');
          if (otherMenu) {
            otherMenu.style.display = 'none';
          }
        }
      });

      const dropdownMenu = this.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
      }
      event.stopPropagation(); 
    });
  });

  document.addEventListener('click', function() {
    navItems.forEach(item => {
      const dropdownMenu = item.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.style.display = 'none';
      }
    });
  });
});




document.addEventListener("DOMContentLoaded", function() {
  const megamenuSubs = document.querySelectorAll('.megamenu-sub.megamenu-sub-mb');

  megamenuSubs.forEach(sub => {
    const hasSubItem = sub.querySelector('.megamenu-sub-item');
    const megamenuLink = sub.previousElementSibling;
    const arrow = megamenuLink.querySelector('.icon-dropdown-arrow');

    sub.style.display = 'none';

    if (hasSubItem && megamenuLink) {
      megamenuLink.classList.add('active');
      if (arrow) {
        arrow.classList.add('rotate');
      }
    }

    if (!hasSubItem && megamenuLink) {
      if (arrow) {
        arrow.classList.add('rotate');
      }

      megamenuLink.addEventListener('click', function(e) {
        const href = megamenuLink.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      });

      megamenuLink.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.menu-mb-item.dropdown').forEach(function(item) {
      item.addEventListener('click', function() {
          const menuList = this.nextElementSibling;
          if (menuList.classList.contains('open')) {
              menuList.style.height = menuList.scrollHeight + 'px';
              setTimeout(() => {
                  menuList.style.height = '0';
                  menuList.style.opacity = '0';
              }, 10);
              setTimeout(() => {
                  menuList.classList.remove('open');
                  menuList.style.display = 'none';
              }, 510);
          } else {
              menuList.style.display = 'block';
              setTimeout(() => {
                  menuList.style.height = menuList.scrollHeight + 'px';
                  menuList.style.opacity = '1';
              }, 10);
              setTimeout(() => {
                  menuList.classList.add('open');
                  menuList.style.height = 'auto';
              }, 510);
          }
      });
  });
});

function toggleDropdownMegamenu(element) {
  const megamenuSub = element.nextElementSibling;

  document.querySelectorAll('.megamenu-sub').forEach(sub => {
    if (sub !== megamenuSub) {
      sub.style.display = "none";
      sub.previousElementSibling.classList.remove("active");
    }
  });

  // Đóng hoặc mở menu hiện tại
  if (megamenuSub.style.display === "block") {
    megamenuSub.style.display = "none";
    element.classList.remove("active");
  } else {
    megamenuSub.style.display = "block";
    element.classList.add("active");
  }
}




/****************button scroll-top*****************/
document.addEventListener("scroll", function() {
  var btn = document.querySelector(".btn-top-container");
  if (window.scrollY > 500) {
      btn.classList.add("show");
  } else {
      btn.classList.remove("show");
  }
});

/*******************************************************/


document.querySelectorAll('.megamenu-link').forEach(link => {
  const megamenuSub = link.nextElementSibling;
  
  if (megamenuSub) {
    const subItems = megamenuSub.querySelectorAll('.megamenu-sub-item');
    
    if (subItems.length === 0) {
      megamenuSub.style.display = 'none';
      
      const arrow = link.querySelector('.icon-dropdown-arrow');
      if (arrow) {
        arrow.classList.add('rotate');
      }
    }
  }
});


document.querySelector('.menu-mb-list').classList.toggle('open');

function toggleDropdown(element) {
    const dropdownContent = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    element.classList.toggle('active'); 
    if(element.classList.contains('active')) {
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px"; 
        arrow.classList.add('arrow-down');
    } else{
        dropdownContent.style.maxHeight = 0; 
        arrow.classList.remove('arrow-down');
    }
}
function toggleDropdownMegamenu(element) {
    const arrow = element.querySelector('.icon-dropdown-arrow');
    arrow.classList.toggle('rotate');
}

const toggle = document.querySelector(".menu-container");
const menuMega = document.querySelector(".megamenu");
const closeMega = document.querySelector(".megamenu .megamenu-close");
$(document).ready(function () { 
    const listTabs = document.querySelectorAll('.tabs-container .tab')
    listTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.dataset.tab;
            const tabContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
            const tabParent = this.closest('.tabs-container');

            tabParent.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            tabParent.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            this.classList.add('active');
        });
    })
   
if (toggle && menuMega) {
  
  toggle.addEventListener("click", (e) => {
    console.log("aaaha")
    menuMega.classList.toggle("show");
  });
}

if (closeMega && menuMega) {
  closeMega.addEventListener("click", (e) => {
    menuMega.classList.remove("show");
  });
}
})


const listDr = document.querySelectorAll(".megamenu-item");

listDr.forEach((ele, i) => {
  const megamenuLink = ele.querySelector(".megamenu-link");
  const megamenuSub = ele.querySelector(".megamenu-sub");
  
  megamenuLink.addEventListener("click", (e) => {
    const hasSubLinks = megamenuSub && megamenuSub.querySelectorAll(".megamenu-sub-link").length > 0;

    if (!hasSubLinks) {

      return;
    }

    e.preventDefault();
    megamenuLink.classList.toggle("active");
    $(megamenuSub).stop().slideToggle(300, "linear");
  });
});








const menuMBItems = document.querySelectorAll('.menu-mb-item.dropdown');

menuMBItems.forEach(item => {
  const link = item.querySelector('.menu-mb-link');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const submenu = item.querySelector('.menu-mb-list');
    if (submenu) {
      submenu.classList.toggle('open');
    }
  });
});

const menuMBLinks = document.querySelectorAll('.menu-mb-link');

menuMBLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      link.nextElementSibling.querySelector('.icon-dropdown-arrow').classList.toggle('rotate');
    } else {
      return;
    }

    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains('menu-mb-list')) {
      submenu.classList.toggle('open');
    }
  });
});


document.addEventListener('click', (e) => {
  if (menuMB.classList.contains('active')) {
    if (!menuMB.contains(e.target) && !toggle.contains(e.target)) {
      menuMB.classList.remove('active');
      if (bgFade) {
        bgFade.classList.remove('active');
      }
    }
  }
});


const menuMB = document.querySelector(".menu-mb");
const bgFade = document.querySelector(".bg-fade");
const closeMB = document.querySelector(".menu-mb .close-icon");



if (toggle && menuMB) {
  toggle.addEventListener("click", (e) => {
    menuMB.classList.toggle("active");

    if (bgFade) {
      bgFade.classList.toggle("active");
    }
  });
}

if (closeMB && menuMB) {
  closeMB.addEventListener("click", (e) => {
    menuMB.classList.remove("active");

    if (bgFade) {
      bgFade.classList.remove("active");
    }
  });
}

document.querySelectorAll('.banner-tabs-container .banner-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    const tabId = this.dataset.tab;
    const tabParent = this.closest('.banner-tabs-container');

    tabParent.querySelectorAll('.banner-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    tabParent.querySelectorAll('.banner-tab-content').forEach(content => {
      content.classList.remove('active');
    });

    this.classList.add('active');
  })
})

document.querySelector('.btn-top').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})