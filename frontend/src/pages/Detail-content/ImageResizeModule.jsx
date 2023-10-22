
const Quill = require('quill');

class CustomImageResize {

  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
    this.quill.root.addEventListener('click', this.handleClick);
  }

  handleClick = (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      this.selectImage(e.target);
    }
  };

  selectImage = (img) => {
    // Handle the image selection as needed
    // You can implement your image resizing logic here
    // For example, you can open a modal or a form for image resizing
  };
}

export default CustomImageResize;
