var todotag = document.getElementById('todo');
var todo_input = document.getElementById('todo_input');
var checkboxHtml = document.getElementsByClassName('toggle_checkbox');


var todos = [
  {
    id: 1,
    todo: 'go to market',
    complete: true
  },
  {
    id: 2,
    todo: 'purchase vegetable',
    complete: false
  },
  {
    id: 3,
    todo: 'are you hungry now ?',
    complete : true
  },
  {
    id: 4,
    todo: 'what are you doing ?',
    complete : false
  },
];

function generateTodos (todos) {
  var mytodos = '<ul>';
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i].todo ;
    var checkbox = `<input class="toggle_checkbox" type="checkbox" value="${todos[i].id}" >`;
    if (todos[i].complete) {
     checkbox = `<input class="toggle_checkbox" type="checkbox"  value="${todos[i].id}" checked>`;
     todo = `<span class="line_through">${todo}</span>`;
    }
    var deleteButton = ` <button class="delete_button" value='${todos[i].id}'>delete</button> `;
    var updateButton = ` <button class="update_button" value='${todos[i].id}'>edit</button> `;
    var yesButton = ` <button class="yes_button" value='${todos[i].id}'>yes</button> `; 
    var NoButton = ` <button class="No_button" value='${todos[i].id}'>No</button> `; 
    var todohtml = checkbox + todo + updateButton + deleteButton + yesButton + NoButton;
    var mytodos = mytodos + '<li>'+ todohtml +'</li>';
  }
  var mytodos = mytodos + '<ul>';
  return mytodos;
}

function addTodoInDom () {
  todotag.innerHTML = generateTodos(todos);
}






function updateDom (id) {
    var todo = todos.find(function(todo) {
      return todo.id == id
    })
    console.log('todo', todo);
    
  var input = `
      <h1>Update todo </h1>
      <input data-id="${ todo.id }" onkeypress="updateTodo(event)" type="text" id='updatedom_input' value="${todo.todo}" />
    `
    document.getElementById('update_todo').innerHTML = input;
}

function updateTodo(event) {
  var update_input = document.getElementById('updatedom_input');
  if (event.charCode === 13 && update_input.value.length > 1) {
    var id = update_input.dataset.id;
    var value = update_input.value
    var seletedTodo = todos.find(function(todo) {
      return todo.id == id
    })
    var seletedTodoIndex = todos.findIndex(function(todo) {
      return todo.id == id
    }) 
    var todo = {
      complete: seletedTodo.complete,
      id: seletedTodo.id,
      todo: value
    }
    todos.splice(seletedTodoIndex, 1, todo)
    addTodoInDom();
    document.getElementById('update_todo').innerHTML = '';
  }
}
addTodoInDom();

todo_input.addEventListener('keypress', function (e) {
  if (e.charCode === 13 && todo_input.value.length > 1) {
    todos.push ( {
      id: todos.length + 1,
      complete: false,
      todo: todo_input.value
    });
    addTodoInDom();
    todo_input.value = "";
  }
})

function toggleCompletion (id, bool) {
  console.log('t', id);
    var seletedTodo = todos.find(function(todo) {
      return todo.id == id
    })
    var seletedTodoIndex = todos.findIndex(function(todo) {
      return todo.id == id
    }) 
    var todo = {
      complete: bool,
      id: seletedTodo.id,
      todo: seletedTodo.todo
    }
    todos.splice(seletedTodoIndex, 1, todo)
    addTodoInDom();
}

function deleteTodo (id) {
  var seletedTodoIndex = todos.findIndex(function(todo) {
    return todo.id == id;
  }) 
  todos.splice(seletedTodoIndex, 1);
  addTodoInDom();
}

for (var i = 0; i < checkboxHtml.length; i++) {
  checkboxHtml[i].addEventListener("click", function () {

  });
}


document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.className.toLowerCase() === 'toggle_checkbox') {
    toggleCompletion(event.target.value, event.target.checked)
    console.log(event.target.value)
  } 
  if (event.target.className.toLowerCase() === 'delete_button') {
    deleteTodo(event.target.value);
  } 
  if (event.target.className.toLowerCase() === 'update_button') {
    updateDom(event.target.value);
  } 
});