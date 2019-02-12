import React from 'react';
import { Button, Form, Input } from 'element-react';
import * as PropTypes from 'prop-types';
import content from '../utils/content';

const {
  searchInputPlaceholder,
  searchInputIcon,
  searchButtonText,
  searchButtonIcon,
} = content.Search;

function Search({
  handleSearchChange,
  handleClearSearch,
  searchTerm,
  handleSearch,
  isSearching,
}) {
  return (
    <Form inline onSubmit={handleSearch}>
      <Form.Item>
        <Input
          placeholder={searchInputPlaceholder}
          icon={searchInputIcon}
          value={searchTerm}
          onIconClick={handleClearSearch}
          onChange={handleSearchChange}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="info"
          icon={searchButtonIcon}
          onClick={handleSearch}
          loading={isSearching}
        >
          {searchButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Search;

Search.defaultProps = {
  searchTerm: '',
};

Search.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};
