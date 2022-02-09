// DOM elements
const userNameForm = document.querySelector('#user_name_form');
const userTaskForm = document.querySelector('#user_task_form');
const userInputName = document.querySelector('#user_input_name');
const userName = document.querySelector('#user_name');
const userNameIcon = document.querySelector('#user_name_icon');
const userNameBtn = document.querySelector('#user_name_btn');
const userNameContainer = document.querySelector('#user_name_container');
const dropdownButton = document.querySelector('#dropdown_button');
const dropdownList = document.querySelector('#dropdown_list');
const userTaskContainer = document.querySelector('#user_task_container');
const task = document.querySelector('#list_of_task');
const inputTaskContainer = document.querySelector('#input_task_container');
const inputTask = document.querySelector('#input_task');
const inputTaskBtn = document.querySelector('#input_task_btn');
const menu = document.querySelector('#menu');
const content = document.querySelector('#content');
const selectAllTaskContainer = document.querySelector('#select_all_task_container');
const selectAllCheckbox = document.querySelector('#select_all_task');
const taskActions = document.querySelector('#task_actions');
const taskActionsBtns = document.querySelector('#task_actions_btns');
const deleteTaskBtn = document.querySelector('#delete_task_btn');
const completeTaskBtn = document.querySelector('#complete_task_btn');
const taskTitle = document.querySelector('#task_title');
const numberOfTask = document.querySelector('#number_of_task');

// Focus input field
const inputField = (inputField, button, icon) => {

    // Focus in input field and it will change the background color of the icon and input field
    inputField.addEventListener('focusin', () => {
        if (button.classList.contains('border-crimson', 'bg-gray-100') && icon.classList.contains('text-crimson')) {
            button.classList.remove('border-crimson', 'bg-gray-100');
            icon.classList.remove('text-crimson');
            button.classList.add('bg-crimson', 'text-gray-200');
            icon.classList.add('text-gray-200');
        }
    });

    // Focus out input field and it will change the background color of the icon and input field
    inputField.addEventListener('focusout', () => {
        if (button.classList.contains('bg-crimson', 'text-gray-200') && icon.classList.contains('text-gray-200')) {
            button.classList.remove('bg-crimson', 'text-gray-200');
            icon.classList.remove('text-gray-200');
            button.classList.add('border-crimson', 'bg-gray-100');
            icon.classList.add('text-crimson');
        }
    });
}

// Save input name to localstorage
const saveInputTolocalStorage = (input) => {
    let todos;

    if (localStorage.getItem('todos') === null) { // If todos is empty
        todos = {}; // Create an array
        todos.user_name = input.value.trim().toLowerCase();

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));

        if (todos.hasOwnProperty('task')) {
            todos.task.push(input.value.trim().toLowerCase());
        } else {
            todos.task = [];
            todos.task.push(input.value.trim().toLowerCase());
        }
    }

    localStorage.setItem('todos', JSON.stringify(todos)); // Send it back to localstorage with updated input of the user
}

// Set user name
const setUserName = (form, input, inputNameContainer, taskContainer) => {
    inputField(userInputName, userNameBtn, userNameIcon);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        saveInputTolocalStorage(input);

        input.value = '';

        if (!inputNameContainer.classList.contains('hidden') && taskContainer.classList.contains('hidden')) {
            inputNameContainer.classList.add('hidden');
            taskContainer.classList.remove('hidden');
        }

        getUserName();
    });
}

// Set task
const setTask = (form, input) => {
    const task = input;
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        saveInputTolocalStorage(task);

        task.value = '';
        // CHECK IF SELECT ALL CHECKBOX IS TRUE
        if (selectAllCheckbox.checked) {
            selectAllCheckbox.checked = false; // RETURN TO FALSE
        }

        getNewAddedTask();
        checkTask();
    });
}

// SET ATTRIBUTE TO ELEMENT THAT HAS BEEN ADDED
const setAttribute = (element, attrs) => {
    for (let key in attrs) {
        element.setAttribute(key, attrs[key]);
    }
}

// COMPLETED TASK
const completeTask = () => {
    completeTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const taskList = task.children;
        const arrTaskList = Object.values(taskList);

        if (localStorage.getItem('todos') !== null) {
            const todos = JSON.parse(localStorage.getItem('todos'));

            if (!todos.hasOwnProperty('completed_task')) {
                todos['completed_task'] = [];
            }

            for (let i of arrTaskList) {
                if (i.children[0].checked) {
                    // Task to be remove
                    const task = todos['task'].indexOf(i.children[0].nextElementSibling.textContent);

                    if (task > -1) {
                        todos['task'].splice(task, 1); // SECOND PARAMETER MEANS REMOVE 1 ELEMENT ONLY
                    }

                    todos['completed_task'].push(i.children[0].nextElementSibling.textContent);
                    i.children[1].parentElement.remove();
                }
            }

            localStorage.setItem('todos', JSON.stringify(todos));
        }

        getNumberOfTask('task', numberOfTask); // GET THE UPDATED NUMBER OF TASK 

        if (selectAllCheckbox.checked === true) {
            selectAllCheckbox.checked = false;
        }

        if (!taskActionsBtns.classList.contains('opacity-0')) {
            taskActionsBtns.classList.add('opacity-0');
        }

        actions('task', taskActions);
    });
}

