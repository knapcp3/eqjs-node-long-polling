import { Action } from '../models/Action.model';
import { Talk } from '../models/Talk.model';

// export const SET_USERNAME = 'SET_USERNAME';
export const SET_TALKS = 'SET_TALKS';
// export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
// export const DELETE_TALK_REQUEST = 'DELETE_TALK_REQUEST';
// export const ADD_TALK_REQUEST = 'ADD_TALK_REQUEST';

// export const setUsername = (username: string): Action => ({
//   type: SET_USERNAME,
//   username: username,
// });

export const setTalks = (talks: Talk[]): Action => ({
  type: SET_TALKS,
  talks: talks,
});

// export const addComment = (talkId: string, message: string): Action => ({
//   type: ADD_COMMENT_REQUEST,
//   talkId,
//   message,
// });

// export const deleteTalk = (talkId: string): Action => ({
//   type: DELETE_TALK_REQUEST,
//   talkId,
// });

// export const addTalk = (title: string, summary: string): Action => ({
//   type: ADD_TALK_REQUEST,
//   title,
//   summary,
// });
