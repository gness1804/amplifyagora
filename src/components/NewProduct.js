/* eslint-disable no-unused-vars */
import React from 'react';
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
/* eslint-disable no-unused-vars */

class NewProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      price: '',
      shipped: false,
    };
  }

  setDescription = description => {
    this.setState({ description });
  };

  setPrice = price => {
    this.setState({ price });
  };

  toggleShipped = val => {
    this.setState({ shipped: val });
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
      },
    } = content;

    const { shipped } = this.state;

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
          </Form>
        </>
      </div>
    );
  }
}

export default NewProduct;
