import {LitElement, html, css} from 'lit';
import {msg} from '@lit/localize';

export class NotFound extends LitElement {
  render() {
    return html` <h1>${msg('Not Found, please check where you are!')}</h1> `;
  }

  static styles = css`
    h1 {
      margin: 20px auto;
      color: #f36f22;
    }
  `;
}

window.customElements.define('not-found', NotFound);
