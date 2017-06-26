function schmear () {
  this.index = 0
  this.dragging = true

  this.brush = ''
  this.brushW = 0
  this.brushH = 0

  const canvas0 = document.createElement('canvas')
  const canvas1 = document.createElement('canvas')
  const canvas2 = document.createElement('canvas')
  const canvas3 = document.createElement('canvas')

  const drawCanvas = document.createElement('canvas')

  const ctx0 = canvas0.getContext('2d')
  const ctx1 = canvas1.getContext('2d')
  const ctx2 = canvas2.getContext('2d')
  const ctx3 = canvas3.getContext('2d')

  const dctx = drawCanvas.getContext('2d')

  function init () {
    drawCanvas.addEventListener('mousemove', drag)

    window.addEventListener('keypress', nextImg)
    window.addEventListener('resize', setSize)

    setSize()
    loadImage(index[0])

    document.body.appendChild(canvas0)
    document.body.appendChild(canvas1)
    document.body.appendChild(canvas2)
    document.body.appendChild(canvas3)
    document.body.appendChild(drawCanvas)
  }

  function setSize () {
    drawCanvas.width = window.innerWidth
    drawCanvas.height = window.innerHeight

    canvas0.width = canvas1.width = canvas2.width = canvas3.width = window.innerWidth / 2
    canvas0.height = canvas1.height = canvas2.height = canvas3.height = window.innerHeight / 2

    canvas1.style = 'transform: rotateX(180deg); top: ' + (window.innerHeight / 2) + 'px; left: 0';
    canvas2.style = 'transform: rotateY(180deg); top: 0%; left: ' + (window.innerWidth / 2) + 'px';
    canvas3.style = 'transform: rotate(180deg); top: ' + (window.innerHeight / 2) + 'px; left: ' + (window.innerWidth / 2) + 'px';
  }

  function draw () {
    ctx0.drawImage(brush, mouseX - (brushW / 2), mouseY - (brushH / 2), brushW, brushH)
    ctx1.drawImage(brush, mouseX - (brushW / 2), mouseY - (brushH / 2), brushW, brushH)
    ctx2.drawImage(brush, mouseX - (brushW / 2), mouseY - (brushH / 2), brushW, brushH)
    ctx3.drawImage(brush, mouseX - (brushW / 2), mouseY - (brushH / 2), brushW, brushH)
  }

  function drag (e) {
    let xxx = (window.innerWidth - e.clientX > window.innerWidth / 2)
    let yyy = (window.innerHeight - e.clientY > window.innerHeight / 2)

    if (xxx && yyy) {
      // top left
      mouseX = e.clientX
      mouseY = e.clientY
    } else if (!xxx && yyy) {
      // top right
      mouseX = (window.innerWidth - e.clientX)
      mouseY = e.clientY
    } else if (xxx && !yyy) {
      // bottom left
      mouseX = e.clientX
      mouseY = (window.innerHeight - e.clientY)
    } else {
      // bottom right
      mouseX = (window.innerWidth - e.clientX)
      mouseY = (window.innerHeight - e.clientY)
    }

    if (dragging) {
      draw()
    }
  }

  init()
}

window.addEventListener('load', schmear)
