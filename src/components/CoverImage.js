// import ReactDOM from "react-dom";
// import { makeStyles } from '@material-ui/core/styles';
import Modal from "react-modal";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import { base64StringtoFile } from "./HelperFunctions";

// import { coverUploadCard as cardTheme } from '../utils/theme';
import "./CoverImage.css";
// import PreviewImg from "../utils/preview.png";
import Button from "./../../Button/Button";

class Cropper extends PureComponent {
  state = {
    src: null,
    open: false,
    croppedImageUrl: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 4 / 3
    }
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result, open: true })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL();
  }

  helperfunc = () => {
    let { croppedImageUrl } = this.state;
    let file = base64StringtoFile(croppedImageUrl, 1);
    console.log(file, "from CoverPAge");
    this.props.getCroppedImageUrl(file);
    this.setState({ open: false });
  };

  render() {
    const { crop, croppedImageUrl, src, open } = this.state;

    return (
      <Card
        className="CoverImageCardContainer"
        style={{
          borderRadius: "20px",
          boxShadow: "none!important",
          marginTop: "40px"
        }}
      >
        <CardMedia
          className="CoverImageCardCover"
          image={this.state.croppedImageUrl ? this.state.croppedImageUrl : null}
          title="Live from space album cover"
        />
        <div className="CoverImageCardContent">
          <div className="CoverImageCardLabel">Cover Image (4:3 ratio)</div>
          <div className="CoverImageCardButton">
            <label className="CoverImageUploadButton">
              UPLOAD IMAGE
              <input
                type="file"
                accept="image/*"
                onChange={this.onSelectFile}
              />
            </label>
          </div>
          <label className="CoverUploadErrorMessage">{this.props.err}</label>
        </div>
        <div className="CropperModalOuterContainer">
          <Modal
            isOpen={open}
            onRequestClose={this.props.onRequestClose}
            className="CropperModal"
          >
            <div className="CropperImage">
              {src && (
                <ReactCrop
                  className="ReactCropper"
                  src={src}
                  crop={crop}
                  err={false}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              )}
            </div>
            <div className="CropperButton">
              <Button primary value="Crop" onClick={this.helperfunc}>
                Crop
              </Button>
            </div>
          </Modal>
        </div>
      </Card>
    );
  }
}

export default Cropper;
