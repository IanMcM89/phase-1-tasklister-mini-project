//As a user, I should be able to type a task into the input field.
//As a user, I should be able to click some form of a submit button.
//As a user, I expect to see the task string that I provided appear in the DOM after the submit button has been activated.

document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById('create-task-form');
  createDueInput();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    buildToDoList(e.target['new-task-description'].value, e.target['new-task-due-date'].value);
    form.reset();
  })
});

function buildToDoList(todoInput, dueInput) {
  let li = document.createElement('li');
  let deleteButton = createDeleteButton()
  let priorityList = createPriorityList()
  li.textContent = `${todoInput} - Due By: ${dueInput} `;

  //Ability to edit tasks:
  li.contentEditable = 'true';

  document.getElementById('tasks').appendChild(li);
  li.appendChild(priorityList);
  li.appendChild(deleteButton);
  priorityColor();
}

//An additional input field (e.g. user, duration, date due):

function createDueInput() {
  let form = document.getElementById('create-task-form');
  let dueDate = document.createElement('input');
  dueDate.type = 'text', dueDate.id = 'new-task-due-date', dueDate.name = 'new-task-due-date', dueDate.placeholder = 'due date';
  form.insertBefore(dueDate, form[1]);
  form['new-task-due-date'].style['margin-right'] = '4px'
}

//A delete function that will remove tasks from your list:

function createDeleteButton() {
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.style['margin-left'] = '8px';
  deleteButton.style.height = '18.8px';
  deleteButton.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });
  return deleteButton;
}

//A priority value selected from a dropdown that is used to determine the color of the text in the list (e.g. red for high priority, yellow for medium, green for low):

function createPriorityList() {
  let priorityList = document.createElement('select');
  const createOptions = () => {
    let optionsArray = [1, 2, 3];
    for(let option of optionsArray){
      option = document.createElement('option');
      priorityList.appendChild(option);
    }
  }
  createOptions();
  priorityList.className = 'priority';
  priorityList[0].value = 'low', priorityList[1].value = 'medium', priorityList[2].value = 'high';
  priorityList[0].textContent = 'Low', priorityList[1].textContent = 'Medium', priorityList[2].textContent = 'High';
  priorityList.addEventListener('change', priorityColor)
  return priorityList;
}

function priorityColor() {
  let selectorCollect = document.getElementById('tasks').children;
  for(let item of selectorCollect){
    let selector = item.getElementsByClassName('priority')[0].value;
    if(selector === 'low'){
      item.style.color = 'green';
    } else if(selector === 'medium'){
      item.style.color = 'yellow';
    } else if(selector === 'high'){
      item.style.color = 'red';
    }
  }
}