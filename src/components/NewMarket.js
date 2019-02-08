import React from 'react';
import {
  Form,
  Button,
  Dialog,
  Input,
  Select,
  Notification,
} from 'element-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMarket } from '../graphql/mutations';
import content from '../utils/content';
import { UserContext } from '../App';

const { tags: allTags } = content.NewMarket;

class NewMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddMarketDialog: false,
      allTags,
      selectedTags: [],
      name: '',
      options: [],
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

  clearName = () => {
    this.setState({ name: '' });
  };

  handleSelectTags = selectedTags => {
    this.setState({
      selectedTags,
    });
  };

  // filter the tags based on user input.
  handleFilterTags = query => {
    const { allTags: tags } = this.state;
    const options = tags
      .map(tag => ({ value: tag, label: tag }))
      .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()));
    this.setState({ options });
  };

  handleAddMarket = async user => {
    const { username: owner } = user;
    try {
      const { name } = this.state;
      this.hideAddMarketDialogFunc();
      const input = {
        name,
        owner,
      };
      const result = await API.graphql(
        graphqlOperation(createMarket, { input }),
      );
      console.info(`Created market with id: ${result.data.createMarket.id}`);
      this.clearName();
    } catch (err) {
      /* eslint-disable no-console */
      console.error(`Error adding new market: ${JSON.stringify(err)}`);
      /* eslint-enable no-console */
      Notification.error({
        title: 'Error',
        message: `Error adding market: ${err.message || JSON.stringify(err)}`,
      });
    }
  };

  render() {
    const { showAddMarketDialog, name } = this.state;
    const {
      title,
      addMarketFormTitle,
      namePlaceholder,
      dialogCancelText,
      addButtonText,
      addTagLabel,
      addTagPlaceholder,
    } = content.NewMarket;

    return (
      <UserContext.Consumer>
        {({ user }) => (
          <>
            <div className="market-header">
              <h1 className="market-title">
                {title}
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
              title={title}
              onCancel={this.hideAddMarketDialogFunc}
              size="large"
              customClass="dialog"
            >
              <Dialog.Body>
                <Form labelPosition="top">
                  <Form.Item label={addMarketFormTitle}>
                    <Input
                      placeholder={namePlaceholder}
                      trim={true}
                      onChange={_name => this.setName(_name)}
                      value={name}
                    />
                  </Form.Item>
                  <Form.Item label={addTagLabel}>
                    <Select
                      multiple
                      filterable
                      placeholder={addTagPlaceholder}
                      onChange={_selectedTags =>
                        this.handleSelectTags(_selectedTags)
                      }
                      remoteMethod={this.handleFilterTags}
                      remote
                    />
                  </Form.Item>
                </Form>
              </Dialog.Body>
              <Dialog.Footer>
                <Button onClick={this.hideAddMarketDialogFunc}>
                  {dialogCancelText}
                </Button>
                <Button
                  onClick={() => this.handleAddMarket(user)}
                  type="primary"
                  disabled={!name}
                >
                  {addButtonText}
                </Button>
              </Dialog.Footer>
            </Dialog>
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

export default NewMarket;
