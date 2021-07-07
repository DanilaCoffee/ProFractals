(function() {

  //first canvas

  let canvas1 = document.getElementById('canvas1')
  if (canvas1) {
    let ctx1 = canvas1.getContext("2d")

    ctx1.lineWidth = "1"

    function DrawFractal(incline, speed) {

      function fractalPainter(x, y, length, angle) {

        let x1 = x + length * Math.sin(angle * Math.PI * 2 / 360)
        let y1 = y + length * Math.cos(angle * Math.PI * 2 / 360)

        ctx1.moveTo(x, canvas1.height - y)
        ctx1.lineTo(x1, canvas1.height - y1)

        if (length > 2)
        {
          fractalPainter(x1, y1, length / speed, angle + incline)
          fractalPainter(x1, y1, length / speed, angle - incline)
        }

      }

      fractalPainter(canvas1.width / 2, 140 - (speed * 100), 180, 0)

    }

    let input1 = document.getElementsByTagName("input")[0]
    let input2 = document.getElementsByTagName("input")[1]

    setInterval(()=>{

      ctx1.clearRect(0, 0, canvas1.width, canvas1.height)

      ctx1.beginPath()
      DrawFractal(+input1.value, (+input2.value / 10))
      ctx1.stroke()
      ctx1.closePath()

    }, 50);
  }

  //second canvas

  let canvas2 = document.getElementById('canvas2')
  if (canvas2) {
    let ctx2 = canvas2.getContext("2d")

    let fx = 250
    let fy = 480
    let x, y

    for (let i = 0; i < 12000; i++) {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          x = (fx + 20) / 2
          y = (fy + 480) / 2
        break;
        case 1:
          x = (fx + 250) / 2
          y = (fy + 60) / 2
        break;
        case 2:
          x = (fx + 480) / 2
          y = (fy + 480) / 2
        break;
      }
      fx = x
      fy = y
      ctx2.fillRect(x, y, 1, 1)
    }
  }

  //third canvas

  function Complex(x, y) {
    this.a = x
    this.b = y
  }

  Complex.prototype.Square = function() {
    tmp = (this.a * this.a) - (this.b * this.b)
    this.b = 2 * this.a * this.b
    this.a = tmp
  }

  Complex.prototype.Absolute = function() {
    return Math.sqrt((this.a * this.a) + (this.b * this.b))
  }

  Complex.prototype.Plus = function(c) {
    this.a += c.a
    this.b += c.b
  }

  let canvas3 = document.getElementById('canvas3')
  if (canvas3) {
    let ctx3 = canvas3.getContext("2d")

    for (var i = 0; i < canvas3.width; i++) {

      for (var j = 0; j < canvas3.height; j++) {

        let a = (i - canvas3.width / 2) / (canvas3.width / 4)
        let b = (j - canvas3.height / 2) / (canvas3.height / 2.6)

        let c = new Complex(a, b)
        let z = new Complex(0, 0)

        let counter = 0

        do {

          counter++
          z.Square()
          z.Plus(c)

          if (z.Absolute() > 2) {
            break
          }

        } while (counter < 100)

        if (counter == 100) {
          ctx3.fillStyle = "black"
          ctx3.fillRect(i, j, 1, 1)
        } else {
          if (a < 1) {
            ctx3.fillStyle = "rgb(" + counter * 12 + ",0," + 113 + ")"
            ctx3.fillRect(i, j, 1, 1)
          }
        }
      }
    }

    ctx3.fill()
  }

})()
