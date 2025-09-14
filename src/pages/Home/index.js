import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {store} from '../../redux/store';
import {msg, str} from '@lit/localize';
import {
  getEmployeesByPage,
  getPagination,
  getDefaultView,
  getCurrentEmployee,
} from '../../redux/reducer';
import {
  deleteEmployee,
  updateDefaultView,
  updatePage,
} from '../../redux/action';

import '../../components/Atoms/Button';
import '../../components/Table/';
import '../../components/Card/';
import '../../components/Modal/';
import '../../components/Pagination/';

export class AppHomepage extends connect(store)(LitElement) {
  static properties = {
    employees: {},
    pagination: {},
    viewType: '',
    currentEmployee: {},
  };

  stateChanged(state) {
    this.employees = getEmployeesByPage(state);
    this.pagination = getPagination(state);
    this.currentEmployee = getCurrentEmployee(state);
    this.viewType = getDefaultView(state);
  }

  firstUpdated() {
    this.modal = this.renderRoot.querySelector('#myModal');
  }

  handleOpenModal() {
    if (this.modal) {
      this.modal.open = true;
    }
  }

  handleCloseModal() {
    if (this.modal) {
      this.modal.open = false;
    }
  }

  deleteEmployee(id) {
    store.dispatch(deleteEmployee(id));
    this.handleCloseModal();
  }

  render() {
    const {employees, pagination, viewType, currentEmployee} = this;
    return html`
      <main>
        <custom-modal id="myModal">
          <span slot="title">${msg('Are you sure?')}</span>

          <p>
            ${msg(
              str`Selected employee record of ${
                currentEmployee.firstName + ' ' + currentEmployee.lastName
              } will be deleted`
            )}
          </p>

          <div slot="footer">
            <custom-button
              type="blank"
              label=${msg('Cancel')}
              .onClick=${() => this.handleCloseModal()}
            ></custom-button>
            <custom-button
              label=${msg('Delete')}
              bgColor="#f36f22"
              textColor="#fff"
              .onClick=${() => this.deleteEmployee(currentEmployee.id)}
            ></custom-button>
          </div>
        </custom-modal>
        <header>
          <h1>${msg('Employee List')}</h1>
          <div class="view-type">
            <custom-button
              type="icon"
              icon="tableIcon"
              iconColor="#f36f22"
              .onClick=${() => this.handleViewTypeChange('table')}
            ></custom-button>
            <custom-button
              type="icon"
              icon="cardIcon"
              iconColor="#f36f22"
              .onClick=${() => this.handleViewTypeChange('card')}
            ></custom-button>
          </div>
        </header>
        ${viewType === 'table'
          ? html`<employee-table
              .employees=${employees}
              @open-modal=${this.handleOpenModal}
            ></employee-table>`
          : html`<employee-card
              .employees=${employees}
              @open-modal=${this.handleOpenModal}
            ></employee-card>`}
        <pagination-view
          .currentPage=${pagination.page}
          .totalPages=${pagination.totalPage}
          @page-changed=${(e) => this.handlePageChange(e)}
        ></pagination-view>
      </main>
    `;
  }

  handleViewTypeChange(type) {
    store.dispatch(updateDefaultView(type));
  }

  handlePageChange(e) {
    const newPage = e.detail.page;
    store.dispatch(updatePage(newPage));

    this.page = newPage;
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
