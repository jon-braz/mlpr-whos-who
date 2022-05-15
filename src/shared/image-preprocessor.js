const processFile = (file, maxWidth, maxHeight) => {
  if (!/image/i.test(file.type)) {
    alert('File ' + file.name + ' is not an image.');
    return false;
  }

  // read the files
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, _reject) => {
    reader.onload = (event) => {
      // blob stuff
      const blob = new Blob([event.target.result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      const image = new Image();
      image.src = blobURL;
      //preview.appendChild(image); // preview commented out, I am using the canvas instead
      image.onload = () => {
        // have to wait till it's loaded
        const resized = resizeMe(image, maxWidth, maxHeight); // send it to canvas
        resolve(resized);
      };
    };
  });
};

export const readFiles = async (files, maxWidth, maxHeight) => {
  //   // remove the existing canvases and hidden inputs if user re-selects new pics
  //   const existingcanvases = document.getElementsByTagName('canvas');
  //   while (existinginputs.length > 0) {
  //     // it's a live list so removing the first element each time
  //     // DOMNode.prototype.remove = function() {this.parentNode.removeChild(this);}
  //     previewEl.removeChild(existingcanvases[0]);
  //   }

  const resizeImages = Array.from(files).map((file) =>
    processFile(file, maxWidth, maxHeight)
  );
  const resizedImages = await Promise.all(resizeImages);

  return resizedImages;
};

// === RESIZE ====

const resizeMe = (img, maxWidth, maxHeight) => {
  const canvas = document.createElement('canvas');

  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height *= maxWidth / width));
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width *= maxHeight / height));
      height = maxHeight;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
};
