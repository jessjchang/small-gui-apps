const Editor = (function() {
  return {
    init() {
      this.buttons = document.querySelector('.buttons');
      this.commands = {
        bold: 'bold',
        italicize: 'italic',
        underline: 'underline',
        strikethrough: 'strikeThrough',
        link: 'createLink',
        ul: 'insertUnorderedList',
        ol: 'insertOrderedList',
        al_left: 'justifyLeft',
        al_right: 'justifyRight',
        al_center: 'justifyCenter',
        al_justify: 'justifyFull',
      };
      this.bindEvents();
    },

    bindEvents() {
      this.buttons.addEventListener('click', this.handleButtonClick.bind(this));
      document.addEventListener('selectionchange', this.applyButtons.bind(this));
    },

    applyButtons() {
      Object.keys(this.commands).forEach(command => {
        let commandOn = document.queryCommandState(this.commands[command]);
        document.querySelector('.' + command).classList.toggle('pushed', commandOn);
      });
    },

    toggleButtonPush(event) {
      let button = event.target;
      button.classList.toggle('pushed');
    },

    makeBold(event) {
      document.execCommand('bold');
      this.toggleButtonPush(event);
    },

    makeItalic(event) {
      document.execCommand('italic');
      this.toggleButtonPush(event);
    },

    makeUnderline(event) {
      document.execCommand('underline');
      this.toggleButtonPush(event);
    },

    makeStrikethrough(event) {
      document.execCommand('strikeThrough');
      this.toggleButtonPush(event);
    },

    makeLink(event) {
      let selection = document.getSelection().toString();
      let url;

      if (!selection) return;

      url = prompt('Enter the URL to link to: ');

      if (!url) return;
      document.execCommand('createLink', false, url);
      this.toggleButtonPush(event);
    },

    createUL(event) {
      document.execCommand('insertUnorderedList');
      this.toggleButtonPush(event);
    },

    createOL(event) {
      document.execCommand('insertOrderedList');
      this.toggleButtonPush(event);
    },

    alignLeft(event) {
      document.execCommand('justifyLeft');
      this.toggleButtonPush(event);
      this.applyButtons();
    },

    alignRight(event) {
      document.execCommand('justifyRight');
      this.toggleButtonPush(event);
      this.applyButtons();
    },

    alignCenter(event) {
      document.execCommand('justifyCenter');
      this.toggleButtonPush(event);
      this.applyButtons();
    },

    alignJustify(event) {
      document.execCommand('justifyFull');
      this.toggleButtonPush(event);
      this.applyButtons();
    },

    handleButtonClick(event) {
      let classList = event.target.classList;

      if (classList.contains('bold')) {
        this.makeBold(event);
      } else if (classList.contains('italicize')) {
        this.makeItalic(event);
      } else if (classList.contains('underline')) {
        this.makeUnderline(event);
      } else if (classList.contains('strikethrough')) {
        this.makeStrikethrough(event);
      } else if (classList.contains('link')) {
        this.makeLink(event);
      } else if (classList.contains('ul')) {
        this.createUL(event);
      } else if (classList.contains('ol')) {
        this.createOL(event);
      } else if (classList.contains('al_left')) {
        this.alignLeft(event);
      } else if (classList.contains('al_right')) {
        this.alignRight(event);
      } else if (classList.contains('al_center')) {
        this.alignCenter(event);
      } else if (classList.contains('al_justify')) {
        this.alignJustify(event);
      }
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Editor.init();
});
