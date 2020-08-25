import Component from './Component';
import { createDomElement } from '../modules/utils';
import { Talk } from '../models/Talk.model';
import { Action } from '../models/Action.model';
import { Comment } from '../models/Comment.model';
import { talksService } from '../services/TalksService';

const addComment = (talkId, message, author) => {
  talksService
    .createComment(talkId, {
      message,
      author,
    })
    .then();
};

const deleteTalk = (talkId: string) => {
  talksService.deleteTalk(talkId);
};

class Talks extends Component {
  private _dispatch: (action: Action) => void;

  constructor(talks: Talk[], dispatch: (action: Action) => void) {
    super(Talks.renderTalks(talks));
    this._dispatch = dispatch;
  }

  static renderTalks(talks: Talk[]): HTMLElement {
    return createDomElement(
      'ul',
      {
        className: 'talks',
      },
      ...talks.map((talk) => Talks.renderTalk(talk))
    );
  }

  static renderTalk(talk: Talk): HTMLElement {
    return createDomElement(
      'section',
      { className: 'talk' },
      createDomElement(
        'h2',
        undefined,
        talk.title,
        ' ',
        createDomElement(
          'button',
          {
            type: 'button',
            onclick() {
              deleteTalk(talk.id);
            },
          },
          'Delete'
        )
      ),
      createDomElement(
        'div',
        undefined,
        'by ',
        createDomElement('strong', undefined, talk.presenter)
      ),
      createDomElement('p', undefined, talk.summary),
      ...talk.comments.map(Talks.renderComment),
      createDomElement(
        'form',
        {
          onsubmit(event) {
            event.preventDefault();
            const form = event.target;
            addComment(
              talk.id,
              form.elements.comment.value,
              localStorage.getItem('username')
            );
            form.reset();
          },
        },
        createDomElement('input', { type: 'text', name: 'comment' }),
        ' ',
        createDomElement('button', { type: 'submit' }, 'Add comment')
      )
    );
  }

  static renderComment(comment: Comment): HTMLElement {
    return createDomElement(
      'p',
      { className: 'comment' },
      createDomElement('strong', undefined, comment.author),
      ': ',
      comment.message
    );
  }

  syncWithState(talks: Talk[]): void {
    this.replaceDOM(Talks.renderTalks(talks));
  }
}

export default Talks;
