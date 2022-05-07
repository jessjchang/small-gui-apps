document.addEventListener('DOMContentLoaded', () => {
  const TodoApp = (function() {
    let todo_items = [
      { id: 1, title: 'Homework' },
      { id: 2, title: 'Shopping' },
      { id: 3, title: 'Calling Mom' },
      { id: 4, title: 'Coffee with John '}
    ];

    return {
      init() {
        this.templates = {};
        this.compileTemplates();
        this.todoItems = todo_items;
        this.todosListArea = document.getElementById('todos');
        this.confirmPrompt = document.querySelector('.confirm_prompt');
        this.overlay = document.querySelector('.overlay');
        this.contextMenu = document.querySelector('.context_menu');
        this.renderTodoTemplate();
        this.bindEvents();
      },

      compileTemplates() {
        let allTemplates = document.querySelectorAll('[type="text/x-handlebars-template"]');
        Array.prototype.slice.call(allTemplates).forEach(template => {
          this.templates[template.id] = Handlebars.compile(template.innerHTML);
        });
      },

      renderTodoTemplate() {
        this.todosListArea.textContent = '';
        let todosHtml = this.templates['todos_template']({todos: this.todoItems});
        this.todosListArea.insertAdjacentHTML('beforeend', todosHtml);
      },

      // handleDelete(event) {
      //   if (event.target.tagName === 'SPAN') {
      //     let id = event.target.parentElement.getAttribute('data-id');
      //     let todo = this.retrieveTodo(id);
      //     this.displayDialog(todo);
      //     this.bindConfirmationEvents(todo);
      //   }
      // },

      displayDialog(todo) {
        this.confirmPrompt.textContent = '';
        let dialogHtml = this.templates['confirm_template'](todo);
        this.confirmPrompt.insertAdjacentHTML('beforeend', dialogHtml);
        this.confirmPrompt.style.display = 'block';
        this.overlay.style.display = 'block';
      },

      bindConfirmationEvents(todo) {
        this.confirmPrompt.addEventListener('click', event => {
          this.handleConfirmation(event, todo);
        });
      },

      handleConfirmation(event, todo) {
        if (event.target.tagName === 'A') {
          event.preventDefault();
          
          if (event.target.classList.contains('confirm_yes')) {
            this.handleYes(todo);
          } else {
            this.handleNo(todo);
          }
        }
      },

      handleYes(targetTodo) {
        this.todoItems = this.todoItems.filter(todo => todo !== targetTodo);
        this.renderTodoTemplate();
        this.hideDialog();
      },

      handleNo(targetTodo) {
        this.hideDialog();
      },

      hideDialog() {
        this.overlay.style.display = 'none';
        this.confirmPrompt.style.display = 'none';
      },

      retrieveTodo(targetId) {
        return this.todoItems.filter(({id}) => id === Number(targetId))[0];
      },

      handleContextEvent(event) {
        if (event.target.tagName === 'LI') {
          let todo = this.retrieveTodo(event.target.getAttribute('data-id'));
          if (event.target.classList.contains('remove')) {
            this.displayDialog(todo);
            this.bindConfirmationEvents(todo);
          }
        }
      },

      showContextMenu(event) {
        event.preventDefault();
        if (event.target.tagName === 'LI') {
          this.contextMenu.textContent = '';
          let rect = document.body.getBoundingClientRect();
          let horizPosition = event.clientX - rect.left;
          let vertPosition = event.clientY - rect.height;
          let id = event.target.getAttribute('data-id');
          let todo = this.retrieveTodo(id);
          let contextMenuHtml = this.templates['context_menu_template'](todo);
          this.contextMenu.insertAdjacentHTML('beforeend', contextMenuHtml);
          this.contextMenu.style.display = 'block';
          this.contextMenu.style.position = 'relative';
          this.contextMenu.style.opacity = '1';
          this.contextMenu.classList.add('fadeIn');
          this.contextMenu.style.top = `${vertPosition}px`;
          this.contextMenu.style.left = `${horizPosition}px`;
          this.contextMenu.addEventListener('click', this.handleContextEvent.bind(this));
        }
      },

      hideContextMenu() {
        this.contextMenu.classList.remove('fadeIn');
        this.contextMenu.style.opacity = '0';
      },

      bindEvents() {
        this.todosListArea.addEventListener('contextmenu', this.showContextMenu.bind(this));
        this.overlay.addEventListener('click', event => {
          this.hideDialog();
          this.hideContextMenu();
        });

        document.body.addEventListener('click', this.hideContextMenu.bind(this));
      },
    };
  })();

  TodoApp.init();
});