const controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({
  triggerElement: "#trigger1",
  triggerHook: 0.9, // show, when scrolled 10% into view
  duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
  offset: 50, // move trigger to center of element
})
  .setClassToggle("#reveal1", "visible") // add class to reveal
  .addIndicators() // add indicators (requires plugin)
  .addTo(controller);
