import { createDomElement } from '../modules/utils';
import { talksService } from '../services/TalksService';

const addTalk = (title: string, summary: string, presenter: string) => {
  talksService
    .createTalk({
      title,
      presenter,
      summary,
    })
    .then();
};

const TalkForm = (): HTMLElement => {
  const title = <HTMLInputElement>createDomElement('input', { type: 'text' });
  const summary = <HTMLInputElement>createDomElement('input', { type: 'text' });

  return createDomElement(
    'form',
    {
      onsubmit(event) {
        event.preventDefault();
        addTalk(
          title.value,
          summary.value,
          localStorage.getItem('username') || ''
        );
        event.target.reset();
      },
    },
    createDomElement('h3', undefined, 'Submit a Talk'),
    createDomElement(
      'section',
      {
        className: 'talk-form',
      },
      createDomElement('label', undefined, 'Title: ', title),
      createDomElement('label', undefined, 'Summary: ', summary),
      createDomElement(
        'div',
        undefined,
        createDomElement('button', { type: 'submit' }, 'Submit')
      )
    )
  );
};

export default TalkForm;
