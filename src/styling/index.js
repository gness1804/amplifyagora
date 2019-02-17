import { AmplifyTheme } from 'aws-amplify-react';

const styles = {
  App: {
    theme: {
      ...AmplifyTheme,
      button: {
        ...AmplifyTheme.button,
        backgroundColor: '#FF9900',
        fontWeight: 600,
      },
      navBar: {
        ...AmplifyTheme.nav,
        backgroundColor: '#FFC66F',
        display: 'flex',
        justifyContent: 'space-around',
      },
    },
  },
  MarketList: {
    cardBodyStyle: {
      padding: '0.7em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'spaceBetween',
    },
    cardItemsNumberStyle: {
      color: 'var(--darkAmazonOrange)',
    },
    cardOwnerMssgStyle: {
      color: 'var(--lightSquidInk)',
    },
  },
  MarketsPage: {
    createdAtMssgStyles: {
      color: 'var(--lightSquidInk)',
      paddingBottom: '1em',
    },
  },
};

export default styles;
