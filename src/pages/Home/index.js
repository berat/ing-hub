import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {store} from '../../redux/store';
import * as data from '../../helpers/data';
import '../../components/Atoms/Button';
import '../../components/Table/';

export class AppHomepage extends connect(store)(LitElement) {
  render() {
    return html`
      <main>
        <header>
          <h1>Employee List</h1>
          <div class="view-type">
            <custom-button
              type="icon"
              icon="tableIcon"
              iconColor="#f36f22"
            ></custom-button>
            <custom-button
              type="icon"
              icon="cardIcon"
              iconColor="#f36f22"
            ></custom-button>
          </div>
        </header>
        <employee-table .employees=${data.TableData30Times}></employee-table>
      </main>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px auto;
    }
    h1 {
      color: #f36f22;
    }
  `;
}

window.customElements.define('app-homepage', AppHomepage);
