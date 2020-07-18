import React, { PureComponent } from 'react';
import { FiltersProvider } from './Filter.context';
import Filter from './Filter';


class FilterContainer extends PureComponent {
  render() {
    return (
      <FiltersProvider>
        <Filter />
      </FiltersProvider>
    );
  }
}

export default FilterContainer;
