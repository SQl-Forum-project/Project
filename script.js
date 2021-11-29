var data = [];
try {
    var x = JSON.parse(localStorage.getItem('todos'));
    if (!x) {
    }
    else {
        for (let i = 0; i < x.length; i++) {
            const element = x[i];
            data.push(element);
        }
    }
}
catch (e) {
    console.log('op');
}
const todoItemsList = document.querySelector('.todoitems');
function func() {
    const task = document.getElementById("task").value;
    var todo = {
        id: Date.now(),
        name: task,
        completed: false
    };
    data.push(todo);
    addToLocalStorage(data)
    document.getElementById("task").value = ''
}
function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.innerHTML = `
        <div class="row">
        <div class="col-2 ">

         
        <input class="form-check-input strikethrough text-center" type="checkbox" aria-label="Checkbox for following text input" onclick="check_me(${item.id});" ${checked}>
      </input></div>
     <div class="col-8  ">
      <p class="text-center  font-monospace fs-4 text-white "  id="${item.id + 'P'}"  "><del>${item.name}</del></p></div>
      <div class="col-2">
      <button type="button" id="${item.id + 'del'}" class="btn btn-danger disabled" onclick="delete_me(${item.id})">Delete</button>
      <button type="button" id="${item.id + 'ed'}" class="btn btn-primary disabled" onclick="edit(${item.id})">Edit</button>
    </div>
</div>

    `;
            todoItemsList.append(li);

        }
        else {

            li.innerHTML = `
            <div class="row">
              <div class="col-2 ">
                
                
                <input class="form-check-input strikethrough text-center" type="checkbox" aria-label="Checkbox for following text input" onclick="check_me(${item.id});" ${checked}>
                </input></div>
                <div class="col-8  ">
                  <p class="text-center  font-monospace fs-4 text-white "  id="${item.id + 'P'}"  ">${item.name}</p></div>
                  <div class="col-2">
                    <button type="button" id="${item.id + 'del'}" class="btn btn-danger " onclick="delete_me(${item.id})">Delete</button>
                    <button type="button" id="${item.id + 'ed'}" class="btn btn-primary " onclick="edit(${item.id})">Edit</button>
                    </div>
                    </div>
                    
                    `;
            todoItemsList.append(li);
        }
    });

}
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
function delete_me(id) {
    var temp = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < temp.length; i++) {
        if (id === temp[i].id) {
            temp.splice(i, 1);
            addToLocalStorage(temp)
            data.splice(i, 1);
        }
    }
}
function check_me(id) {
    document.getElementById(id + "del").classList = 'btn btn-danger disabled';
    document.getElementById(id + "ed").classList = 'btn btn-primary disabled';
    const get_text = document.getElementById(id + "P").innerHTML
    document.getElementById(id + "P").innerHTML = ""
    $('#' + id + "P").append(`<del>${get_text}</del>`);
    var temp = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < temp.length; i++) {
        if (id === temp[i].id) {
            var obj = data[i]
            if (obj.completed) {
                obj.completed = false;
            }
            else {
                obj.completed = true;
            }
            data[i] = obj;
            addToLocalStorage(data);
        }
    }
}

getFromLocalStorage();
function edit(id) {
    var my_text = document.getElementById(id + "ed").innerHTML
    if (my_text === 'Edit') {

        console.log("ok");
        var t = document.getElementById(id + "P").innerHTML
        var text = $('#' + id + "P").text();
        var input = $(`<input type="text" class="form-control col-xs-4" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="${id + 'in'}" value="${text}" />`)
        $('#' + id + "P").replaceWith(input);
        document.getElementById(id + "ed").innerHTML = "Save"
        console.log(text);
    }
    if (my_text === 'Save') {
        console.log("ok");
        var text = $('#' + id + "in").val();
        console.log(text);
        var temp = JSON.parse(localStorage.getItem('todos'));
        for (let i = 0; i < temp.length; i++) {
            if (id === temp[i].id) {
                var todo = {
                    id: Date.now(),
                    name: text,
                    completed: false
                };
                data[i] = todo;
                addToLocalStorage(data)
            }
        }

        var input = $(`<p class="text-center  font-monospace fs-4 text-white  rounded-pill-left border-right-0 " id="${id + 'P'}" style="width: 6rem ;">${text}</p>`)
        $('#' + id + "in").replaceWith(input);
        document.getElementById(id + "ed").innerHTML = "Save"
    }
}