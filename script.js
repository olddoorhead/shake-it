<script>
  let lastShakeTime = 0;

  document.getElementById('enableMotion').addEventListener('click', function() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            console.log('Motion permission granted ✅');
            startMotionListener();
            document.getElementById('enableMotion').style.display = 'none'; // Hide button after permission
          } else {
            alert('Permission denied for motion access.');
          }
        })
        .catch(console.error);
    } else {
      // For Android and older iPhones that don't require permission
      startMotionListener();
      document.getElementById('enableMotion').style.display = 'none';
    }
  });

  function startMotionListener() {
    window.addEventListener("devicemotion", (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      const now = Date.now();
      if (acceleration > 15 && now - lastShakeTime > 800) {
        lastShakeTime = now;

        const sound = document.getElementById("rattleSound");
        const image = document.getElementById("rattleImg");

        sound.currentTime = 0;
        sound.play();

        image.style.transform = "rotate(10deg)";
        setTimeout(() => image.style.transform = "rotate(-10deg)", 100);
        setTimeout(() => image.style.transform = "rotate(0deg)", 200);
      }
    });
  }
</script>
