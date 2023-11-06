const todoUl = document.querySelector('.todos')
const input = document.querySelector('.input')
const form = document.querySelector('form')
const addBtn = document.querySelector('.add-todo')
const editBtn = document.querySelector('.edit-todo')

const api = 'https://projectofmine-9bbbc-default-rtdb.asia-southeast1.firebasedatabase.app/myProject'


function MainPart(text , id) {
    return `
    <li class="todo" id="${id}">
    <p class="text">${text}</p>
    <div class="actions">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</li>
`
}

function fetchOfProject(){
    return fetch(api + '.json').then(response => response.json())
}

fetchOfProject().then(items => {
    for(let key in items){
        todoUl.innerHTML += MainPart(items[key].myProject, key)
    }
})


form.addEventListener('submit',(e) =>{
    e.preventDefault()
        // if(input.value.length === 0){
        //     return
        // }

    fetch(`${api}.json`, {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({myProject: input.value})
    })
    .then(res => res.json())
    .then(Newtodo =>{
        const NewtodoId = Newtodo.name
        const NewtodoText = Newtodo.value

        todoUl.innerHTML += MainPart(NewtodoText,NewtodoId)
        input.value = ''
    })
})
























// const form = document.querySelector('form')
// const input = form.querySelector('input')
// const todosWrapper = document.querySelector('.todos')
// const editTodoBtn = document.querySelector('.edit-todo')
// const addTodoBtn = document.querySelector('.add-todo')

// const api = 'https://todosss-b6f94-default-rtdb.firebaseio.com/todo'

// function todoElement(text, id) {
//     return `
//     <li class="todo" id="${id}">
//         <p class="text">${text}</p>
//         <div class="actions">
//             <button class="edit">
//                 <i class="fas fa-edit"></i>
//             </button>
//             <button class="delete">
//                 <i class="fas fa-trash"></i>
//             </button>
//         </div>
//     </li>
//     `
// }

// function fetchTodos() {
//     return fetch(api + '.json').then(res => res.json())
// }

// // GET TODOS
// fetchTodos().then(todos => {
   
//     for (let key in todos) {
//         todosWrapper.innerHTML += todoElement(todos[key].todo, key)
//     }
// })

// form.addEventListener('submit', e => e.preventDefault())

// // CREATE TODO
// addTodoBtn.addEventListener('click', () => {
//     if (input.value.length === 0) {
//         return
//     }

//     fetch(${api}.json, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({ todo: input.value })
//     })
//     .then(res => res.json())
//     .then(newTodo => {
//         const newTodoId = newTodo.name
//         const newTodoText = input.value

//         todosWrapper.innerHTML += todoElement(newTodoText, newTodoId)
//         input.value = ''
//     })
// })

// // DELETE TODO
// todosWrapper.addEventListener('click', (e) => {
//     if(!e.target.classList.contains('delete')) {
//         return
//     }
//     const areYouSure = confirm('Do you want to delete todo?')
//     if(!areYouSure) {
//         return
//     }
//     const liElement = e.target.parentElement.parentElement
//     fetch(${api}/${liElement.id}.json, { method: 'DELETE' })
//     .then(() => {
//         liElement.remove()
//     })
// })

// // EDIT TODO
// let todoToEditId = null
// let todoToEditText = null
// let liElement = null

// todosWrapper.addEventListener('click', (e) => {
//     if(!e.target.classList.contains('edit')) {
//         return
//     }
//     liElement = e.target.parentElement.parentElement
//     todoToEditId = liElement.id
//     todoToEditText = liElement.querySelector('.text').innerText
//     input.value = todoToEditText

//     editTodoBtn.style.display = 'block'
//     addTodoBtn.style.display = 'none'
//     input.focus()
// })

// editTodoBtn.addEventListener('click', () => {
//     fetch(${api}/${todoToEditId}.json, {
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({ todo: input.value })
//     })
//     .then( res =>res.json())
//     .then(editedTodo => {
//         editTodoBtn.style.display = 'none'
//         addTodoBtn.style.display = 'block'
//         liElement.querySelector('.text').innerText = editedTodo.todo
//         input.value = ''
//     })
// })