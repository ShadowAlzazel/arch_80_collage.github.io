const track = document.getElementById("image-collage")

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
    maxDelta = window.innerWidth / 3;

    const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageRaw = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageRaw, 0), -100);

    track.dataset.percentage = nextPercentage
    track.style.transform = `trarnslate(${percentage}%, -50%)`;
}