import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import glaze from "./src";

gsap.registerPlugin(ScrollTrigger);

glaze({
  breakpoints: {
    default: "(min-width: 640px)",
    lg: "(min-width: 1024px)",
  },
  lib: {
    gsap: { core: gsap },
  },
  className: "animate",
  watch: true,
});

// setTimeout(() => {
//   const tl = timelines[0];
//
//   for (const [element] of tl.elements) {
//     if (!element) continue;
//     const animateObject = element.getAttribute("data-animate");
//     if (animateObject) {
//       element.setAttribute(
//         "data-animate",
//         animateObject.replace("red", "pink"),
//       );
//     }
//     const classes = element.getAttribute("class") || "";
//     if (classes) {
//       element.setAttribute("class", classes.replace("red", "pink"));
//     }
//   }
// }, 5000);
