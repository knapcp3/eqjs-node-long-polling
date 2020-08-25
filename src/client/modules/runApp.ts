import SkillSharing from '../components/SkillSharing';
import { reducer } from './reducer';
import { State } from '../models/State.model';
import { Action } from '../models/Action.model';
import axios from 'axios';

axios.defaults.validateStatus = (status) => {
  return status < 400;
};

const runApp = (): void => {
  let state: State = {
    talks: [],
  };

  const dispatch = (action: Action): void => {
    console.log(action);
    state = reducer(action, state);
    skillSharingApp.syncWithState(state);
  };

  const skillSharingApp = new SkillSharing(state, dispatch);
  document.querySelector('#root')?.appendChild(skillSharingApp.dom);
};

export default runApp;
