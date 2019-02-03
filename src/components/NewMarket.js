import React from 'react';
import {
  Form,
  Button,
  Dialog,
  Input,
  Select,
  Notification,
} from 'element-react';
import content from '../utils/content';

class NewMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="market-header">
          <h1 className="market-title">
            {content.NewMarket.title}
            <Button type="edit" icon="edit" className="market-title-button" />
          </h1>
        </div>
      </>
    );
  }
}

export default NewMarket;
