const div = document.createElement('div')

document.body.insertAdjacentHTML(
  'afterbegin',
  `<div class="wrapper">
  <header class="header">
  <h1>RSS Virtual Keyboard</h1></header>
  <main class="main">
  <textarea cols="60" rows="20"></textarea>
  <div class="keyboad"></div>
  </main>
  <footer class="footer">
    <p>Клавиатура создана в операционной системе Windows</p>
    <p>Для переключения языка комбинация: левые alt + shift</p>
  </footer>
</div>`
)

class Node {
  constructor() {
    this.node = node
  }
}
