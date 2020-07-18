const THEMES = {
  default: {
    background: 'white',
    color: 'black',
    fontSize: '12pt'
  },
  dark: {
    background: 'black',
    color: 'white',
    fontSize: '14pt'
  }
};

const initState = {
  theme: THEMES.default,
};

export async function setDarkTheme(state) {
  return {
    ...state,
    theme: THEMES.dark
  };
}

export async function setDefaultTheme(state) {
  return {
    ...state,
    theme: THEMES.default
  };
}

export const actions = {
  setDarkTheme,
  setDefaultTheme
};

export default initState;
