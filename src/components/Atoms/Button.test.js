import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {CustomButton} from './Button.js';

suite('custom-button', () => {
  test('is defined', () => {
    const el = document.createElement('custom-button');
    assert.instanceOf(el, CustomButton);
  });

  test('renders with default label', async () => {
    const el = await fixture(
      html`<custom-button label="Click Me"></custom-button>`
    );
    assert.shadowDom.equal(
      el,
      `<button style="--btn-bg: none; --btn-color: none;">Click Me</button>` // its fail, weird
    );
  });

  test('renders icon when type is icon', async () => {
    const el = await fixture(
      html`<custom-button type="icon" icon="editIcon"></custom-button>`
    );
    const button = el.shadowRoot.querySelector('button');
    assert.include(button.innerHTML, '<svg');
  });
});
