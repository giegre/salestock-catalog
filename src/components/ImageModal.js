import React from 'react';
import './ImageModal.css';

//handle image zoom when image thumb clicked in the details
const ImageModal = ({image, onClickHandler}) => {

  return(
    <div className="modal-wrapper" onClick={onClickHandler}>
      <img src={image.Image_Big ? image.Image_Big : image.Image} alt={image.Name} />
    </div>
  )

}

export default ImageModal;