// DELETE TASK
const deleteTask = () => {
    deleteTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const taskList = task.children;
        const arrTaskList = Object.values(taskList);

        if (localStorage.getItem('todos') !== null) {
            const todos = JSON.parse(localStorage.getItem('todos'));

            if (!todos.hasOwnProperty('deleted_task')) {
                todos['deleted_task'] = [];
            }

            for (let i of arrTaskList) {
                if (i.children[0].checked) {
                    // Task to be remove
                    const task = todos['task'].indexOf(i.children[0].nextElementSibling.textContent);

                    if (task > -1) {
                        todos['task'].splice(task, 1); // SECOND PARAMETER MEANS REMOVE 1 ELEMENT ONLY
                    }

                    todos['deleted_task'].push(i.children[0].nextElementSibling.textContent);
                    i.children[1].parentElement.remove();
                }
            }

            localStorage.setItem('todos', JSON.stringify(todos));
        }

        getNumberOfTask('task', numberOfTask); // GET THE UPDATED NUMBER OF TASK 

        if (selectAllCheckbox.checked === true) {
            selectAllCheckbox.checked = false;
        }

        if (!taskActionsBtns.classList.contains('opacity-0')) {
            taskActionsBtns.classList.add('opacity-0');
        }

        actions('task', taskActions);
    });
}

// GET NEWLY ADDED TASK
const getNewAddedTask = () => {
    if (localStorage.getItem('todos') !== null) {
        const todos = JSON.parse(localStorage.getItem('todos'));
        let newTask;

        if (Array.isArray(todos['task']) && todos['task'].length) {
            newTask = todos['task'].slice(-1);

            for (let i of newTask) {
                // CREATE ELEMENTS
                createElement(i);
            }

            getNumberOfTask('task', numberOfTask);

            if (taskActions.classList.contains('opacity-0')) {
                taskActions.classList.remove('opacity-0');
            }
        }
    }
}

// CREATE TASK
const createElement = (value) => {
    // CREATE ELEMENTS
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const p = document.createElement('p');
    // CREATE ATTRIBUTES FOR EVERY ELEMENT THAT HAD BEEN CREATED
    setAttribute(li, {
        class: 'px-2 py-2 flex'
    });
    setAttribute(checkbox, {
        type: 'checkbox',
        id: 'checkbox',
        name: 'checkbox',
        class: 'mr-2'
    });
    setAttribute(p, {
        class: 'whitespace-nowrap overflow-x-auto antialiased'
    });
    // APPEND TEXT CONTENT
    p.textContent = value;
    // APPEND ELEMENT
    li.append(checkbox, p);
    task.appendChild(li);
}

// GET TODOS 
const getTodos = (objPropertyName, task) => {
    // CHECK IF THERE IS AN ELEMENT OR TASKING EXISTING IN A DOCUMENT OR PAGE
    if (task.childElementCount !== 0) {
        taskList = task.children; // SELECT ALL THE TASK 
        const toArrayTaskList = Object.values(taskList); // I WANT TO CONVERT IT TO ARRAY AS A VALUE

        for (let i of toArrayTaskList) {
            i.remove(); // REMOVE ALL TASK THAT ARE EXISTING
        }
    }

    // CHECK IF THERE IS AN ITEM IN LOCALSTORAGE
    if (localStorage.getItem('todos') !== null) {
        const todos = JSON.parse(localStorage.getItem('todos'));

        // CHECK IF PROPERTY IS ARRAY AND IT HAS A VALUE
        if (objPropertyName === 'task') {
            if (Array.isArray(todos[objPropertyName]) && todos[objPropertyName].length) {
                for (let i of todos[objPropertyName]) {
                    createElement(i);
                }

                getNumberOfTask(objPropertyName, numberOfTask);
                actions('task'); // ACTIONS FOR TASK ONLY EITHER THE TASK WILL BE COMPLETE OR DELETE
            } else {
                getNumberOfTask(objPropertyName, numberOfTask);
                actions('task');
            }
        } else if (objPropertyName === 'deleted_task') {
            if (Array.isArray(todos[objPropertyName]) && todos[objPropertyName].length) {
                for (let i of todos[objPropertyName]) {
                    createElement(i);
                }
                // CHECK IF THERE IS A TASK ADDED
                if (task.childElementCount !== 0) {
                    const taskList = task.children; // SELECT ALL THE CHILD ELEMENTS
                    const arrTaskList = Object.values(taskList); // CONVERT OBJECT TO ARRAY

                    for (let i of arrTaskList) {
                        i.children[0].classList.add('hidden'); // HIDE CHECKBOX
                    }
                }

                getNumberOfTask(objPropertyName, numberOfTask);
                actions('deleted_task');
            } else {
                getNumberOfTask(objPropertyName, numberOfTask);
                actions('deleted_task');
            }
        } else if (objPropertyName === 'completed_task') {
            if (Array.isArray(todos[objPropertyName]) && todos[objPropertyName].length) {
                for (let i of todos[objPropertyName]) {
                    createElement(i);
                }
                // CHECK IF THERE IS A TASK ADDED
                if (task.childElementCount !== 0) {
                    const taskList = task.children; // SELECT ALL THE CHILD ELEMENTS
                    const arrTaskList = Object.values(taskList); // CONVERT OBJECT TO ARRAY

                    for (let i of arrTaskList) {
                        i.children[0].classList.add('hidden'); // HIDE CHECKBOX
                    }
                }

                getNumberOfTask(objPropertyName, numberOfTask);
                actions('completed_task');
            } else {
                getNumberOfTask(objPropertyName, numberOfTask);
                actions('completed_task');
            }
        } else {
            return false;
        }
    }
}

