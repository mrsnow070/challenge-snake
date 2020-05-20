type Direction = "A" | "S" | "D" | "W";

export default class Snake {
  head: number[] = [];
  apple: number[] = [];
  direction: Direction = "D";
  body: number[][] = [];
  private observers: Function[] = [];

  constructor(readonly section: { w: number; h: number }) {
    this.head = [1, 1];
    this.body = [this.head];
    this.spawnApple();

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyS") this.direction = "S";
      else if (e.code === "KeyA") this.direction = "A";
      else if (e.code === "KeyD") this.direction = "D";
      else if (e.code === "KeyW") this.direction = "W";
    });

    setInterval(() => this.move(this), 500);
  }

  subscribe(fn: Function) {
    this.observers.push(fn);
  }

  private notifyObserves() {
    for (let o of this.observers) {
      o(this);
    }
  }

  private spawnApple() {
    const apple = [
      Math.ceil(Math.random() * 15 - 1),
      Math.ceil(Math.random() * 15 - 1),
    ];

    if (JSON.stringify(this.body).includes(apple.toString())) {
      this.spawnApple();
    }

    this.apple = apple;
  }

  move(snake: Snake) {
    const [x, y] = snake.head;

    switch (this.direction) {
      case "D":
        {
          if (x < 15 - 1) this.head = [x + 1, y];
          else this.head = [0, y];
        }
        break;
      case "S": {
        if (y < 15 - 1) {
          this.head = [x, y + 1];
        } else this.head = [x, 0];
        break;
      }
      case "W": {
        if (y - 1 >= 0) {
          this.head = [x, y - 1];
        } else this.head = [x, 15 - 1];
        break;
      }
      case "A": {
        if (x - 1 >= 0) {
          this.head = [x - 1, y];
        } else {
          this.head = [15 - 1, y];
        }
      }
      default:
        break;
    }
    this.body.push(this.head);
    //snake eats apple
    if (snake.head.toString() === this.apple.toString()) {
      this.body.push(this.apple);
      this.spawnApple();
    }
    this.notifyObserves();
    this.body.shift();
  }
}
