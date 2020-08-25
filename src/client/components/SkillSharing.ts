import { createDomElement } from '../modules/utils';
import { State } from '../models/State.model';
import { Action } from '../models/Action.model';
import UsernameField from './UsernameField';
import Component from './Component';
import Talks from './Talks';
import TalkForm from './TalkForm';
import { talksService } from '../services/TalksService';
import { setTalks } from '../modules/actions';

const pollTalks = (dispatch) => {
  talksService.pollTalks((talks) => {
    dispatch(setTalks(talks));
  });
};

class SkillSharing extends Component {
  private _state: State;
  private _talksComponent: Talks;
  private _dispatch: (action: Action) => void;

  constructor(state: State, dispatch: (action: Action) => void) {
    pollTalks(dispatch);

    const usernameFieldDOM = UsernameField('User Name');
    const talkFormDOM = TalkForm();
    const talksComponent = new Talks(state.talks, dispatch);
    const dom = createDomElement(
      'div',
      {
        className: 'skill-sharing',
      },
      usernameFieldDOM,
      talksComponent.dom,
      talkFormDOM
    );

    super(dom);
    this._dispatch = dispatch;
    this._state = state;
    this._talksComponent = talksComponent;
  }

  get state(): State {
    return this._state;
  }

  syncWithState(state: State): void {
    this._talksComponent.syncWithState(state.talks);
  }
}

export default SkillSharing;
