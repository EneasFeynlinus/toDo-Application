const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const formSearch = document.querySelector('.form-search input')

const addTodo = (inputValue) => {

    if (inputValue.length) {
        todosContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-todos="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        `
    }
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value
    addTodo(inputValue)
    event.target.reset()
})

const removeTodos = (clickedElement) => {
    const trashValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todos="${trashValue}"]`)
    if (trashValue) {
        todo.remove()
    }
}

todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    removeTodos(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todos => {
        const matchedTodos = todos.textContent.toLocaleLowerCase().includes(inputValue)
        return returnMatchedTodos ? matchedTodos : !matchedTodos
    })

const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todos => {
        todos.classList.remove(classToRemove)
        todos.classList.add(classToAdd)
    })
}


const hideTodos = (todos, inputValue) => {
    const totosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(totosToHide, 'hidden', 'd-flex')

}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

formSearch.addEventListener('input', event => {
    const inputValue = event.target.value
    const todos = Array.from(todosContainer.children)

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)

})

const clockContainer = document.querySelector('.clock-container')

const clockUpdate = () => {
    const time = new Date()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const seconds = time.getSeconds()

    const insertClock = `
    <span>${String(hour).length === 1 ? `0${hour}` : hour}</span> :
    <span>${String(minute).length === 1 ? `0${minute}` : minute}</span> :
    <span>${String(seconds).length === 1 ? `0${seconds}` : seconds}</span>
    `
    clockContainer.innerHTML = insertClock
}

setInterval(clockUpdate, 1000)