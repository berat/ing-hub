import {LitElement, html} from 'lit';
import {Router} from '@vaadin/router';
import {connect} from 'pwa-helpers';
import {store} from './redux/store.js';

const router = new Router(document.getElementById('router'));

router.setRoutes([
  {path: '/', component: 'homepage'},
  {path: '/employee-management', component: 'employee-management'},
]);

export class AppRoot extends connect(store)(LitElement) {
  render() {
    return html`
      <main>
        <div id="router">hello world</div>
      </main>
    `;
  }
}

window.customElements.define('app-root', AppRoot);
