const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("download");

upload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const exif = await exifr.parse(file);

    const padding = 60;
    const infoHeight = 80;

    canvas.width = img.width + padding * 2;
    canvas.height = img.height + padding * 2 + infoHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, padding, padding);

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    const line1 = `${exif?.Model || ""}`;
    const line2 = `${exif?.FocalLength || ""}mm  f/${exif?.FNumber || ""}  1/${Math.round(1 / exif?.ExposureTime)}  ISO${exif?.ISO || ""}`;

    ctx.fillText(line1, padding, img.height + padding + 30);
    ctx.fillText(line2, padding, img.height + padding + 60);
  };
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "framed-photo.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
});