// TASK TYPE
const taskType = (taskName, value) => {
    if (taskName.textContent === '' || taskName.textContent === null) {
        taskName.textContent = value;
    } else {
        taskName.textContent = value;
    }
}

// GET NUMBER OF TASK
const getNumberOfTask = (objProperyName, numberOfTask) => {
    if (localStorage.getItem('todos') !== null) {
        const todos = JSON.parse(localStorage.getItem('todos'));

        if (objProperyName === 'task') {
            if (todos.hasOwnProperty(objProperyName)) {
                if (Array.isArray(todos[objProperyName]) && todos[objProperyName].length) {
                    return numberOfTask.textContent = 'Number of task: ' + todos[objProperyName].length;
                } else {
                    return numberOfTask.textContent = 'Number of task: ' + 0;
                }
            } else {
                return numberOfTask.textContent = 'Number of task: ' + 0;
            }
        } else if (objProperyName === 'completed_task') {
            if (todos.hasOwnProperty(objProperyName)) {
                if (Array.isArray(todos[objProperyName]) && todos[objProperyName].length) {
                    return numberOfTask.textContent = 'Number of completed task: ' + todos[objProperyName].length;
                } else {
                    return numberOfTask.textContent = 'Number of completed task: ' + 0;
                }
            } else {
                return numberOfTask.textContent = 'Number of completed task: ' + 0;
            }
        } else if (objProperyName === 'deleted_task') {
            if (todos.hasOwnProperty(objProperyName)) {
                if (Array.isArray(todos[objProperyName]) && todos[objProperyName].length) {
                    return numberOfTask.textContent = 'Number of deleted task: ' + todos[objProperyName].length;
                } else {
                    return numberOfTask.textContent = 'Number of deleted task: ' + 0;
                }
            } else {
                return numberOfTask.textContent = 'Number of deleted task: ' + 0;
            }
        } else {
            return false;
        }
    }
}

// GET USER NAME
const getUserName = () => {
    if (localStorage.getItem('todos') !== null) {
        const todos = JSON.parse(localStorage.getItem('todos'));

        if (todos.hasOwnProperty('user_name')) {
            if (todos['user_name'] === 'marielle') {
                return userName.textContent = 'Mahaaaal';
            } else {
                return userName.textContent = todos['user_name'].charAt(0).toUpperCase() + todos['user_name'].slice(1);
            }
        }
    }
}

// GET TASK
const getTask = () => {
    taskType(taskTitle, 'Task');
    getTodos('task', task);
}

// GET DELETED TASK
const getDeletedTask = () => {
    taskType(taskTitle, 'Deleted task');
    getTodos('deleted_task', task);
}

// GET COMPLETED TASK 
const getCompletedTask = () => {
    taskType(taskTitle, 'Completed task');
    getTodos('completed_task', task);
}

