const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputFormSearch = document.querySelector('.form-search input')
const clockContainer = document.querySelector('.clock-container')

const addTodo = event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()

    if (inputValue.length) {
        todosContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-todos="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        </li>
        `
    }
    event.target.reset()
}

const removeTodo = event => {
    const isTrashValueClicked = event.target.dataset.trash

    if (isTrashValueClicked) {
        const todo = document.querySelector(`[data-todos="${isTrashValueClicked}"]`)
        todo.remove()
    }
}

const searchTodo = event => {
    const inputValue = event.target.value.toLowerCase()
    const todos = Array.from(todosContainer.children)
        .map(todo => ({
            todo,
            shouldBeVisible: todo.textContent.toLowerCase().includes(inputValue)
        }))

    todos.forEach(({ todo, shouldBeVisible }) => {
        todo.classList.add(shouldBeVisible ? 'd-flex' : 'hide')
        todo.classList.remove(shouldBeVisible ? 'hide' : 'd-flex')
    })

}


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

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
inputFormSearch.addEventListener('input', searchTodo)
