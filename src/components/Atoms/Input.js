import {LitElement, html, css} from 'lit';

export class CustomInput extends LitElement {
  static properties = {
    type: {type: String},
    label: {type: String},
    value: {type: String},
    options: {type: Array},
  };

  constructor() {
    super();
    this.type = 'text';
    this.label = '';
    this.value = '';
    this.options = [];
  }

  handleChange(e) {
    this.value = e.target.value;
    console.log(this.value);
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {value: this.value},
      })
    );
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        ${this.type === 'select'
          ? html`
              <select @change=${this.handleChange}>
                ${this.options.map(
                  (opt) =>
                    html`<option value=${opt.value}>${opt.label}</option>`
                )}
              </select>
            `
          : html`
              <input
                type=${this.type}
                .value=${this.value}
                @input=${this.handleChange}
              />
            `}
      </div>
    `;
  }

  static styles = css`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    label {
      margin-bottom: 0.25rem;
      font-weight: 500;
      color: #333;
    }

    input,
    select {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      transition: border 0.2s;
    }

    input:focus,
    select:focus {
      border-color: #f36f22;
    }
  `;
}

customElements.define('custom-input', CustomInput);
