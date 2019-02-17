/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
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
import NewProduct from '../components/NewProduct';
import Product from '../components/Product';
/* eslint-enable no-unused-vars */

class MarketPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      market: null,
      isLoading: true,
      userIsMarketOwner: false,
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
      this.setState(
        {
          market: result.data.getMarket,
          isLoading: false,
        },
        () => {
          this.setState({
            userIsMarketOwner: this.checkMarketOwner(),
          });
        },
      );
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

  checkMarketOwner = () => {
    const {
      user: { username },
      user,
    } = this.props;
    const {
      market: { owner },
    } = this.state;
    return user ? username === owner : false;
  };

  render() {
    const { market, isLoading, userIsMarketOwner } = this.state;
    const {
      MarketPage: { backButtonText, addProductText, productsLabel },
    } = content;
    const {
      MarketPage: { createdAtMssgStyles },
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

        {/* New Markets */}
        <Tabs type="border-card" value={userIsMarketOwner ? '1' : '2'}>
          {userIsMarketOwner && (
            <Tabs.Pane
              label={
                <>
                  <Icon name="plus" className="icon" />
                  {addProductText}
                </>
              }
              name="1"
            >
              <NewProduct />
            </Tabs.Pane>
          )}
          {/* Products List */}
          <Tabs.Pane
            label={
              <>
                <Icon name="menu" className="icon" />
                {productsLabel} ({market.products.items.length})
              </>
            }
            name="2"
          >
            {/* <div className="product-list"> */}
            {/* {market.products.items.map(product => ( */}
            {/* <Product product={product} /> */}
            {/* ))} */}
            {/* </div> */}
          </Tabs.Pane>
        </Tabs>
      </>
    );
  }
}

export default MarketPage;

MarketPage.defaultProps = {
  user: undefined,
};

MarketPage.propTypes = {
  marketId: PropTypes.string.isRequired,
  user: PropTypes.shape({}),
};
