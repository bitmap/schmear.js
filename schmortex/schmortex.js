function schmear () {
  this.index = 0
  this.dragging = true

  this.brush = ''
  this.brushW = 0
  this.brushH = 0

  const canvas0 = document.createElement('canvas')
  const ctx0 = canvas0.getContext('2d')

  let counter = 0
  let speed = 0
  let numberOfCanvases = 4
  let angleInRadians = (Math.PI/180)

  let x
  let y
  let posX
  let posY

  function init () {
    canvas0.addEventListener('mousemove', drag)

    window.addEventListener('keypress', nextImg)
    window.addEventListener('resize', setSize)

    setSize()
    loadImage(index[0])

    document.body.appendChild(canvas0)
  }

  function setSize () {

    canvas0.width = window.innerWidth
    canvas0.height = window.innerHeight
  }

  function draw () {

    x = canvas0.width / 2;
    y = canvas0.height / 2;
    posX = mouseX - (brushW / 2)
    posY = mouseY - (brushH / 2)

    ctx0.translate(x, y);
    ctx0.rotate(angleInRadians += 1);
    ctx0.drawImage(brush, posX, posY, brushW, brushH)
    ctx0.rotate(angleInRadians -= 1);
    ctx0.translate(-x, -y);
  }

  function drag (e) {
    mouseX = (window.innerWidth / 2) - e.clientX
    mouseY = (window.innerHeight / 2) - e.clientY

    if (dragging) {
      draw()
    }
  }

  init()
}

window.addEventListener('load', schmear)
