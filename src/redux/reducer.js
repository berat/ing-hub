import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CURRENT_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_PAGE,
  UPDATE_DEFAULT_VIEW,
} from './types';
import * as constants from '../helpers/constants';
import {createSelector} from 'reselect';

const INITIAL_STATE = {
  employees: [],
  currentEmployee: {},
  ui: {
    defaultView: 'table',
  },
  pagination: {
    page: 1,
    totalPage: 1,
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE: {
      const newEmployees = [action.data, ...state.employees];
      return {
        ...state,
        employees: newEmployees,
        pagination: {
          ...state.pagination,
          pageSize: Math.ceil(newEmployees.length / constants.PER_SIZE),
        },
      };
    }
    case UPDATE_EMPLOYEE: {
      const newEmployees = state.employees.map((employee) => {
        if (employee.id === action.data.id) {
          return action.data;
        } else {
          return employee;
        }
      });
      return {
        ...state,
        employees: newEmployees,
      };
    }
    case CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.data,
      };
    case DELETE_EMPLOYEE: {
      const newEmployees = state.employees.filter(
        (employee) => employee.id !== action.data
      );
      return {
        ...state,
        employees: newEmployees,
        pagination: {
          ...state.pagination,
          pageSize: Math.ceil(newEmployees.length / constants.PER_SIZE),
        },
      };
    }
    case UPDATE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.data,
        },
      };
    case UPDATE_DEFAULT_VIEW:
      return {
        ...state,
        ui: {
          defaultView: action.data,
        },
      };
    default:
      return state;
  }
};

const getEmployees = (state) => state.employees;
export const getCurrentEmployee = (state) => state.currentEmployee;
export const getPagination = (state) => state.pagination;
export const getDefaultView = (state) => state.ui.defaultView;

export const getemployeesByPage = createSelector(
  getEmployees,
  getPagination,
  (employees, pagination) => {
    if (!employees || employees.length === 0) return [];

    const {page, pageSize} = pagination;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return employees.slice(startIndex, endIndex);
  }
);
