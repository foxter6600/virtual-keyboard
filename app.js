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

// Lang
let lang

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en')
}
lang = localStorage.getItem('lang')

for (let i = 0; i < 64; i++) {
  const div = document.createElement('div')
  div.classList.add('key')
  if (keyEvents[i].style) {
    div.classList.add(keyEvents[i].style)
  }
  div.setAttribute('id', i)
  if (!localStorage.getItem('lang')) {
    div.textContent = keyEvents[i].enKey
  } else {
    if (lang === 'en') {
      div.textContent = keyEvents[i].enKey
    } else if (lang === 'ru') {
      if (keyEvents[i].ruKey) {
        div.textContent = keyEvents[i].ruKey
      } else {
        div.textContent = keyEvents[i].enKey
      }
    }
  }

  keyboard.append(div)
}

// PreventDefault

window.addEventListener('keydown', function (e) {
  // if (e.altKey) {
  e.preventDefault()
  // }
})

// Lang

function updateKeyContent() {
  lang = localStorage.getItem('lang')

  for (let i = 0; i < 64; i++) {
    const key = document.getElementById(i)
    if (lang === 'en') {
      if (capsLock && keyEvents[i].enKeyCaps) {
        key.textContent = keyEvents[i].enKeyCaps
      } else {
        key.textContent = keyEvents[i].enKey
      }
      // localStorage.setItem('lang', 'en')
      // lang = localStorage.getItem('lang')
    } else if (lang === 'ru') {
      if (capsLock && keyEvents[i].ruKeyCaps) {
        key.textContent = keyEvents[i].ruKeyCaps
      } else if (keyEvents[i].ruKey) {
        key.textContent = keyEvents[i].ruKey
      } else {
        key.textContent = keyEvents[i].enKey
      }
      // localStorage.setItem('lang', 'ru')
      // lang = localStorage.getItem('lang')
    }
  }
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.code === 'AltLeft') || (e.altKey && e.code === 'ControlLeft')) {
    lang === 'en' ? localStorage.setItem('lang', 'ru') : localStorage.setItem('lang', 'en')

    updateKeyContent()
    // if (capsLock) {
    //   capsLockHandle()
    // }
  }
})

// Shift
let isShiftPressed = false

document.addEventListener('keydown', (e) => {
  if (e.key === 'Shift') {
    if (capsLock) {
      isShiftPressed = false
      shiftHandle()
    } else {
      isShiftPressed = true
      shiftHandle()
    }
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    if (capsLock) {
      isShiftPressed = true
      shiftHandle()
    } else {
      isShiftPressed = false
      shiftHandle()
      isShiftPressed = false
    }
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
        } else {
          key.textContent = keyEvents[i].enKey
        }
      } else {
        if (keyEvents[i].ruKey) {
          key.textContent = keyEvents[i].ruKey
        } else {
          key.textContent = keyEvents[i].enKey
        }
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
      if (keyEvents[i].ruKey) {
        console.log('ru')
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
      console.log(1)
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
  console.log(e)
  if (e.code === 'CapsLock') {
    keys['29'].classList.toggle('key-pressed')
  } else {
    for (let i = 0; i < keyCode.length; i++) {
      if (keyCode[i] === e.code) {
        keys[i].classList.add('key-pressed')
      }
    }
  }
})

document.addEventListener('keyup', (e) => {
  if (e.code !== 'CapsLock') {
    for (let i = 0; i < keyCode.length; i++) {
      if (keyCode[i] === e.code) {
        if (keys[i].classList.contains('key-pressed')) {
          keys[i].classList.remove('key-pressed')
        }
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
