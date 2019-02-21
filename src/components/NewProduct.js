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

const initialState = {
  description: '',
  price: '',
  shipped: false,
  imagePreview: '',
  image: null,
};

class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
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

  setImage = image => {
    this.setState({ image });
  };

  toggleShipped = val => {
    this.setState({ shipped: val });
  };

  handleAddProduct = () => {
    // add the new product to the db
    this.resetStateToDefault();
  };

  resetStateToDefault = () => {
    this.setState({ ...initialState });
  };

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

    // prettier-ignore
    const {
      description,
      price,
      image,
      shipped,
      imagePreview,
    } = this.state;

    const enableAddProductButton = () => image && description && price;

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
                value={description}
                onChange={_description => this.setDescription(_description)}
              />
            </Form.Item>
            <Form.Item label={setPriceFormLabel}>
              <Input
                type="text"
                icon="information"
                placeholder={setPricePlaceholder}
                value={price}
                onChange={_price => this.setPrice(_price)}
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
              onPick={file => this.setImage(file)}
            />
            <Form.Item>
              <Button
                type="primary"
                onClick={this.handleAddProduct}
                disabled={!enableAddProductButton()}
              >
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
