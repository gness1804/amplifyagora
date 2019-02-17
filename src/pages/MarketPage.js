/* eslint-disable no-unused-vars */
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// prettier-ignore
import {
  Loading,
  Tabs,
  Icon,
  Notification,
} from 'element-react';
import { Link } from 'react-router-dom';
import { getMarket } from '../graphql/queries';
import content from '../utils/content';
import styles from '../styling/index';
/* eslint-enable no-unused-vars */

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
    const { market, isLoading } = this.state;
    const {
      MarketsPage: { backButtonText },
    } = content;
    const {
      MarketsPage: { createdAtMssgStyles },
    } = styles;

    return isLoading ? (
      <Loading fullscreen />
    ) : (
      <>
        <Link className="link" to="/">
          {backButtonText}
        </Link>

        <span className="items-center pt-2">
          <h2 className="mb-mr">{market.name}</h2> - {market.owner}
        </span>
        <div className="items-center pt-2">
          <span style={createdAtMssgStyles}>
            <Icon name="date" className="icon" />
            {new Date(market.createdAt).toString()}
          </span>
        </div>
      </>
    );
  }
}

export default MarketPage;
