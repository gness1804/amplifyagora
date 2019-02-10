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

const MarketList = () => {
  return (
    <Connect query={graphqlOperation(listMarkets)}>
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
