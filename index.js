// <!-- JS -->

console.log(window.BASE_URL + "chatbutton/stores/check");

function toggleDrawer(isOpen) {
  const action = isOpen ? "add" : "remove";

  var btnNav = document.getElementById("btnNavDrawer");
  var drawer = document.querySelector(".navdrawer");
  var backdrop = document.getElementById("backdrop");

  if (isOpen) {
    btnNav.classList.add("open");
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    //for ghost hover effect when opening drawer in iphone
    btnNav.blur();
    // drawer.classList.add("is-opening");
    // setTimeout(() => {
    //   drawer.classList.remove("is-opening");
    // }, 300);
  } else {
    btnNav.classList.remove("open");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }
}

function openDrawer() {
  toggleDrawer(true);
}

function closeDrawer() {
  toggleDrawer(false);
}

function toggleDisplay(sectionToShow, sectionToHide) {
  document.getElementById(sectionToShow).style.display = "initial";
  document.getElementById(sectionToHide).style.display = "none";
}

function openDpOverseas() {
  toggleDisplay("dp-overseas", "dp-main");
}

function closeDpOverseas() {
  toggleDisplay("dp-main", "dp-overseas");
}

function openDpStore() {
  toggleDisplay("dp-store", "dp-main");
}

function closeDpStore() {
  toggleDisplay("dp-main", "dp-store");
}

const link = document.getElementById("messenger-link");

function updateMessengerLink() {
  const isMobile = window.innerWidth <= 768; // adjust breakpoint if needed
  link.href = isMobile ? "https://m.me/abensonappliances" : "https://www.messenger.com/t/abensonappliances";
}

// Initial check
updateMessengerLink();

// Safety Advisory Bubble
(function () {
  const config = {
    elementIds: {
      advisory: "safetyAdvisory",
      closeBtn: "closeBubble",
    },
    delay: 2000,
    scrollListenerDelay: 1000,
    cssClass: "safety-advisory-visible",
  };

  let initialized = false;
  let scrollHandler = null;

  function setupAccessibility(advisory) {
    advisory.setAttribute("role", "alert");
    advisory.setAttribute("aria-live", "polite");
  }

  function attachScrollListener(advisory) {
    scrollHandler = () => {
      advisory.classList.remove(config.cssClass);
      window.removeEventListener("scroll", scrollHandler);
    };

    setTimeout(() => {
      window.addEventListener("scroll", scrollHandler, { once: true });
    }, config.scrollListenerDelay);
  }

  function attachCloseListener(advisory, closeBtn) {
    closeBtn.addEventListener("click", () => {
      advisory.classList.remove(config.cssClass);
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    });
  }

  function initSafetyAdvisory() {
    if (initialized) return;

    const advisory = document.getElementById(config.elementIds.advisory);
    const closeBtn = document.getElementById(config.elementIds.closeBtn);

    if (!advisory || !closeBtn) return;

    initialized = true;

    setTimeout(() => {
      advisory.classList.add(config.cssClass);
      setupAccessibility(advisory);
      attachScrollListener(advisory);
    }, config.delay);

    attachCloseListener(advisory, closeBtn);
  }

  const initWhenReady = () => {
    if (document.readyState !== "loading") {
      initSafetyAdvisory();
    } else {
      document.addEventListener("DOMContentLoaded", initSafetyAdvisory, { once: true });
    }
  };

  initWhenReady();
})();
