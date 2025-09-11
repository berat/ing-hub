import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import {connect} from 'pwa-helpers';
import {store} from './redux/store.js';

import './components/Header';
import './pages/Home';

export class AppRoot extends connect(store)(LitElement) {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#router');
    const router = new Router(outlet);

    router.setRoutes([
      {path: '/', component: 'app-homepage'},
      {path: '/employee-management/add', component: 'add-employee-management'},
      {
        path: '/employee-management/edit',
        component: 'edit-employee-management',
      },
    ]);
  }

  render() {
    return html`
      <main>
        <app-header></app-header>
        <div id="router"></div>
      </main>
    `;
  }

  static styles = css`
    #router {
      width: 90%;
      margin: 0px auto;
    }
  `;
}

window.customElements.define('app-root', AppRoot);
