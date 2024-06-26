import React, { useState, useEffect } from "react";
import "./App.css";

function Canvas() {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1024;
    canvas.height = 576;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image: HTMLImageElement = new Image();
    image.src = "./img/Pellet Town.png";

    const playerImage: HTMLImageElement = new Image();
    playerImage.src = "./img/playerDown.png";

    image.onload = () => {
      ctx.drawImage(image, -750, -550);
      setImageLoaded(true);

      playerImage.onload = () => {
        if (!ctx || !canvas) return; // null 체크
        ctx.drawImage(
          playerImage,
          0,
          0,
          playerImage.width / 4,
          playerImage.height,
          canvas.width / 2 - playerImage.width / 8,
          canvas.height / 2 - playerImage.height / 2,
          playerImage.width / 4,
          playerImage.height
        );
      };
    };

    // Sprite 클래스 정의
    class Sprite {
      position: { x: number; y: number };
      image: HTMLImageElement;

      constructor({
        position,
        image,
      }: {
        position: { x: number; y: number };
        image: HTMLImageElement;
      }) {
        this.position = position;
        this.image = image;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
      }
    }

    // 캔버스에 그릴 스프라이트 객체 생성
    const background = new Sprite({
      position: { x: -785, y: -650 },
      image: image,
    });

    // 키보드 이벤트 관리 객체
    const keys: { [key: string]: { pressed: boolean } } = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
    };

    let lastKey: string = "";
    // 애니메이션 함수
    function animate() {
      window.requestAnimationFrame(animate);
      if (!ctx || !canvas) return; // null 체크
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지움
      background.draw(ctx); // 배경 스프라이트 그리기
      ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 8,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
      ); // 플레이어 이미지 그리기

      // 키 입력에 따라 배경 위치 변경
      if (keys.w.pressed && lastKey === "w") background.position.y += 3;
      else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
      else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
      else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
    }
    animate();

    // 키보드 이벤트 처리
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          keys.w.pressed = true;
          lastKey = "w";
          break;
        case "a":
          keys.a.pressed = true;
          lastKey = "a";
          break;
        case "s":
          keys.s.pressed = true;
          lastKey = "s";
          break;
        case "d":
          keys.d.pressed = true;
          lastKey = "d";
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          keys.w.pressed = false;
          break;
        case "a":
          keys.a.pressed = false;
          break;
        case "s":
          keys.s.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
      }
    });
  }, []);

  return (
    <div className="App">
      <canvas></canvas>
    </div>
  );
}

export default Canvas;
