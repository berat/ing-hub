import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {currentEmployee} from '../../redux/action';
import {store} from '../../redux/store';
import '../Atoms/Button';

export class EmployeeTable extends connect(store)(LitElement) {
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
    return html`
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employee</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${employees?.map(
            (employee) => html`
              <tr>
                <td class="bold-item">${employee.firstName}</td>
                <td class="bold-item">${employee.lastName}</td>
                <td>${employee.dateOfEmployee}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td class="column-action">
                  <custom-button
                    type="icon"
                    icon="editIcon"
                    iconColor="#f36f22"
                    .onClick=${() => this.handleEdit(employee)}
                  ></custom-button>

                  <custom-button
                    type="icon"
                    icon="trashIcon"
                    iconColor="#f36f22"
                    .onClick=${() => this.handleDelete(employee)}
                  ></custom-button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: sans-serif;
      background: white;
      border-radius: 12px;
    }

    th,
    td {
      border: 0;
      border-bottom: 1px solid #ddd;
      padding: 18px;
      color: #484848;
    }

    td.bold-item {
      font-weight: 600;
    }
    th {
      font-weight: bold;
      text-align: left;
      color: #f36f22;
    }

    tr:hover {
      background-color: #f9f9f9;
    }
  `;
}

customElements.define('employee-table', EmployeeTable);
