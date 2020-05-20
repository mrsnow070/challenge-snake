type initCanvas = { width: number; heigth: number; gridSize: number };
import Snake from "./snake";

export default class Canvas {
  private squre: HTMLCanvasElement;
  cellWidth: number = null;
  cellHeight: number = null;
  private ctx: CanvasRenderingContext2D = null;

  constructor(init: initCanvas) {
    this.squre = document.createElement("canvas");
    this.squre.width = init.width;
    this.squre.height = init.heigth;
    this.squre.style.margin = "0";
    this.ctx = this.squre.getContext("2d");

    this.cellWidth = init.width / init.gridSize;
    this.cellHeight = init.heigth / init.gridSize;
    document.body.prepend(this.squre);
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.squre.width, this.squre.height);
  }

  public draw(s: Snake) {
    this.clearCanvas();
    this.ctx.fillStyle = "#000";
    s.body.forEach((segm) => {
      let [x, y] = segm;
      this.ctx.fillRect(
        x * s.section.w,
        y * s.section.h,
        this.cellWidth,
        this.cellHeight
      );
    });
    const [ax, ay] = s.apple;
    this.ctx.fillStyle = "#007";
    this.ctx.fillRect(
      ax * s.section.w,
      ay * s.section.h,
      this.cellWidth,
      this.cellHeight
    );
  }
}
