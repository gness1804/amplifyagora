import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import NewMarket from '../components/NewMarket';
import MarketList from '../components/MarketList';
import { searchMarkets } from '../graphql/queries';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      isSearching: false,
    };
  }

  handleSearchChange = searchTerm => this.setState({ searchTerm });

  handleClearSearch = () =>
    this.setState({
      searchTerm: '',
      searchResults: [],
    });

  handleSearch = async event => {
    try {
      event.preventDefault();
      this.setState({
        isSearching: true,
      });
      const result = await API.graphql(
        graphqlOperation(searchMarkets, {
          filter: {
            or: [
              { name: { match: this.state.searchTerm } },
              { owner: { match: this.state.searchTerm } },
              { tags: { match: this.state.searchTerm } },
            ],
          },
          sort: {
            field: 'createdAt',
            direction: 'desc',
          },
        }),
      );
      this.setState({
        isSearching: false,
        searchResults: result.data.searchMarkets.items,
      });
    } catch (err) {
      throw new Error(
        `There was an error attempting to search: ${err.message ||
          JSON.stringify(err)}`,
      );
    }
  };

  render() {
    const { searchTerm, isSearching } = this.state;
    return (
      <>
        <NewMarket
          searchTerm={searchTerm}
          handleSearchChange={this.handleSearchChange}
          handleClearSearch={this.handleClearSearch}
          handleSearch={this.handleSearch}
          isSearching={isSearching}
        />
        <MarketList />
      </>
    );
  }
}

export default HomePage;
