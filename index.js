//index.js
function onClickCreateButton() {
    const titleInputElement = document.querySelector('#input-title');
    const todoListElement = document.querySelector('.todo-list');

    const item = createTodoItem(titleInputElement.value);

    todoListElement.appendChild(item);
}

function createTodoItem(title) {
    const item = document.createElement('div');
    item.className = 'item';

    const titleElement = document.createElement('div');
    const removeElement = document.createElement('div');

    titleElement.innerText = title;

    titleElement.className = 'title';
    removeElement.className = 'remove';

    item.appendChild(titleElement);
    item.appendChild(removeElement);
    
    const properties = {
        priority: false
    };
    removeElement.addEventListener('click', function () {
        item.remove();
        delete properties;
    });


    item.addEventListener('click',function(){
        properties.priority = !!!properties.priority;

        if(properties.priority){
            item.style.backgroundColor = '#ffffcc';
        } else{
            item.style.backgroundColor = '#FFF';
        }
    });

    return item;
}