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

    this.state = {
      showAddMarketDialog: false,
      name: '',
    };
  }

  showAddMarketDialogFunc = () => {
    this.setState({
      showAddMarketDialog: true,
    });
  };

  hideAddMarketDialogFunc = () => {
    this.setState({
      showAddMarketDialog: false,
    });
  };

  setName = _name => {
    this.setState({ name: _name });
  };

  handleAddMarket = () => {};

  render() {
    const { showAddMarketDialog, name } = this.state;

    return (
      <>
        <div className="market-header">
          <h1 className="market-title">
            {content.NewMarket.title}
            <Button
              type="edit"
              icon="edit"
              className="market-title-button"
              onClick={this.showAddMarketDialogFunc}
            />
          </h1>
        </div>

        <Dialog
          visible={showAddMarketDialog}
          title={content.NewMarket.title}
          onCancel={this.hideAddMarketDialogFunc}
          size="large"
          customClass="dialog"
        >
          <Dialog.Body>
            <Form labelPosition="top">
              <Form.Item label={content.NewMarket.addMarketFormTitle}>
                <Input
                  placeholder={content.NewMarket.namePlaceholder}
                  trim={true}
                  onChange={_name => this.setName(_name)}
                />
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={this.hideAddMarketDialogFunc}>
              {content.NewMarket.dialogCancelText}
            </Button>
            <Button
              onClick={this.handleAddMarket}
              type="primary"
              disabled={!name}
            >
              {content.NewMarket.addButtonText}
            </Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  }
}

export default NewMarket;
