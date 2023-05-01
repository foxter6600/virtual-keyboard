import { keyEvents } from './keyEvents.js'
import { keyCodes } from './keyEvents.js'

document.body.insertAdjacentHTML(
  'afterbegin',
  `<div class="wrapper">
  <header class="header">
  <h1>RSS Virtual Keyboard</h1></header>
  <main class="main">
  <textarea class='textarea' cols="124" rows="20"></textarea>
  <div class="keyboard" tabindex='0fdf'></div>
  </main>
  <footer class="footer">
    <p>Клавиатура создана в операционной системе Windows</p>
    <p>Для переключения языка комбинация: левые alt + ctrl</p>
  </footer>
</div>`
)

const keyboard = document.querySelector('.keyboard')
const textarea = document.querySelector('.textarea')

// Lang
let lang

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en')
}
lang = localStorage.getItem('lang')

for (let i = 0; i < 64; i++) {
  const div = document.createElement('div')
  div.setAttribute('tabindex', '1')
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
  e.preventDefault()
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
    } else if (lang === 'ru') {
      if (capsLock && keyEvents[i].ruKeyCaps) {
        key.textContent = keyEvents[i].ruKeyCaps
      } else if (keyEvents[i].ruKey) {
        key.textContent = keyEvents[i].ruKey
      } else {
        key.textContent = keyEvents[i].enKey
      }
    }
  }
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.code === 'AltLeft') || (e.altKey && e.code === 'ControlLeft')) {
    lang === 'en' ? localStorage.setItem('lang', 'ru') : localStorage.setItem('lang', 'en')
    updateKeyContent()
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
  if (e.code === 'CapsLock') {
    keys['29'].classList.toggle('key-pressed')
  } else {
    for (let i = 0; i < keyCodes.length; i++) {
      if (keyCodes[i] === e.code) {
        keys[i].classList.add('key-pressed')
      }
    }
  }
})

document.addEventListener('keyup', (e) => {
  if (e.code !== 'CapsLock') {
    for (let i = 0; i < keyCodes.length; i++) {
      if (keyCodes[i] === e.code) {
        if (keys[i].classList.contains('key-pressed')) {
          keys[i].classList.remove('key-pressed')
        }
      }
    }
  }
})

// Textarea

//Mouse

keyboard.addEventListener('mousedown', (e) => {
  const key = e.target
  if (key.classList.contains('key')) {
    key.classList.add('key-pressed')
    if (
      !key.classList.contains('static') &&
      !key.classList.contains('static_mid') &&
      !key.classList.contains('static_big') &&
      !key.classList.contains('static_tab')
    ) {
      const keyInnerHTML = key.innerHTML
      const cursorPositionStart = textarea.selectionStart
      const cursorPositionEnd = textarea.selectionEnd
      if (cursorPositionStart === textarea.value.length) {
        textarea.value = textarea.value + keyInnerHTML
      } else {
        const stringEnd = textarea.value.substring(cursorPositionEnd)
        textarea.value =
          textarea.value.substring(0, cursorPositionStart) + key.innerHTML + stringEnd
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart + 1
      }
    } else if (key.id === '13') {
      const cursorPositionStart = textarea.selectionStart
      const cursorPositionEnd = textarea.selectionEnd
      let diff = cursorPositionEnd - cursorPositionStart
      if (diff === 0 && cursorPositionStart > 0) {
        textarea.value =
          textarea.value.substring(0, cursorPositionStart - 1) +
          textarea.value.substring(cursorPositionEnd)
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart - 1
      } else {
        textarea.value =
          textarea.value.substring(0, cursorPositionStart) +
          textarea.value.substring(cursorPositionEnd)
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
      }
    } else if (key.id === '14') {
      const cursorPositionStart = textarea.selectionStart
      const cursorPositionEnd = textarea.selectionEnd
      textarea.value =
        textarea.value.substring(0, cursorPositionStart) +
        `    ` +
        textarea.value.substring(cursorPositionEnd)
      textarea.selectionStart = textarea.selectionEnd = cursorPositionStart + 4
    } else if (key.id === '28') {
      const cursorPositionStart = textarea.selectionStart
      const cursorPositionEnd = textarea.selectionEnd
      let diff = cursorPositionEnd - cursorPositionStart
      if (diff === 0 && cursorPositionEnd < textarea.value.length) {
        textarea.value =
          textarea.value.substring(0, cursorPositionStart) +
          textarea.value.substring(cursorPositionEnd + 1)
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
      } else {
        textarea.value =
          textarea.value.substring(0, cursorPositionStart) +
          textarea.value.substring(cursorPositionEnd)
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
      }
    } else if (key.id === '41') {
      textarea.value = textarea.value + `\n`
    }
  }

  keyboard.addEventListener('mouseup', (e) => {
    key.classList.remove('key-pressed')
    textarea.focus()
  })
})

//Keyboard

document.addEventListener('keydown', (e) => {
  for (let i = 0; i < keyCodes.length; i++) {
    if (keyCodes[i] === e.code) {
      const key = document.getElementById(i)
      if (
        !key.classList.contains('static') &&
        !key.classList.contains('static_mid') &&
        !key.classList.contains('static_big') &&
        !key.classList.contains('static_tab')
      ) {
        const keyInnerHTML = key.innerHTML
        const cursorPositionStart = textarea.selectionStart
        const cursorPositionEnd = textarea.selectionEnd
        if (cursorPositionStart === textarea.value.length) {
          textarea.value = textarea.value + keyInnerHTML
        } else {
          const stringEnd = textarea.value.substring(cursorPositionEnd)
          textarea.value =
            textarea.value.substring(0, cursorPositionStart) + key.innerHTML + stringEnd
          textarea.selectionStart = textarea.selectionEnd = cursorPositionStart + 1
        }
      } else if (key.id === '13') {
        const cursorPositionStart = textarea.selectionStart
        const cursorPositionEnd = textarea.selectionEnd
        let diff = cursorPositionEnd - cursorPositionStart
        if (diff === 0 && cursorPositionStart > 0) {
          textarea.value =
            textarea.value.substring(0, cursorPositionStart - 1) +
            textarea.value.substring(cursorPositionEnd)
          textarea.selectionStart = textarea.selectionEnd = cursorPositionStart - 1
        } else {
          textarea.value =
            textarea.value.substring(0, cursorPositionStart) +
            textarea.value.substring(cursorPositionEnd)
          textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
        }
      } else if (key.id === '14') {
        const cursorPositionStart = textarea.selectionStart
        const cursorPositionEnd = textarea.selectionEnd
        textarea.value =
          textarea.value.substring(0, cursorPositionStart) +
          `    ` +
          textarea.value.substring(cursorPositionEnd)
        textarea.selectionStart = textarea.selectionEnd = cursorPositionStart + 4
      } else if (key.id === '28') {
        const cursorPositionStart = textarea.selectionStart
        const cursorPositionEnd = textarea.selectionEnd
        let diff = cursorPositionEnd - cursorPositionStart
        if (diff === 0 && cursorPositionEnd < textarea.value.length) {
          textarea.value =
            textarea.value.substring(0, cursorPositionStart) +
            textarea.value.substring(cursorPositionEnd + 1)
          textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
        } else {
          textarea.value =
            textarea.value.substring(0, cursorPositionStart) +
            textarea.value.substring(cursorPositionEnd)
          textarea.selectionStart = textarea.selectionEnd = cursorPositionStart
        }
      } else if (key.id === '41') {
        textarea.value = textarea.value + `\n`
      }
    }
  }
  textarea.focus()
})
