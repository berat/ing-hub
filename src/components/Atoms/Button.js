//TODO: primary, delete, normal, iconlabel, icon
import {LitElement, html, css} from 'lit';
import * as icons from './Icons';

export class CustomButton extends LitElement {
  static get properties() {
    return {
      label: {type: String},
      onClick: {type: Function},
      type: {type: 'icon' | 'blank' | 'prefix'},
      icon: {
        type: 'table' | 'card' | 'edit' | 'remove' | 'close' | undefined,
      },
      iconColor: {type: String},
    };
  }

  constructor() {
    super();
    this.label = '';
    this.type = 'blank';
  }

  render() {
    const {label, type, onClick, icon, iconColor} = this;

    if (type === 'icon') {
      return html`
        <button onClick=${onClick}>${icons[icon](iconColor)}</button>
      `;
    }

    return html`
      <button onClick=${onClick}>
        ${type == 'prefix' && icons[icon](iconColor)} ${label}
      </button>
    `;
  }

  static styles = css`
    button {
      background: none;
      outline: none;
      border: 0;
    }

    button:hover {
      cursor: pointer;
    }
  `;
}

window.customElements.define('custom-button', CustomButton);
