function schmear () {
  this.dragging = false

  this.brush = ''
  this.brushW = 0
  this.brushH = 0

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

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

  init()
}

window.addEventListener('load', schmear)
