document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentSlide = 0;

  // Video handling
  const videos = document.querySelectorAll(".speaker-video");

  function handleVideoForSlide(index) {
    videos.forEach((video) => {
      // Pause all videos
      video.pause();

      // If video hasn't been loaded yet, load it
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
      }
    });

    // Play video for current slide if it exists
    const currentSlideVideo = slides[index].querySelector(".speaker-video");
    if (currentSlideVideo) {
      currentSlideVideo.play().catch((e) => {
        console.log("Video autoplay prevented:", e);
      });
    }
  }

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");

    handleVideoForSlide(index);

    // Update button states
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
  }

  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });

  // Initialize
  showSlide(0);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    } else if (e.key === "ArrowRight" && currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
});
