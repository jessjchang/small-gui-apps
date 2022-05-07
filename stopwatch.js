class Stopwatch {
  constructor() {
    this.startStopButton = document.querySelector('.toggle');
    this.resetButton = document.querySelector('.reset');
    this.running = false;
    this.hours = new Counter('hours', 99, 3600000);
    this.minutes = new Counter('mins', 59, 60000);
    this.seconds = new Counter('secs', 59, 1000);
    this.centiseconds = new Counter('centisecs', 99, 10);
    this.allTimes = [this.centiseconds, this.seconds, this.minutes, this.hours];
    this.bindEvents();
  }

  bindEvents() {
    this.startStopButton.addEventListener('click', this.handleStartStop.bind(this));
    this.resetButton.addEventListener('click', this.handleReset.bind(this));
  }

  handleStartStop() {
    if (this.running) {
      this.running = false;
      this.startStopButton.textContent = 'Start';
      this.stopStopwatch();
    } else {
      this.running = true;
      this.startStopButton.textContent = 'Stop';
      this.startStopwatch();
    }
  }

  stopStopwatch() {
    this.allTimes.forEach(time => {
      time.stopIncrementing();
    })
  }

  startStopwatch() {
    this.allTimes.forEach(time => {
      time.startIncrementing();
    });
  }

  handleReset() {
    this.allTimes.forEach(time => {
      this.running = false;
      this.startStopButton.textContent = 'Start';
      time.stopIncrementing();
      time.resetToZero();
    });
  }
}

class Counter {
  constructor(value, limit, msInterval) {
    this.value = value;
    this.msInterval = msInterval;
    this.limit = limit;
    this.currentTime = 0;
    this.interval = null;
    this.timerArea = document.querySelector('.timer');
    this.span = this.timerArea.querySelector('.' + this.value);
  }

  startIncrementing() {
    this.interval = setInterval(() => {
      if (this.currentTime < this.limit) {
        this.currentTime += 1;
      } else {
        this.currentTime = 0;
      }

      this.displayTime(this.currentTime);
    }, this.msInterval);
  }

  stopIncrementing() {
    clearInterval(this.interval);
  }

  displayTime(time) {
    this.span.textContent = this.formatDisplay(time);
  }

  resetToZero() {
    this.currentTime = 0;
    this.span.textContent = '00';
  }

  formatDisplay(time) {
    if (time < 10) {
      return '0' + String(time);
    } else {
      return String(time);
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Stopwatch;
});
