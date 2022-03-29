import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

const loadingEl = document.querySelector('.loading-spinner');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);

    //set the variable of made up word, newToDo for createToDo async function from fetch file.
    await createTodo({
        //data.get will grab the data from the input from the form in html file.
        todo: data.get('todo'),
        complete: false,
    });

    todoForm.reset();
    displayTodos();
});

function toggleLoadingSpinner(){
    loadingEl.classList.toggle('invisible');
}

async function displayTodos() {
    // fetch the todos

    toggleLoadingSpinner();
    const todoList = await getTodos();
    
    todosEl.textContent = '';
    // display the list of todos

    // be sure to give each todo an event listener

    // on click, complete that todo
    for (let item of todoList) {
        const itemEl = renderTodo(item);
        itemEl.addEventListener('click', async () => {
            await completeTodo(item.id);
            displayTodos();
        });
        todosEl.append(itemEl);
    }

    //itemEl.classList.add(item.complete ? 'is_complete' : 
    toggleLoadingSpinner();

}

// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    //await getTodos();
    //completeTodo();
    await displayTodos();
});

window.addEventListener('load', () =>{

    displayTodos();
});
