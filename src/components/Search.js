import React from 'react';
import { Button, Form, Input } from 'element-react';
import content from '../utils/content';

const {
  searchInputPlaceholder,
  searchInputIcon,
  searchButtonText,
  searchButtonIcon,
} = content.Search;

function Search() {
  return (
    <Form inline>
      <Form.Item>
        <Input placeholder={searchInputPlaceholder} icon={searchInputIcon} />
      </Form.Item>
      <Form.Item>
        <Button type="info" icon={searchButtonIcon}>
          {searchButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Search;
