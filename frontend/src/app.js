let addTaskBtn = document.getElementById('add-task-btn')
let addTaskCard = document.getElementById('card-form-task')
let cancelTaskCard = document.getElementById('cancel-task')
let saveTask = document.getElementById('save-task')
let message = document.getElementById('message')
let taskCardList = document.querySelector('.task-card-list')

document.addEventListener('DOMContentLoaded', renderNoList)

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

function renderCardList() {
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

    let div = document.createElement('div')
    div.className = 'col-12 col-sm col-sm-12 col-md-4 col-lg-4 my-2'

    let card = `
      <div class="card rounded shadow bg-card">
        <div class="card-body">
          <span class="d-flex flex-row justify-content-between">
            <h3>${title.value}</h3>
            <h2 class="delete-card text-danger" title="Delete card">&times;</h2>
          </span>
          <p>
            ${description.value}
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

function deleteCardFun() {
  let deleteCard = document.querySelectorAll('.delete-card')
  console.log(deleteCard)
  deleteCard.forEach((dcard, idx) => {
    dcard.addEventListener('click', (e) => {
      dcard.parentElement.parentElement.parentElement.parentElement.remove()
      if (idx == 0) {
        renderNoList()
      }
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
