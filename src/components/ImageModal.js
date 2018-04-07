import React from 'react';
import './ImageModal.css';

const ImageModal = ({image, onClickHandler}) => {

  return(
    <div className="modal-wrapper" onClick={onClickHandler}>
      <img src={image.Image_Big ? image.Image_Big : image.Image} alt={image.Name} />
    </div>
  )

}

export default ImageModal;
