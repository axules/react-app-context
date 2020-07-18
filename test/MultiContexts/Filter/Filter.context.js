import initStorage from '../../../src';

const initState = {
  status: {
    items: ['All', 'New', 'Confirmed', 'Removed'],
    selected: 'All',
  },
  email: '',
};

export function selectStatus(state, selected) {
  const sel = state.status.items.find(el => el == selected);
  return {
    ...state,
    status: {
      ...state.status,
      selected: sel || state.status.items[0],
    },
  };
}

export function changeEmail(state, newEmail) {
  return {
    ...state,
    email: newEmail,
  };
}


const { Provider: FiltersProvider, connect: connectFilters } = initStorage(
  initState,
  { selectStatus, changeEmail },
);

export {
  FiltersProvider,
  connectFilters
};
