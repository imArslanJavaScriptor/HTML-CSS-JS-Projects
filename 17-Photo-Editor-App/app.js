// Get DOM elements
const imageUpload = document.getElementById("imageUpload");
const image = document.getElementById("image");
const rotateControl = document.getElementById("rotate");
const brightnessControl = document.getElementById("brightness");
const contrastControl = document.getElementById("contrast");
const saveButton = document.getElementById("saveButton");

// Variables to store the image transformations
let rotation = 0;
let brightness = 100;
let contrast = 100;

// Handle image upload
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.onload = () => {
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
});

// Apply transformations to the image
function applyTransformations() {
    image.style.transform = `rotate(${rotation}deg)`;
    image.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
}

// Update rotation value and apply transformation
rotateControl.addEventListener("input", (event) => {
    rotation = event.target.value;
    applyTransformations();
});

// Update brightness value and apply transformation
brightnessControl.addEventListener("input", (event) => {
    brightness = event.target.value;
    applyTransformations();
});

// Update contrast value and apply transformation
contrastControl.addEventListener("input", (event) => {
    contrast = event.target.value;
    applyTransformations();
});

// Save image as PNG
saveButton.addEventListener("click", () => {
    if (image.src === "") {
        alert("Please upload an image first.");
        return;
    }

    // Create a temporary canvas to capture the current image and its transformations
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    // Apply the transformations to the canvas context
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Convert the canvas to a data URL and create a download link
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited_image.png";
    link.click();
});
