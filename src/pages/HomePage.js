import React from 'react';
import NewMarket from '../components/NewMarket';
import MarketList from '../components/MarketList';

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

  handleSearch = event => {
    // will execute the search query
    event.preventDefault();
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
