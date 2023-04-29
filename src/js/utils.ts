const BACKDROP_ID = "backdrop";
const BACKDROP_CLASS =
  "fixed left-0 top-0 right-0 bottom-0 bg-dark55 opacity-0 cursor-n-resize z-50";
const TRANSITION_OPACITY = "transition-opacity";
const OPACITY_100 = "opacity-100";

export function addBackdrop(onClickCallback?, backdropClass?) {
  let backdrop = document.createElement("div");

  backdrop.id = BACKDROP_ID;
  backdrop.className = `${BACKDROP_CLASS}${
    backdropClass ? ` ${backdropClass}` : ``
  }`;

  document.body.appendChild(backdrop);

  window.requestAnimationFrame(() => {
    const backdropEl = document.getElementById(BACKDROP_ID);

    if (backdropEl) {
      backdropEl.classList.add(TRANSITION_OPACITY);
      backdropEl.classList.add(OPACITY_100);

      backdropEl.addEventListener("click", () => {
        if (onClickCallback) {
          onClickCallback();
        }
      });
    }
  });
}

export function removeBackdrop(transition = true) {
  const backdropEl = document.getElementById(BACKDROP_ID);

  if (backdropEl) {
    if (transition) {
      backdropEl.classList.remove(OPACITY_100);

      backdropEl.addEventListener("transitionend", () => {
        backdropEl.remove();
      });
    } else {
      backdropEl.remove();
    }
  }
}

export function scrollToElement(elementId = null, offset = 0) {
  const element = document.getElementById(elementId);
  const cords = element ? element.getBoundingClientRect() : null;

  if (cords) {
    window.scrollTo({
      top: window.scrollY + cords.top - offset,
      behavior: "smooth",
    });
  }
}
