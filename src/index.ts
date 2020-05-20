import "./style/style.css";
import Canvas from "./canvas";
import Snake from "./snake";

const initValue = {
  width: 600,
  heigth: 600,
  gridSize: 15,
};

const { width, heigth, gridSize } = initValue;
const cellWidth = width / gridSize;
const cellHeight = heigth / gridSize;

const c = new Canvas(initValue);
const sn = new Snake({ w: cellWidth, h: cellHeight });

sn.subscribe((a: Snake) => {
  c.draw(a);
});
