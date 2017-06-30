function schmear () {
  this.index = 0
  this.dragging = true

  this.brush = ''
  this.brushW = 0
  this.brushH = 0

  const canvas0 = document.createElement('canvas')
  const canvas1 = document.createElement('canvas')
  const ctx0 = canvas0.getContext('2d')
  const ctx1 = canvas1.getContext('2d')

  let counter = 0
  let speed = 0
  let numberOfCanvases = 4
  let angleInRadians = (Math.PI/180)

  let x
  let y
  let posX
  let posY

  let imgData = {}
  let newBrush
  let count = 0
  var colors

  var hsl = []
  var hue
  var r,g,b;

  var hues = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ]

  function init () {
    canvas1.addEventListener('mousemove', drag)

    window.addEventListener('keypress', nextImg)
    window.addEventListener('resize', setSize)


    loadImage(index[0], function() {
      setSize()
    })

    // canvas0.style = 'z-index: 100000'
    // document.body.appendChild(canvas0)

    document.body.appendChild(canvas1)
  }

  function setSize () {
    canvas0.width = brushW
    canvas0.height = brushH
    canvas1.width = window.innerWidth
    canvas1.height = window.innerHeight
  }

  function draw () {

    x = canvas1.width / 2;
    y = canvas1.height / 2;
    posX = mouseX - (brushW / 2)
    posY = mouseY - (brushH / 2)

    ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
    count < hues.length ? count += 1 : count = 0

    hue = hues[count]
    // hue = hues[Math.floor(Math.random()*hues.length)];

    ctx0.fillStyle = hue;

    ctx0.drawImage(brush, 0, 0)
    ctx0.globalCompositeOperation = 'hue';
    ctx0.fillRect(0, 0, canvas0.width, canvas0.height);
    ctx0.globalCompositeOperation = 'destination-atop';
    ctx0.drawImage(brush, 0, 0)


    imgData = ctx0.getImageData(0,0,canvas0.width,canvas0.height).data

    for (var i = 0; i < imgData.length; i++) {
      if (imgData[i] === 255) imgData[i] = 0
    }
    //
    // ctx0.putImageData(imgData, 0,0)
    newBrush = ctx0.getImageData(0,0, canvas0.width,canvas0.height)

    ctx1.translate(x, y);
    ctx1.rotate(angleInRadians += 1);
    ctx1.drawImage(canvas0, posX, posY, brushW, brushH)
    ctx1.rotate(angleInRadians -= 1);
    ctx1.translate(-x, -y);
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
