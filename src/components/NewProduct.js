/* eslint-disable no-unused-vars */
import React from 'react';
import { PhotoPicker } from 'aws-amplify-react';
// prettier-ignore
import {
  Form,
  Button,
  Input,
  Notification,
  Radio,
  Progress,
} from 'element-react';
import content from '../utils/content';
import styles from '../styling';
/* eslint-disable no-unused-vars */

class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      price: '',
      shipped: false,
      imagePreview: '',
      imageFile: null,
    };
  }

  setDescription = description => {
    this.setState({ description });
  };

  setPrice = price => {
    this.setState({ price });
  };

  setImagePreview = imagePreview => {
    this.setState({ imagePreview });
  };

  setImageFile = imageFile => {
    this.setState({ imageFile });
  };

  toggleShipped = val => {
    this.setState({ shipped: val });
  };

  handleAddProduct = () => {};

  render() {
    const {
      NewProduct: {
        addNewProductText,
        addDescriptionFormLabel,
        addDescriptionPlaceholder,
        setPriceFormLabel,
        setPricePlaceholder,
        shippedOrEmailedLabel,
        shippedOrEmailedShipOption,
        shippedOrEmailedEmailOption,
        confirmButtonText,
        photoPickerTitle,
        imagePreviewAltText,
      },
    } = content;
    const {
      NewProduct: { photoPicker },
    } = styles;

    const { shipped, imagePreview } = this.state;

    return (
      <div className="flex-center">
        <h2 className="header">{addNewProductText}</h2>
        <>
          <Form className="market-header">
            <Form.Item label={addDescriptionFormLabel}>
              <Input
                type="text"
                icon="information"
                placeholder={addDescriptionPlaceholder}
                onChange={description => this.setDescription(description)}
              />
            </Form.Item>
            <Form.Item label={setPriceFormLabel}>
              <Input
                type="text"
                icon="information"
                placeholder={setPricePlaceholder}
                onChange={price => this.setPrice(price)}
              />
            </Form.Item>
            <Form.Item label={shippedOrEmailedLabel}>
              <div className="text-center">
                <Radio
                  value="true"
                  checked={shipped}
                  onChange={() => this.toggleShipped(true)}
                >
                  {shippedOrEmailedShipOption}
                </Radio>
                <Radio
                  value="false"
                  checked={!shipped}
                  onChange={() => this.toggleShipped(false)}
                >
                  {shippedOrEmailedEmailOption}
                </Radio>
              </div>
            </Form.Item>
            {imagePreview && (
              <img
                className="image-preview"
                src={imagePreview}
                alt={imagePreviewAltText}
              />
            )}
            <PhotoPicker
              theme={photoPicker}
              title={photoPickerTitle}
              preview="hidden"
              onLoad={url => this.setImagePreview(url)}
              onPick={file => this.setImageFile(file)}
            />
            <Form.Item>
              <Button type="primary" onClick={this.handleAddProduct}>
                {confirmButtonText}
              </Button>
            </Form.Item>
          </Form>
        </>
      </div>
    );
  }
}

export default NewProduct;
