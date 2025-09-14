import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {Router} from '@vaadin/router';
import {store} from '../../redux/store';
import {msg} from '@lit/localize';

import '../../components/Atoms/Button';
import '../../components/Atoms/Input';
import {addEmployee, updateEmployee} from '../../redux/action';

export class EmployeeManagement extends connect(store)(LitElement) {
  static properties = {
    firstName: {type: String},
    lastName: {type: String},
    dateOfEmployee: {type: String},
    dateOfBirth: {type: String},
    phone: {type: String},
    email: {type: String},
    department: {type: String},
    position: {type: String},
    isEdit: {type: Boolean},
    employee: {type: Object},
    employeeId: {type: String},
  };

  constructor() {
    super();
    this.resetForm();
    this.isEdit = false;
    this.employee = '';
  }

  stateChanged(state) {
    this.employee = state.currentEmployee;
  }

  firstUpdated() {
    const path = window.location.pathname;

    if (path.startsWith('/employee-management/edit')) {
      const employee = store.getState().currentEmployee;
      console.log(employee);
      if (employee) {
        this.employeeId = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.dateOfEmployee = employee.dateOfEmployee;
        this.dateOfBirth = employee.dateOfBirth;
        this.phone = employee.phone;
        this.email = employee.email;
        this.department = employee.department;
        this.position = employee.position;
        this.isEdit = true;
      }
    } else if (path.startsWith('/employee-management/add')) {
      this.isEdit = false;
      this.resetForm();
    }
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployee = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
  }

  handleSave() {
    const employeeData = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfEmployee: this.dateOfEmployee,
      dateOfBirth: this.dateOfBirth,
      phone: this.phone,
      email: this.email,
      department: this.department,
      position: this.position,
    };

    console.log(Object.values(employeeData));
    console.log(employeeData);
    const hasEmpty = Object.values(employeeData).some(
      (v) => !v || v.trim() === ''
    );
    if (hasEmpty) {
      alert(msg('Please fill in all fields before saving.'));
      return;
    }

    if (this.isEdit) {
      store.dispatch(updateEmployee({...employeeData, id: this.employeeId}));
    } else {
      store.dispatch(addEmployee(employeeData));
    }
    Router.go('/');
  }

  hanldeCancel() {
    this.resetForm();

    Router.go('/');
  }

  render() {
    return html`
      <main>
        <h1>Employee Management</h1>
        <section>
          <div class="inputs">
            <custom-input
              label="First Name"
              type="text"
              .value=${this.firstName}
              @value-changed=${(e) => (this.firstName = e.detail.value)}
            ></custom-input>
            <custom-input
              label="Last Name"
              type="text"
              .value=${this.lastName}
              @value-changed=${(e) => (this.lastName = e.detail.value)}
            ></custom-input>
            <custom-input
              label="Date of Employment"
              type="date"
              .value=${this.dateOfEmployee}
              @value-changed=${(e) => (this.dateOfEmployee = e.detail.value)}
            ></custom-input>

            <custom-input
              label="Date of Birth"
              .value=${this.dateOfBirth}
              type="date"
              @value-changed=${(e) => (this.dateOfBirth = e.detail.value)}
            ></custom-input>
            <custom-input
              label="Phone"
              .value=${this.phone}
              type="tel"
              @value-changed=${(e) => (this.phone = e.detail.value)}
            ></custom-input>
            <custom-input
              label="Email"
              .value=${this.email}
              type="email"
              @value-changed=${(e) => (this.email = e.detail.value)}
            ></custom-input>

            <custom-input
              label="Department"
              .value=${this.department}
              type="text"
              @value-changed=${(e) => (this.department = e.detail.value)}
            ></custom-input>
            <custom-input
              label="Position"
              .value=${this.position}
              type="select"
              .options=${[
                {value: 'Junior', label: 'Junior'},
                {value: 'Intermediate', label: 'Intermediate'},
                {value: 'Senior', label: 'Senior'},
              ]}
              @value-changed=${(e) => (this.position = e.detail.value)}
            >
            </custom-input>
          </div>
          <div class="actions">
            <custom-button
              label=${msg('Save')}
              bgColor="#f36f22"
              textColor="#fff"
              .onClick=${() => this.handleSave()}
            ></custom-button>
            <custom-button
              label=${msg('Cancel')}
              textColor="#102e6f"
              .onClick=${() => this.handleCancel()}
            ></custom-button>
          </div>
        </section>
      </main>
    `;
  }

  static styles = css`
    h1 {
      color: #f36f22;
    }

    section {
      background: #fff;
      padding: 20px 30px;
      width: 100%;
    }

    section div.inputs {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      flex: 1;
    }

    .inputs * {
      width: 30%;
    }
  `;
}

window.customElements.define('employee-management', EmployeeManagement);
