import {msg} from '@lit/localize';
import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {currentEmployee} from '../../redux/action';
import {store} from '../../redux/store';
import '../Atoms/Button';

export class EmployeeCard extends connect(store)(LitElement) {
  modal;
  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    this.employees = [];
  }

  handleDelete(employee) {
    store.dispatch(currentEmployee(employee));
    this.openModal();
  }

  openModal() {
    this.dispatchEvent(
      new CustomEvent('open-modal', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleEdit(employee) {
    store.dispatch(currentEmployee(employee));
    Router.go('/employee-management/edit');
  }

  render() {
    const {employees} = this;
    return html`<section>
      ${employees.map(
        (employee) => html`
          <div class="card">
            <div class="item">
              <small>${msg('First Name:')}</small>
              <span>${employee.firstName}</span>
            </div>
            <div class="item">
              <small>${msg('Last Name:')}</small>
              <span>${employee.lastName}</span>
            </div>
            <div class="item">
              <small>${msg('Date Of Employee')}</small>
              <span>${employee.dateOfEmployee}</span>
            </div>
            <div class="item">
              <small>${msg('Date Of Birth:')}</small>
              <span>${employee.dateOfBirth}</span>
            </div>
            <div class="item">
              <small>${msg('Phone:')}</small>
              <span>${employee.phone}</span>
            </div>
            <div class="item">
              <small>${msg('Email:')}</small>
              <span>${employee.email}</span>
            </div>
            <div class="item">
              <small>${msg('Department:')}</small>
              <span>${employee.department}</span>
            </div>
            <div class="item">
              <small>${msg('Position:')}</small>
              <span>${employee.position}</span>
            </div>
            <div class="actions">
              <custom-button
                label="Edit"
                type="prefix"
                icon="editIcon"
                iconColor="#fff"
                bgColor="#102e6f"
                textColor="#fff"
                .onClick=${() => this.handleEdit(employee)}
              ></custom-button>
              <custom-button
                label="Delete"
                type="prefix"
                icon="trashIcon"
                bgColor="#f36f22"
                textColor="#fff"
                iconColor="#fff"
                .onClick=${() => this.handleDelete(employee)}
              ></custom-button>
            </div>
          </div>
        `
      )}
    </section> `;
  }

  static styles = css`
    section {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      width: 85%;
      margin: 0px auto;
    }
    .card {
      width: 40%;
      background: white;
      display: flex;
      flex-wrap: wrap;
      padding: 30px 50px;
      gap: 20px;
    }
    @media (max-width: 1650px) {
      section {
        width: 100%;
      }
      .card {
        width: 40%;
      }
    }
    @media (max-width: 1404px) {
      .card {
        width: 90%;
      }
    }
    .card .item {
      width: 45%;
      display: flex;
      flex-direction: column;
    }

    .card .item small {
      font-size: 0.9rem;
      color: #969696;
    }
    .card .item span {
      font-size: 1.2rem;
    }

    .actions {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  `;
}

customElements.define('employee-card', EmployeeCard);
