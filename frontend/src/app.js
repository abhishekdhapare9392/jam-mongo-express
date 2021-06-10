let addTaskBtn = document.getElementById('add-task-btn')
let addTaskCard = document.getElementById('card-form-task')
let cancelTaskCard = document.getElementById('cancel-task')
let saveTask = document.getElementById('save-task')
let message = document.getElementById('message')
let message1 = document.getElementById('message2')
let taskCardList = document.querySelector('.task-card-list')

document.addEventListener('DOMContentLoaded', renderNoList)
// Funtion call on load for task list
document.addEventListener('DOMContentLoaded', getTasks)

function renderNoList() {
  if (taskCardList.innerHTML == '') {
    let div = document.createElement('div')
    div.className = 'col-12 col-sm col-sm-12 col-md-12 col-lg-12 text-center'
    let text = '<h5>No task listed!</h5>'
    div.innerHTML = text
    taskCardList.appendChild(div)
  }
}

// Inputs
let title = document.getElementById('title')
let description = document.getElementById('description')

addTaskBtn.addEventListener('click', (e) => {
  // console.log(e.target.innerText)
  addTaskCard.style.display = 'flex'
  addTaskCard.style.animation = 'fadeIn 0.3s linear'
})

cancelTaskCard.addEventListener('click', (e) => {
  addTaskCard.style.display = 'none'
  addTaskCard.style.animation = 'fadeOut 0.3s linear'
})

saveTask.addEventListener('click', renderCardList)

async function renderCardList() {
  let title = document.getElementById('title')
  let description = document.getElementById('description')
  // console.log(title.value)
  let taskData = {
    title: title.value,
    description: description.value,
  }

  if (
    title.value != null &&
    title.value != '' &&
    description.value != null &&
    description.value != ''
  ) {
    if (
      taskCardList.firstElementChild.firstElementChild.classList.contains(
        'card',
      ) == false
    ) {
      taskCardList.innerHTML = ''
    }

    let res = await fetch('http://localhost:3000/api/v1/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })

    let data = await res.json()

    const { title, description, _id } = await data.task

    let div = document.createElement('div')
    div.className = 'col-12 col-sm col-sm-12 col-md-4 col-lg-4 my-2'

    let card = `
      <div class="card rounded shadow bg-card">
        <div class="card-body">
          <span class="d-flex flex-row justify-content-between">
            <h3>${title}</h3>
            <h2 class="delete-card text-danger" title="Delete card" data-id="${_id}">&times;</h2>
          </span>
          <p>
            ${description}
          </p>
          <button type="button" class="btn btn-info btn-lg done-btn">
            Done
          </button>
        </div>
      </div>
      `

    div.innerHTML = card
    taskCardList.appendChild(div)
    title.value = ''
    description.value = ''
  } else {
    showMessage('alert alert-danger', 'Please fill all fields!')
  }

  deleteCardFun()
  doneTaskCard()
}

function showMessage(classNames, msg) {
  let div = document.createElement('div')
  div.className = classNames
  div.innerText = msg

  message.appendChild(div)

  setTimeout(function () {
    let alerts = document.querySelectorAll('.alert')
    alerts.forEach((alert) => {
      alert.remove()
    })
  }, 5000)
}

function showMessage1(classNames, msg) {
  let div = document.createElement('div')
  div.className = classNames
  div.innerText = msg

  message1.appendChild(div)

  setTimeout(function () {
    let alerts = document.querySelectorAll('.alert')
    alerts.forEach((alert) => {
      alert.remove()
    })
  }, 5000)
}

function deleteCardFun() {
  let deleteCard = document.querySelectorAll('.delete-card')
  deleteCard.forEach((dcard, idx) => {
    dcard.addEventListener('click', (e) => {
      dcard.parentElement.parentElement.parentElement.parentElement.remove()
      if (idx == 0) {
        renderNoList()
      }
      // console.log(e.target)
      deleteCardTask(e.target.getAttribute('data-id'))
    })
  })
  // console.log(deleteCard.length)
}

function doneTaskCard() {
  let doneCards = document.querySelectorAll('.done-btn')
  doneCards.forEach((doneCard, idx) => {
    doneCard.addEventListener('click', (e) => {
      doneCard.parentElement.parentElement.classList.add('done')
      doneCard.parentElement.parentElement.classList.remove('bg-card')
      e.target.disabled = true
    })
  })
}

async function getTasks() {
  let res = await fetch('http://localhost:3000/api/v1/tasks')
  let data = await res.json()
  renderTaskList(data)
}

function renderTaskList(tasks) {
  if (
    taskCardList.firstElementChild.firstElementChild.classList.contains(
      'card',
    ) == false
  ) {
    taskCardList.innerHTML = ''
  }
  tasks.forEach((task) => {
    const { title, description, _id } = task
    let div = document.createElement('div')
    div.className = 'col-12 col-sm col-sm-12 col-md-4 col-lg-4 my-2'

    let card = `
            <div class="card rounded shadow bg-card">
              <div class="card-body">
                <span class="d-flex flex-row justify-content-between">
                  <h3>${title}</h3>
                  <h2 class="delete-card text-danger" title="Delete card" data-id="${_id}">&times;</h2>
                </span>
                <p>
                  ${description}
                </p>
                <button type="button" class="btn btn-info btn-lg done-btn">
                  Done
                </button>
              </div>
            </div>
            `

    div.innerHTML = card
    taskCardList.appendChild(div)
  })

  deleteCardFun()
  doneTaskCard()
}

async function deleteCardTask(id) {
  let res = await fetch(`http://localhost:3000/api/v1/deleteTask/${id}`, {
    method: 'DELETE',
  })

  let data = await res.json()

  showMessage1('alert alert-success', data.message)
}
