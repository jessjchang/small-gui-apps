const Calculator = (function() {
  const OPERATIONS = {
    '/': (a, b) => a / b,
    'x': (a, b) => a * b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '%': (a, b) => a % b,
  };

  return {
    init() {
      this.calculatorArea = document.getElementById('calculator');
      this.screen = document.getElementById('screen');
      this.calculationArea = this.screen.querySelector('.calculation');
      this.currentNumArea = this.screen.querySelector('.current_num');
      this.buttons = document.getElementById('buttons');
      this.currentEntry = '';
      this.currentCalculation = [];
      this.bindEvents();
    },

    bindEvents() {
      this.buttons.addEventListener('click', this.handleButtonClick.bind(this));
    },

    handleButtonClick(event) {
      event.preventDefault();
      let buttonClass = event.target.getAttribute('class');

      if (buttonClass === 'control') {
        this.handleControlClick(event);
      } else if (buttonClass === 'op') {
        this.handleOpClick(event);
      } else if (buttonClass === 'result_button') {
        this.handleResults();
      } else {
        this.handleDigitEntry(event);
      }
    },

    handleControlClick(event) {
      let controlType = event.target.id;

      if (controlType === 'ce') {
        this.resetEntryWindow();
      } else if (controlType === 'c') {
        this.resetEntryWindow();
        this.resetOperationWindow();
        this.currentCalculation = [];
      } else {
        if (this.currentEntry !== '' && this.currentEntry[0] !== '-') {
          this.currentEntry = '-' + this.currentEntry;
          this.currentNumArea.textContent = this.currentEntry;
        }
      }
    },

    handleOpClick(event) {
      if (this.currentCalculation.length === 0 || this.lastElementIsOperation()) {
        this.currentCalculation.push(Number(this.currentNumArea.textContent));
      } else {
        this.currentCalculation.push(Number(this.currentEntry));
      }

      this.currentCalculation.push(event.target.textContent);
      this.calculationArea.textContent = this.currentCalculation.join(' ');
      this.resetEntryWindow();
    },

    lastElementIsOperation() {
      return Object.keys(OPERATIONS).includes(this.currentCalculation[this.currentCalculation.length - 1]);
    },

    handleResults() {
      this.resetOperationWindow();
      let calculation = this.performCalculation();
      this.currentCalculation = [];

      this.currentNumArea.textContent = String(calculation);
    },

    performCalculation() {
      if (this.lastElementIsOperation()) {
        this.currentCalculation.push(Number(this.currentNumArea.textContent));
      }

      let calculation = this.currentCalculation[0];

      this.currentCalculation.forEach((val, index) => {
        if (Object.keys(OPERATIONS).includes(val)) {
          let operationFunc = OPERATIONS[val];

          calculation = operationFunc(calculation, this.currentCalculation[index + 1]);
        }
      });

      return calculation;
    },

    handleDigitEntry(event) {
      let digit = event.target.textContent;

      if (this.currentEntry === '' && digit === '.') {
        this.currentEntry = '0.';
      } else {
        this.currentEntry += digit;
      }

      this.currentNumArea.textContent = this.currentEntry;
    },

    resetEntryWindow() {
      this.currentNumArea.textContent = '0';
      this.currentEntry = '';
    },

    resetOperationWindow() {
      this.calculationArea.textContent = '';
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Calculator.init();
});
