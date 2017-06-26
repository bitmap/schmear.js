let index = 0

const schmears = [
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

const imgs = schmears.map(img => {
  path = '/shared/img/'
  return path + img
})

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

function nextImg () {
  if (index === (imgs.length - 1)) index = 0
  else index += 1
  loadImage(imgs[index])
}
