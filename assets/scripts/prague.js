// -------------- КНОПКА ВВЕРХ ------------------

const btnUp = {
  el: document.querySelector(".btn-up"),
  scrolling: false,
  show() {
    if (
      this.el.classList.contains("btn-up_hide") &&
      !this.el.classList.contains("btn-up_hiding")
    ) {
      this.el.classList.remove("btn-up_hide");
      this.el.classList.add("btn-up_hiding");
      window.setTimeout(() => {
        this.el.classList.remove("btn-up_hiding");
      }, 300);
    }
  },
  hide() {
    if (
      !this.el.classList.contains("btn-up_hide") &&
      !this.el.classList.contains("btn-up_hiding")
    ) {
      this.el.classList.add("btn-up_hiding");
      window.setTimeout(() => {
        this.el.classList.add("btn-up_hide");
        this.el.classList.remove("btn-up_hiding");
      }, 300);
    }
  },
  addEventListener() {
    // при прокрутке окна (window)
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (this.scrolling && scrollY > 0) {
        return;
      }
      this.scrolling = false;
      // если пользователь прокрутил страницу более чем на 200px
      if (scrollY > 400) {
        this.show(); // сделаем кнопку .btn-up видимой
      } else {
        this.hide(); // иначе скроем кнопку .btn-up
      }
    });
    // при нажатии на кнопку .btn-up
    document.querySelector(".btn-up").onclick = () => {
      this.scrolling = true;
      this.hide();
      // переместиться в верхнюю часть страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  },
};

btnUp.addEventListener();

// -------------- МЕНЮ БУРГЕР------------

// let headerBurger = document.querySelector(".header__burger");
// let headerList = document.querySelector(".header__list");

// headerBurger.addEventListener("click", function () {
//   headerBurger.classList.toggle("active");
//   headerList.classList.toggle("active");
//   document.querySelector(".body").classList.toggle("lock");
// });

// -------------- МЕДЛЕННЫЙ СКРОЛЛ ДЛЯ <header> -----------

// $(function () {
//   $(window).scroll(function () {
//     var scroll = $(window).scrollTop();

//     if (scroll >= 20) {
//       $(".navigation").addClass("fixed");
//       $("header").css({
//         "border-bottom": "none",
//         // "width": "744px"
//         padding: "0px 0",
//       });
//     } else {
//       $(".navigation").removeClass("fixed");
//       $("header").css({
//         "border-bottom": "none",
//         padding: "0px 0",
//       });
//     }
//   });
// });

// -------------- ВЫБРАТЬ ЯЗЫК -----------

$(function () {
  // bind change event to select
  $("#language").on("change", function () {
    var url = $(this).val(); // get selected value
    if (url) {
      // require a URL
      window.location = url; // redirect
    }
    return false;
  });
});

// --------------- МОДАЛЬНОЕ ОКНО -------------

if (window.screen.availWidth < window.screen.availHeight) {
  document.querySelector(".popup__img").src =
    "./assets/images/modal-window_mobile.png";
}

let modalWindow = document.getElementById("overlay");
let btnClosePopup = document.getElementById("close");
let delay_popup = 5000;

setTimeout(() => {
  modalWindow.style.display = "block";
}, delay_popup);

btnClosePopup.onclick = () => {
  modalWindow.style.display = "none";
};

// --------------- СЛОЖНЫЙ БУРГЕР --------------

("use strict");

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

// Меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

// Прокрутка при клике
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
