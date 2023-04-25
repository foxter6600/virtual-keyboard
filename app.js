import { keyEvents } from './keyEvents.js'

// const div = document.createElement('div')

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
    <p>Для переключения языка комбинация: левые alt + shift</p>
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
  console.log(i)
}

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
