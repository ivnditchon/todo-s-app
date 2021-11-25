const addTaskBtn = document.querySelector('#add_task');
const createTask = document.querySelector('#create_task');
const listTask = document.querySelector('#task');


const setTask = (addTask) => {
    const tasks = [];
    
    addTask.addEventListener('click', () => {
        const createTaskVal = createTask.value.trim();
        
        tasks.push(createTaskVal);

        if (localStorage.getItem('task') == null) {
            localStorage.setItem('task', JSON.stringify(tasks));
        } else {
            localStorage.setItem('task', JSON.stringify(tasks));
        }
    });
}

const getTask = () => {
    const disp = localStorage.getItem('task');
    const mydisp = JSON.parse(disp);
 
    let ii = '';

    for (let i of mydisp) {
        ii += '<li>'+ i + '</li>'
    }

    listTask.insertAdjacentHTML('beforeend', ii);
}

const main = () => {
    setTask(addTaskBtn);
    getTask();
}

main();

/*const todoApp = {
    elem: {
        addTaskBtn: document.querySelector('#add_task')
    },
    createTask() {
        todoApp.elem['addTaskBtn'].addEventListener('click', () => {
            console.log('Clicked!');
        });
    },
    init() {
        return createTask();
    }
};
// Destructuring  object
const { createTask, init } = todoApp;

// Main function
const main = () => {
    init();
}

// Invoke main function
main();*/