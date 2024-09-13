class ImageLoader {
    constructor(imagePath) {
        this.imagePath = imagePath;
    }

    loadImage() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image at ' + this.imagePath));
            img.src = this.imagePath;
        });
    }
}
