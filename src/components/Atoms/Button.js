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
      bgColor: {type: String},
      textColor: {type: String},
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
        <button
          style="
                   --btn-bg: ${this.bgColor || 'none'};
                   --btn-color: ${this.textColor || 'none'};
                 "
          @click=${onClick}
        >
          ${icons[icon](iconColor)}
        </button>
      `;
    }

    return html`
      <button
        style="--btn-bg: ${this.bgColor || 'none'};--btn-color: ${this
          .textColor || 'none'};"
        @click=${onClick}
      >
        ${type == 'prefix' ? icons[icon](iconColor) : undefined} ${label}
      </button>
    `;
  }

  static styles = css`
    button {
      background: var(--btn-bg);
      outline: none;
      color: var(--btn-color);
      border: 0;
      border-radius: 4px;
      padding: 8px 15px;
      display: inline-flex;
      align-items: center;
      gap: 14px;
    }

    button:hover {
      cursor: pointer;
    }
  `;
}

window.customElements.define('custom-button', CustomButton);
