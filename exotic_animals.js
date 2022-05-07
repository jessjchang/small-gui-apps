document.addEventListener('DOMContentLoaded', () => {
  const ExoticAnimalGrid = (function() {
    return {
      init() {
        this.grid = document.getElementById('exotic_animals');
        this.timer = null;
        this.bindEvents();
        return this;
      },

      startTimer(event) {
        if (event.target.tagName === 'IMG') {
          let self = this;
          this.timer = setTimeout(function() {
            self.showToolTip(event);
          }, 2000);
        }
      },

      showToolTip(event) {
        let figcaption = event.target.nextElementSibling;
        figcaption.classList.add('fadeIn');
      },

      handleMouseLeave(event) {
        if (event.target.tagName === 'IMG') {
          if (this.timer) {
            clearTimeout(this.timer);
          }

          let figcaption = event.target.nextElementSibling;
          figcaption.classList.remove('fadeIn');
          figcaption.classList.add('fadeOut');
        }
      },

      bindEvents() {
        this.grid.addEventListener('mouseenter', this.startTimer.bind(this), true);
        this.grid.addEventListener('mouseleave', this.handleMouseLeave.bind(this), true);
      },
    };
  })();

  ExoticAnimalGrid.init();
});
