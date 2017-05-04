window.addEventListener('load', schmear)

function schmear () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const img = document.getElementById('img')
  const imgs = [
    'img/error.jpg',
    'img/bill.jpg',
    'img/migos.png',
    'img/error2.jpg',
    'img/pizza.png',
    'img/bball.png',
    'img/RAD.png',
    'img/java.png',
    'img/taco.png'
  ]
  let imgW = img.clientWidth
  let imgH = img.clientHeight
  let index = 0
  let dragging = false

  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  function refresh (img, index) {
    img.onload = function () {
      imgW = img.clientWidth
      imgH = img.clientHeight
    }
    img.src = imgs[index]
  }

  function draw () {
    ctx.drawImage(img, mouseX - (imgW / 2), mouseY - (imgH / 2), imgW, imgH)
  }

  function down (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    dragging = true
    canvas.classList.add('is-dragging')
    draw()
  }

  function up (e) {
    dragging = false
    canvas.classList.remove('is-dragging')
  }

  function drag (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    if (dragging) {
      draw()
    }
  }

  function nextImg () {
    if (index === (imgs.length - 1)) index = 0
    else index += 1
    refresh(img, index)
  }

  canvas.addEventListener('mousedown', down)
  canvas.addEventListener('mouseup', up)
  canvas.addEventListener('mousemove', drag)
  document.addEventListener('keypress', nextImg)

  refresh(img, 0) // init
}
