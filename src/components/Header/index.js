import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {store} from '../../redux/store';
import {msg} from '@lit/localize';
import * as icons from '../Atoms/icons';

const logo = '/assets/logo.png';

export class AppHeader extends connect(store)(LitElement) {
  toggleLanguage() {
    const newLang = this.language === 'en' ? 'tr' : 'en';

    // Did not find to change lit-locale
  }

  render() {
    const flagToShow = this.language === 'tr' ? icons.trIcon() : icons.enIcon();

    return html`
      <header>
        <a href="/">
          <img src=${logo} alt="ING Hub" />
        </a>
        <nav>
          <li>
            <a href="/">
              ${icons.employeeIcon('#f36f22')} ${msg('Employees')}</a
            >
          </li>
          <li>
            <a href="/employee-management/add">
              ${icons.addIcon('#f36f22')} ${msg('Add New')}
            </a>
          </li>
          <li>
            <button @click=${this.toggleLanguage} class="lang-btn">
              <img src=${flagToShow} alt="Switch Language" />
            </button>
          </li>
        </nav>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      background-color: #f8f8f8;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    nav {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }

    nav li {
      margin: 0;
    }

    a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.2s ease;
      color: #f36f22;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    a:hover {
      opacity: 0.7;
    }

    img {
      height: 40px;
    }
  `;
}

window.customElements.define('app-header', AppHeader);
