import { createDomElement } from '../modules/utils';

const UsernameField = (initUsername: string): HTMLElement => {
  localStorage.setItem('username', initUsername);

  return createDomElement(
    'label',
    {},
    'Your name: ',
    createDomElement('input', {
      type: 'text',
      value: initUsername,
      onchange: function (event) {
        localStorage.setItem('username', event.target.value);
      },
    })
  );
};

export default UsernameField;
