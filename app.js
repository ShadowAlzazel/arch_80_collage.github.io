const track = document.getElementById("image-track")

window.onmousedown = clicked => {
    track.dataset.mouseDownAt = clicked.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = clicked => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clicked.clientX,
        maxDelta = window.innerWidth / 0.5;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageRaw = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageRaw, 0), -100);

    track.dataset.percentage = nextPercentage
    //track.style.transform = `trarnslate(${percentage}%, -50%)`;

    track.animate(
      { transform: `translate(${nextPercentage}%, -50%)`},
      { duration: 1200, fill: "forwards"}
    );

    
    for (const image of track.getElementsByClassName("image")) {
        //image.style.objectPosition = `${nextPercentage + 100} 50%`
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center`},
          { duration: 1200, fill: "forwards"}
        );
    }

    

}