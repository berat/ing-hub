import {LitElement, html, css} from 'lit';
import '../Atoms/Button';

export class EmployeeTable extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    this.employees = [];
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
          ${employees.map(
            (emp) => html`
              <tr>
                <td class="bold-item">${emp.firstName}</td>
                <td class="bold-item">${emp.lastName}</td>
                <td>${emp.dateOfEmployee}</td>
                <td>${emp.dateOfBirth}</td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td class="column-action">
                  <custom-button
                    type="icon"
                    icon="editIcon"
                    iconColor="#f36f22"
                  ></custom-button>

                  <custom-button
                    type="icon"
                    icon="trashIcon"
                    iconColor="#f36f22"
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
