var options: string[] = [
  "$100",
  "$10",
  "$25",
  "$250",
  "$30",
  "$1000",
  "$1",
  "$200",
  "$45",
  "$500",
  "$5",
  "$20",
  "Lose",
  "$1000000",
  "Lose",
  "$350",
  "$5",
  "$99",
];

var startAngle: number = 0;
var arc: number = Math.PI / (options.length / 2);
var spinTimeout: NodeJS.Timeout | null = null;

var spinArcStart: number = 10;
var spinTime: number = 0;
var spinTimeTotal: number = 0;
var spinAngleStart: number;

var ctx: CanvasRenderingContext2D | null;

document.getElementById("spin")?.addEventListener("click", spin);

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle: number =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function byte2Hex(n: number) {
  var nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
}

function RGB2Color(r: number, g: number, b: number) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item: number, maxitem: number): string {
  var phase: number = 0;
  var center: number = 128;
  var width: number = 127;
  var frequency: number = (Math.PI * 2) / maxitem;
  let red: number, green: number, blue: number;
  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}

function drawRouletteWheel() {
  var canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
  if (canvas && canvas.getContext) {
    var outsideRadius: number = 200;
    var textRadius: number = 160;
    var insideRadius: number = 125;

    ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = "bold 12px Helvetica, Arial";

      for (var i: number = 0; i < options.length; i++) {
        var angle: number = startAngle + i * arc;
        ctx.fillStyle = getColor(i, options.length);

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(
          250 + Math.cos(angle + arc / 2) * textRadius,
          250 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text: string = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      // Arrow
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function stopRotateWheel() {
  if (spinTimeout !== null) {
    clearTimeout(spinTimeout);
  }
  var degrees: number = (startAngle * 180) / Math.PI + 90;
  var arcd: number = (arc * 180) / Math.PI;
  var index: number = Math.floor((360 - (degrees % 360)) / arcd);
  if (ctx) {
    ctx.save();
    ctx.font = "bold 30px Helvetica, Arial";
    var text: string = options[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
  }
}

function easeOut(t: number, b: number, c: number, d: number): number {
  var ts: number = (t /= d) * t;
  var tc: number = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

export { getColor, drawRouletteWheel, spin, rotateWheel };
