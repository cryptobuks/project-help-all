import types from '../actions/types';

const initialState = {
  categories:[],
  listings:[],
  isLoading:false,
  errorMessage:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_LOADING_DATA: {
      return {
        ...state,
        isLoading:true,
      };
    }
    case types.FINISH_LOADING_DATA: {
      const { data } = action;

      return {
        isLoading: false,
        errorMessage: '',
        categories: data.categories || [],
        listings: data.listings || []
      }
    }
    case types.ERROR_LOADING_DATA: {
      const { categories, error } = action.payload;
      return {
        categories: cetegories,
        isLoading: false,
        errorMessage: errorMessage
      };
    }
    case types.UPDATE_LISTING_DATA: {
      const { payload } = action;
      return {
        ...state,
        listings: payload,
      }
    }
    default: {
      return state;
    }
  }
};
