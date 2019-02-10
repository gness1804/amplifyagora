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
import { listMarkets } from '../graphql/queries';
import Error from './Error';

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
              // TODO: replace with actual markup
              <div>{market.name}</div>
            ))}
          </>
        );
      }}
    </Connect>
  );
};

export default MarketList;
