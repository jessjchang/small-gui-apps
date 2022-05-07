document.addEventListener('DOMContentLoaded', () => {
  const LanguageInfo = (function() {
    const CHARACTER_LIMIT = 120;

    const languages = [
      {
        name: 'Ruby',
        description: 'Ruby is a dynamic, reflective, object-oriented, ' +
        'general-purpose programming language. It was designed and developed in the mid-1990s ' +
        'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
        'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
        'including functional, object-oriented, and imperative. It also has a dynamic type ' +
        'system and automatic memory management.'
      },
    
      {
        name: 'JavaScript',
        description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
        'programming language. It has been standardized in the ECMAScript language ' +
        'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
        'technologies of World Wide Web content production; the majority of websites employ ' +
        'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
        'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
        'supporting object-oriented, imperative, and functional programming styles.'
      },

      {
        name: 'Short Lang',
        description: 'This is a short language.'
      },
    
      {
        name: 'Lisp',
        description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
        'with a long history and a distinctive, fully parenthesized prefix notation. ' +
        'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
        'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
        'since its early days, and many dialects have existed over its history. Today, the best '+
        'known general-purpose Lisp dialects are Common Lisp and Scheme.'
      },
    ];

    return {
      init() {
        this.languageArr = this.completeLanguageObject(languages);
        this.languageTemplate = Handlebars.compile(document.getElementById('language_template').innerHTML);
        this.languagesDiv = document.getElementById('languages');
        this.renderTemplate();
        this.bindEvents();
      },

      completeLanguageObject(arr) {
        return arr.map(language => {
          language['alreadyShort'] = (language.description.length <= 120);

          if (language['alreadyShort']) {
            language['shortDescription'] = language.description;
          } else {
            language['shortDescription'] = language.description.slice(0, CHARACTER_LIMIT) + ' ...';
          }

          return language;
        });
      },

      renderTemplate() {
        this.languageArr.forEach(language => {
          let languageHTML = this.languageTemplate(language);
          this.languagesDiv.insertAdjacentHTML('beforeend', languageHTML);
        });
      },

      getInfo(languageName) {
        return this.languageArr.filter(({name}) => {
          return name === languageName;
        })[0];
      },

      handleButtonClick(event) {
        let languageName;
        let info;

        if (event.target.tagName === 'A') {
          event.preventDefault();
          languageName = event.target.parentElement.getAttribute('data-language');
          info = this.getInfo(languageName);
        }

        if (event.target.textContent === 'Show More') {
          event.target.previousElementSibling.textContent = info.description;
          event.target.textContent = 'Show Less';
        } else if (event.target.textContent === 'Show Less') {
          event.target.previousElementSibling.textContent = info.shortDescription;
          event.target.textContent = 'Show More';
        }
      },

      bindEvents() {
        this.languagesDiv.addEventListener('click', this.handleButtonClick.bind(this));
      },
    };
  })();

  LanguageInfo.init();
});