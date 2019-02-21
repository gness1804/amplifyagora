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
  MarketPage: {
    createdAtMssgStyles: {
      color: 'var(--lightSquidInk)',
      paddingBottom: '1em',
    },
  },
  NewProduct: {
    photoPicker: {
      formContainer: {
        margin: 0,
        padding: '0.8em',
      },
      formSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      sectionBody: {
        margin: 0,
        width: '250px',
      },
      sectionHeader: {
        padding: '0.2em',
        color: 'var(--darkAmazonOrange)',
      },
      photoPickerButton: {
        display: 'none',
      },
    },
  },
};

export default styles;
