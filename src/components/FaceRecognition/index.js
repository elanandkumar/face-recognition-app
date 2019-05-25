import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        {imageUrl && <img id="inputImage" src={imageUrl} alt="img" />}
        {boxes.map(box => (
          <div
            className="bounding-box"
            key={box.id}
            style={{
              top: box.topRow,
              left: box.leftCol,
              bottom: box.bottomRow,
              right: box.rightCol
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default FaceRecognition;
