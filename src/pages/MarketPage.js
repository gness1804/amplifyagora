import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// prettier-ignore
import {
  Loading,
  Tabs,
  Icon,
  Notification,
} from 'element-react';
import { getMarket } from '../graphql/queries';

class MarketPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      market: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetMarket();
  }

  handleGetMarket = async () => {
    const { marketId: id } = this.props;
    try {
      const input = {
        id,
      };

      const result = await API.graphql(graphqlOperation(getMarket, input));
      this.setState({
        market: result.data.getMarket,
        isLoading: false,
      });
    } catch (err) {
      /* eslint-disable no-console */
      console.error(
        `Error fetching market with id ${id}: ${err.message ||
          JSON.stringify(err)}`,
      );
      Notification.error({
        title: 'Error',
        message: `Error adding market: ${err.message || JSON.stringify(err)}`,
      });
      /* eslint-enable no-console */
    }
  };

  render() {
    return <div>Market Page with id: {this.props.marketId}</div>;
  }
}

export default MarketPage;
