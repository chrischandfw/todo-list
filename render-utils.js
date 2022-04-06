export function renderTodo(todo) {
    // create a div and a p tag
    const toDoEl = document.createElement('div');
    const pTagEl = document.createElement('p');
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    toDoEl.classList.add(todo.complete ? 'complete' : 'incomplete');  
    // add the 'todo' css class no matter what
    toDoEl.classList.add('todo');
    // put the todo's text into the p tag
    pTagEl.textContent = todo.todo;
    // append stuff
    toDoEl.append(pTagEl);
    // return the div
    return toDoEl;
}