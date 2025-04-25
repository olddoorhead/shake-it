let lastShakeTime = 0;

window.addEventListener("devicemotion", (event) => {
  const { x, y, z } = event.accelerationIncludingGravity;
  const acceleration = Math.sqrt(x * x + y * y + z * z);

  const currentTime = new Date().getTime();
  if (acceleration > 15 && currentTime - lastShakeTime > 800) {
    lastShakeTime = currentTime;

    const sound = document.getElementById("rattleSound");
    const rattleImg = document.getElementById("rattle");

    sound.currentTime = 0;
    sound.play();

    rattleImg.style.transform = "rotate(15deg)";
    setTimeout(() => {
      rattleImg.style.transform = "rotate(-15deg)";
    }, 100);
    setTimeout(() => {
      rattleImg.style.transform = "rotate(0deg)";
    }, 200);
  }
});
