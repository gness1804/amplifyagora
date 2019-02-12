import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
// prettier-ignore
import {
  Loading,
  Card,
  Icon,
  Tag,
} from 'element-react';
import { Link } from 'react-router-dom';
import { listMarkets } from '../graphql/queries';
import Error from './Error';
import styles from '../styling';
import content from '../utils/content';
import { onCreateMarket } from '../graphql/subscriptions';

const MarketList = () => {
  const onNewMarket = (prevQuery, newData) => {
    const { items: oldMarkets } = prevQuery.listMarkets;
    const newMarket = newData.onCreateMarket;
    const newMarkets = [newMarket, ...oldMarkets];
    return {
      ...prevQuery,
      listMarkets: {
        ...prevQuery.listMarkets,
        items: newMarkets,
      },
    };
  };

  return (
    <Connect
      query={graphqlOperation(listMarkets)}
      subscription={graphqlOperation(onCreateMarket)}
      onSubscriptionMsg={onNewMarket}
    >
      {({ data, loading, errors }) => {
        // check if there are any errors or in loading state or markets do not exist in data
        if (errors.length > 0) {
          return <Error errors={errors} />;
        }
        if (loading || !data || !data.listMarkets) {
          return <Loading fullscreen />;
        }

        const { items: markets } = data.listMarkets;
        return (
          <>
            <h2 className="header">
              <img
                src={content.MarketList.headerLinkIcon}
                alt={content.MarketList.headerLinkIconAltText}
                className="large-icon"
              />
              {content.MarketList.headerText}
            </h2>
            {markets.map(market => (
              <div key={market.id} className="my-2">
                <Card bodyStyle={styles.MarketList.cardBodyStyle}>
                  <>
                    <span className="flex">
                      <Link className="link" to={`/markets/${market.id}`}>
                        {market.name}
                      </Link>
                      {market.products && market.products.items && (
                        <span style={styles.MarketList.cardItemsNumberStyle}>
                          Total items: {market.products.items.length}
                        </span>
                      )}
                      <img
                        src={content.MarketList.shoppingCartLink}
                        alt={content.MarketList.shoppingCartLinkAltText}
                      />
                    </span>
                    <div style={styles.MarketList.cardOwnerMssgStyle}>
                      {market.owner}
                    </div>
                    {market.tags &&
                      market.tags.map(tag => (
                        <Tag key={tag} type="danger" className="mx-1">
                          {tag}
                        </Tag>
                      ))}
                  </>
                </Card>
              </div>
            ))}
          </>
        );
      }}
    </Connect>
  );
};

export default MarketList;
