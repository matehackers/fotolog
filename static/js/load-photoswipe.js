/*
Put this file in /static/js/load-photoswipe.js
Documentation and licence at https://github.com/liwenyip/hugo-easy-gallery/
*/

/* Show an alert if this js file has been loaded twice */
if (window.loadphotoswipejs) {
  window.alert(
    "You've loaded load-photoswipe.js twice. See https://github.com/liwenyip/hugo-easy-gallery/issues/6"
  );
}
var loadphotoswipejs = 1;

/**
 * source: https://youmightnotneedjquery.com/#ready
 * @param {*} fn
 */
function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

/**
 * Initializes photoswipe
 *
 * note that is using photoswipe 4.11, so the reference
 * documentation is at https://photoswipe.com/v4-docs/getting-started.html
 */
function init_photoswipe() {
  const items = []; // array of slide objects that will be passed to PhotoSwipe()
  // for every figure element on the page:
  document.querySelectorAll("figure").forEach(function (figure) {
    if (figure.classList.contains("no-photoswipe")) return true; // ignore any figures where class="no-photoswipe"
    // get properties from child a/img/figcaption elements,
    const $figure = figure,
      $a = $figure.querySelector("a"),
      $img = $figure.querySelector("img"),
      $src = $a.getAttribute("href"),
      $title = $img.getAttribute("alt"),
      $msrc = $img.getAttribute("src");
    // if data-size on <a> tag is set, read it and create an item
    let item;
    if ($a.dataset.size) {
      const $size = $a.dataset.size.split("x");
      item = {
        src: $src,
        w: $size[0],
        h: $size[1],
        title: $title,
        msrc: $msrc,
      };
      console.log("Using pre-defined dimensions for " + $src);
      // if not, set temp default size then load the image to check actual size
    } else {
      item = {
        src: $src,
        w: 800, // temp default size
        h: 600, // temp default size
        title: $title,
        msrc: $msrc,
      };
      console.log("Using default dimensions for " + $src);
      // load the image to check its dimensions
      // update the item as soon as w and h are known (check every 30ms)
      const img = new Image();
      img.src = $src;
      const wait = setInterval(function () {
        const w = img.naturalWidth,
          h = img.naturalHeight;
        if (w && h) {
          clearInterval(wait);
          item.w = w;
          item.h = h;
          console.log("Got actual dimensions for " + img.src + ", w: " + w + " h: " + h);
        }
      }, 30);
    }
    // Save the index of this image then add it to the array
    const index = items.length;
    items.push(item);
    // Event handler for click on a figure
    $figure.addEventListener("click", function (event) {
      event.preventDefault(); // prevent the normal behaviour i.e. load the <a> hyperlink
      // Get the PSWP element and initialise it with the desired options
      const $pswp = document.querySelector(".pswp");
      const options = {
        index: index,
        bgOpacity: 0.8,
        showHideOpacity: true,
      };
      new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options).init();
    });
  });
}

ready(init_photoswipe);
