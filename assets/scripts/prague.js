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

let headerBurger = document.querySelector(".header__burger");
let headerList = document.querySelector(".header__list");

headerBurger.addEventListener("click", function () {
  headerBurger.classList.toggle("active");
  headerList.classList.toggle("active");
  document.querySelector(".body").classList.toggle("lock");
});

$(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 20) {
      $(".navigation").addClass("fixed");
      $("header").css({
        "border-bottom": "none",
        // "width": "744px"
        padding: "0px 0",
      });
    } else {
      $(".navigation").removeClass("fixed");
      $("header").css({
        "border-bottom": "none",
        padding: "0px 0",
      });
    }
  });
});

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
