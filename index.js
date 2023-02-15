//index.js

const url = 'http://10.150.36.227:8000';

function onClickCreateButton() {
    const titleInputElement = document.querySelector('#input-title');
    const listElement = document.querySelector('.todo-list');

    const data = {
        title: titleInputElement.value
    };

    fetch(`${url}/todo`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json()).then((res) => {
        const { id, title, primary } = res;
        listElement.appendChild(createTodoItem(id, title, primary))
    });
}

function createTodoItem(id, title, primary) {
    const item = document.createElement('div');
    item.id = id;
    item.className = 'item';

    const titleElement = document.createElement('div');
    const removeElement = document.createElement('div');

    titleElement.innerText = title;

    titleElement.className = 'title';
    removeElement.className = 'remove';

    item.appendChild(titleElement);
    item.appendChild(removeElement);

    const properties = {
        id: id,
        primary: primary
    };
    removeElement.addEventListener('click', function () {
        fetch(`${url}/todo/${item.id}`, {
            method: 'delete',
            mode: 'cors',
        }).then(() => {
            item.remove();
            delete properties;
        });
        
    });


    item.addEventListener('click', function () {
        properties.primary = !!!properties.primary;

        fetch(`${url}/todo/${item.id}`, {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primary: properties.primary
            })
        }).then(() => {
            if (properties.primary) {
                item.style.backgroundColor = '#ffffcc';
            } else {
                item.style.backgroundColor = '#FFF';
            }
        });
    });

    if (properties.primary) {
        item.style.backgroundColor = '#ffffcc';
    } else {
        item.style.backgroundColor = '#FFF';
    }
    
    return item;
}


function fetchTodo() {
    const listElement = document.querySelector('.todo-list');
    fetch(`${url}/todo`, {
        mode: 'cors'
    }).then((res) => res.json()).then((res) => {
        const { todos } = res;
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            listElement.appendChild(createTodoItem(todo.id, todo.title, todo.primary))
        }
    });
}

// {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   }