import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import {connect} from 'pwa-helpers';
import {store} from './redux/store.js';

import './components/Header';
import './pages/Home';
import './pages/ManageEmployee';
import './pages/NotFound';

export class AppRoot extends connect(store)(LitElement) {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#router');
    const router = new Router(outlet);

    router.setRoutes([
      {path: '/', component: 'app-homepage'},
      {path: '/employee-management/add', component: 'employee-management'},
      {
        path: '/employee-management/edit',
        component: 'employee-management',
      },
      {
        path: '(.*)',
        component: 'not-found',
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
