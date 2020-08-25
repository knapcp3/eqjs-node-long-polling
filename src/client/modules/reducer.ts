import { Action } from '../models/Action.model';
import { State } from '../models/State.model';
import { SET_TALKS } from './actions';

export const reducer = (action: Action, state: State): State => {
  switch (action.type) {
    case SET_TALKS:
      return {
        ...state,
        talks: action.talks,
      };
    // case ADD_TALK_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case ADD_COMMENT_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case DELETE_TALK_REQUEST:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
