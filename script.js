window.addEventListener("scroll", function() {
  var timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach(function(item) {
    var position = item.getBoundingClientRect();
    if (position.top < window.innerHeight && position.bottom >= 0) {
      item.classList.add("show");
    }
  });