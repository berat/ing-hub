import {LitElement, html, css} from 'lit';

export class CustomModal extends LitElement {
  static properties = {
    open: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.open = false;
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('modal-closed'));
  }

  render() {
    return html`
      <div class="backdrop" @click=${this.close}></div>
      <div class="modal">
        <header class="modal-header">
          <slot name="title"></slot>
          <button class="close-btn" @click=${this.close}>&times;</button>
        </header>
        <section class="modal-body">
          <slot></slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .modal {
      position: relative;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      max-width: 500px;
      width: 90%;
      animation: fadeIn 0.2s ease-out;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .modal-body {
      padding: 1rem;
    }

    .modal-footer {
      padding: 0.75rem 1rem;
      border-top: 1px solid #eee;
      text-align: right;
    }

    .close-btn {
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
}

customElements.define('custom-modal', CustomModal);
