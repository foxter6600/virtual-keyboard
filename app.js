import { keyEvents } from './keyEvents.js'
import { keyCode } from './keyEvents.js'

document.body.insertAdjacentHTML(
  'afterbegin',
  `<div class="wrapper">
  <header class="header">
  <h1>RSS Virtual Keyboard</h1></header>
  <main class="main">
  <textarea cols="124" rows="20"></textarea>
  <div class="keyboard"></div>
  </main>
  <footer class="footer">
    <p>Клавиатура создана в операционной системе Windows</p>
    <p>Для переключения языка комбинация: левые alt + ctrl</p>
  </footer>
</div>`
)

const keyboard = document.querySelector('.keyboard')

for (let i = 0; i < 64; i++) {
  const div = document.createElement('div')
  div.classList.add('key')
  if (keyEvents[i].style) {
    div.classList.add(keyEvents[i].style)
  }
  div.setAttribute('id', i)
  div.textContent = keyEvents[i].enKey
  keyboard.append(div)
}

// PreventDefault

window.addEventListener('keydown', function (e) {
  // if (e.altKey) {
  e.preventDefault()
  // }
})

// Lang

let lang = 'en'

function updateKeyContent() {
  // console.log(capsLock)
  for (let i = 0; i < 64; i++) {
    const key = document.getElementById(i)
    if (lang === 'en') {
      if (capsLock && keyEvents[i].enKeyCaps) {
        key.textContent = keyEvents[i].enKeyCaps
      } else {
        key.textContent = keyEvents[i].enKey
      }
    } else {
      if (capsLock && keyEvents[i].ruKeyCaps) {
        key.textContent = keyEvents[i].ruKeyCaps
      } else if (keyEvents[i].ruKey) {
        key.textContent = keyEvents[i].ruKey
      }
    }
  }
}

document.addEventListener('keydown', (e) => {
  // console.log(e)
  if ((e.ctrlKey && e.code === 'AltLeft') || (e.altKey && e.code === 'ControlLeft')) {
    lang === 'en' ? (lang = 'ru') : (lang = 'en')
    // console.log(lang)
    updateKeyContent()
  }
})

// Shift
let isShiftPressed = false

document.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') {
    isShiftPressed = true
    shiftHandle()
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    isShiftPressed = false
    shiftHandle()
    isShiftPressed = false
  }
})

function shiftHandle() {
  for (let i = 0; i < 64; i++) {
    const key = document.getElementById(i)
    if (lang === 'en') {
      if (isShiftPressed) {
        if (keyEvents[i].enKeyShift) {
          key.textContent = keyEvents[i].enKeyShift
        }
      } else {
        key.textContent = keyEvents[i].enKey
      }
    } else if (lang === 'ru') {
      if (isShiftPressed) {
        if (keyEvents[i].ruKeyShift) {
          key.textContent = keyEvents[i].ruKeyShift
        } else if (keyEvents[i].ruKey) {
          key.textContent = keyEvents[i].ruKey
        }
      } else {
        key.textContent = keyEvents[i].enKey
      }
    }
  }
}

//EnInit

function defaultLang() {
  for (let i = 0; i < 64; i++) {
    const key = document.getElementById(i)
    if (lang === 'en') {
      key.textContent = keyEvents[i].enKey
    } else if (lang === 'ru') {
      if (key.ruKey) {
        key.textContent = keyEvents[i].ruKey
      } else {
        key.textContent = keyEvents[i].enKey
      }
    }
  }
}

// CapsLock

let capsLock = false

document.addEventListener('keydown', (e) => {
  if (e.key === 'CapsLock') {
    capsLock === false ? (capsLock = true) : (capsLock = false)
    if (capsLock) {
      capsLockHandle()
    } else {
      defaultLang()
    }
  }
})

function capsLockHandle() {
  for (let i = 0; i < 64; i++) {
    const key = document.getElementById(i)
    if (capsLock) {
      if (lang === 'en') {
        if (keyEvents[i].enKeyCaps) {
          key.textContent = keyEvents[i].enKeyCaps
        } else {
          key.textContent = keyEvents[i].enKey
        }
      } else if (lang === 'ru') {
        if (keyEvents[i].ruKeyCaps) {
          key.textContent = keyEvents[i].ruKeyCaps
        } else if (key.ruKey) {
          key.textContent = keyEvents[i].ruKey
        } else {
          key.textContent = keyEvents[i].enKey
        }
      }
    }
  }
}

// HighLight
const keys = document.querySelectorAll('.key')

document.addEventListener('keydown', (e) => {
  for (let i = 0; i < keyCode.length; i++) {
    if (keyCode[i] === e.code) {
      keys[i].classList.add('key-pressed')
    }
  }
})

document.addEventListener('keyup', (e) => {
  for (let i = 0; i < keyCode.length; i++) {
    if (keyCode[i] === e.code) {
      if (keys[i].classList.contains('key-pressed')) {
        keys[i].classList.remove('key-pressed')
      }
    }
  }
})

// console.log(keyEvents)
// document.addEventListener('keydown', function (event) {
// keyEvents[event.code] = { enKey: event.key }
// console.log(keyEvents)
// if (event.shiftKey && event.code !== 'ShiftLeft' && event.code !== 'ShiftRight') {
//   keyEvents[event.code].ruKeyShift = event.key
//   console.log(keyEvents)
// }
// keyEvents[event.code].ruKey = event.key
// console.log(keyEvents)
//   if (event.shiftKey && event.code !== 'ShiftLeft' && event.code !== 'ShiftRight') {
//     keyEvents[event.code].enKeyShift = event.key
//     console.log(keyEvents)
//   }
// keyEvents[event.code].ruKey = event.key
// console.log(keyEvents)

// CapsLock
//   let capsLockOn = event.getModifierState('CapsLock')

//   if (capsLockOn) {
//     keyEvents[event.code].ruKeyCaps = event.key
//     console.log(keyEvents)
//   }
// })

// document.addEventListener('keydown', (e) =>
//   keyboardData.push({
//     key: event.key,
//     code: event.code,
//   })
// console.log(e)
// )
// document.onkeydown = (e) => {
// console.log(e)
// keyboardData.push(e)
// console.log(keyboardData)

// console.log(keyboardData)
// }
// document.addEventListener('keydown', (e) => console.log(e))
