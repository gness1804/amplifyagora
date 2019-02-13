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
      const { searchTerm } = this.state;
      this.setState({
        isSearching: true,
      });
      const queryObj = {
        filter: {
          or: [
            { name: { match: searchTerm } },
            { owner: { match: searchTerm } },
            { tags: { match: searchTerm } },
          ],
        },
        sort: {
          field: 'createdAt',
          direction: 'desc',
        },
      };
      const result = await API.graphql(
        graphqlOperation(searchMarkets, queryObj),
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