// SHOW ACTIONS
const actions = (objProperyName) => {
    if (localStorage.getItem('todos') !== null) {
        const todos = JSON.parse(localStorage.getItem('todos'));

        if (objProperyName === 'task') {
            if (todos.hasOwnProperty(objProperyName)) {
                if (Array.isArray(todos[objProperyName]) && todos[objProperyName].length) {
                    if (taskActions.classList.contains('opacity-0')) {
                        taskActions.classList.remove('opacity-0');
                    }
                }

                if (Array.isArray(todos[objProperyName]) && todos[objProperyName].length === 0) {
                    if (!taskActions.classList.contains('opacity-0')) {
                        taskActions.classList.add('opacity-0');
                    }
                }
            }
        } else {
            if (taskActions.classList.contains('opacity-0') || !taskActions.classList.contains('opacity-0')) {
                taskActions.classList.add('opacity-0');
            }
        }
    }
}

// SHOW/HIDE CONTENT AND DROPDOWN LIST
const contentToggle = () => {
    if (content.classList.contains('hidden') || !content.classList.contains('hidden') && dropdownList.classList.contains('active')) {
        content.classList.remove('hidden');
        dropdownList.classList.remove('active');
    }
}

// SELECT MENU DROPDOWN
const selectMenu = () => {
    menu.addEventListener('click', (e) => {
        switch (e.target.textContent) {
            case 'task':
                contentToggle();
                getTask();
                checkAllTask();
                checkTask();

                if (inputTaskContainer.classList.contains('hidden')) {
                    return inputTaskContainer.classList.remove('hidden');
                }

                if (selectAllCheckbox.checked) {
                    return selectAllCheckbox.checked = false;
                }

                break;
            case 'completed':
                contentToggle();
                getCompletedTask();

                if (inputTaskContainer.classList.contains('hidden') || !inputTaskContainer.classList.contains('hidden')) {
                    return inputTaskContainer.classList.add('hidden');
                }

                break;
            case 'deleted':
                contentToggle();
                getDeletedTask();

                if (inputTaskContainer.classList.contains('hidden') || !inputTaskContainer.classList.contains('hidden')) {
                    return inputTaskContainer.classList.add('hidden');
                }

                break;
        }
    });
}

// HIDE USER INPUT NAME FORM IF THE USER NAME WAS ALREADY ADDED TO LOCALSTORAGE
const viewUserInputName = (userContainer, taskContainer) => {
    if (localStorage.getItem('todos') !== null) {
        if (taskContainer.classList.contains('hidden') && !userContainer.classList.contains('hidden')) {
            taskContainer.classList.remove('hidden');
            userContainer.classList.add('hidden');

            getUserName();
        }
    }
}

// Dropdown button for select options
const dropdownSelectOptions = (button, dropdownList) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        if (dropdownList.classList.contains('hidden')) {
            return dropdownList.classList.toggle('active');
        }
    });
}

// SELECT ALL TASK
const checkAllTask = () => {
    // SELECT ALL TASK
    selectAllCheckbox.addEventListener('click', (e) => {
        const taskList = task.children;
        const arrTaskList = Object.values(taskList); // Task to array

        if (e.currentTarget.checked === true) {
            if (taskActionsBtns.classList.contains('opacity-0')) {
                taskActionsBtns.classList.remove('opacity-0'); // SHOW ACTION BUTTONS
            }

            for (let i of arrTaskList) {
                if (i.children[0].checked === false) {
                    i.children[0].checked = true;
                }
            }

            completeTask();
            deleteTask();
        } else {
            if (!taskActionsBtns.classList.contains('opacity-0')) {
                taskActionsBtns.classList.add('opacity-0'); // HIDE ACTION BUTTONS
            }

            for (let i of arrTaskList) {
                if (i.children[0].checked === true) {
                    i.children[0].checked = false;
                }
            }
        }
    });
}

// SELET TASK 
const checkTask = () => {
    const taskList = task.children;
    const arrTaskList = Object.values(taskList); // Task to array

    task.addEventListener('click', (e) => {
        if (e.target.checked) {
            if (taskActionsBtns.classList.contains('opacity-0')) {
                taskActionsBtns.classList.remove('opacity-0'); // SHOW ACTION BUTTONS
            }
        } else {
            if (!taskActionsBtns.classList.contains('opacity-0')) {
                taskActionsBtns.classList.add('opacity-0'); // SHOW ACTION BUTTONS
            }

            for (let i of arrTaskList) {
                if (i.children[0].checked) {
                    if (taskActionsBtns.classList.contains('opacity-0')) {
                        taskActionsBtns.classList.remove('opacity-0'); // SHOW ACTION BUTTONS
                    }
                }
            }

            if (selectAllCheckbox.checked) {
                selectAllCheckbox.checked = false;
            }
        }
    });
}

// Main  
const main = () => {
    setUserName(userNameForm, userInputName, userNameContainer, userTaskContainer);
    setTask(userTaskForm, inputTask);
    dropdownSelectOptions(dropdownButton, dropdownList);
    document.addEventListener('DOMContentLoaded', () => {
        viewUserInputName(userNameContainer, userTaskContainer);
    });
    selectMenu();
}

main();