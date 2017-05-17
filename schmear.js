function schmear () {
  // add your images here
  this.schmears = [
    'error.jpg',
    'bill.jpg',
    'migos.png',
    'error2.jpg',
    'pizza.png',
    'bball.png',
    'RAD.png',
    'java.png',
    'taco.png'
  ]

  this.index = 0
  this.dragging = false

  this.brush = ''
  this.brushW = 0
  this.brushH = 0

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const imgs = schmears.map(img => {
    path = 'img/'
    return path + img
  })

  function init () {
    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mouseup', up)
    canvas.addEventListener('mousemove', drag)

    window.addEventListener('keypress', nextImg)
    window.addEventListener('resize', setSize)

    setSize()
    loadImage(index[0])

    document.body.appendChild(canvas)
  }

  function setSize () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function loadImage (src) {
    return new Promise((res, rej) => {
      let img = new Image()

      img.onload = function () {
        res(img)
      }

      img.onerror = function () {
        rej(new Error('Error'))
      }

      img.src = imgs[index]
    }).then((img) => {
      brush = img
      brushW = img.width
      brushH = img.height
    }).catch(nextImg)
  }

  function draw () {
    ctx.drawImage(brush, mouseX - (brushW / 2), mouseY - (brushH / 2), brushW, brushH)
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
    loadImage(imgs[index])
  }

  init()
}

window.addEventListener('load', schmear)
