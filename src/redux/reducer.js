const INITIAL_STATE = {
  count: 0,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET':
      return {
        ...state,
      };
    default:
      return state;
  }
};
