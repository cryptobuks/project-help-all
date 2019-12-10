import types from '../actions/types';

const initialState = {
  isLoggedIn:false,
  isVerified:false,
  isAdmin: false,
  id: null,
  username:'',
  listings:[],
  token:'',
  confirmationCode:null,
  errors:{},
  isProcessing:false,
  languageEN: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PROCESS_DONOR: {
      return {
        isLoggedIn: true,
        isAdmin: false,
        id: null,
        confirmationCode:null,
        errors:{},
        isProcessing:false
      };
    }
    case types.START_PATRON_VERIFICATION: {
      const { confirmationCode } = action;
      return {
        ...state,
        errors:{},
        confirmationCode
      };
    }
    case types.FINISH_PATRON_VERIFICATION: {
      const { patron, token } = action.payload;
      return {
        ...state,
        isLoggedIn: false,
        isVerified:true,
        isAdmin: true,
        id:patron.id,
        username:patron.username,
        token,
        confirmationCode:null,
        errors:{},
        isProcessing:false
      };
    }
    case types.FINISH_CRED_MODIFICATION: {
      const { username,id } = action.payload;
      return {
        ...state,
        id,
        username,
        isLoggedIn:true
      };
    }
    case types.REJECT_PATRON_VERIFICATION: {
      const { msg } = action;
      function errorBuilder(e){
        switch(e.charAt(0)){
          case 'U':
            return { username: e };
          case 'P':
            return { password: e };
          case 'C':
            return { identifier: e };
          default:
            return { connectivity: e };
            break;
        }
      }
      return {
        ...state,
        isVerified:false,
        isLoggedIn: false,
        isAdmin: false,
        id: null,
        confirmationCode:null,
        errors: errorBuilder(msg),
        isProcessing:false
      };
    }
    case types.LOGOUT_PATRON: {
      return {
        ...initialState
      };
    }
    case types.LOGIN_PATRON: {
      const { token,patron } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isVerified:true,
        isAdmin: true,
        id:patron.id,
        username:patron.username,
        listings:patron.listings,
        token:token,
        confirmationCode:null,
        errors:{},
        isProcessing:false
      };
    }
    case types.CHANGE_LANGUAGE: {
      const { lang } = action;
      return {
        ...state,
        languageEN: lang
      };
    }
    default: {
      return state;
    }
  }
};
