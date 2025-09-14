import {nanoid} from 'nanoid/non-secure';
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CURRENT_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_PAGE,
  UPDATE_DEFAULT_VIEW,
} from './types';

export const addEmployee = (employee) => {
  return {
    type: ADD_EMPLOYEE,
    data: {
      id: nanoid(),
      ...employee,
    },
  };
};

export const updateEmployee = (employee) => {
  return {
    type: UPDATE_EMPLOYEE,
    data: {...employee},
  };
};

export const currentEmployee = (employee) => {
  return {
    type: CURRENT_EMPLOYEE,
    data: employee,
  };
};

export const deleteEmployee = (id) => {
  return {
    type: DELETE_EMPLOYEE,
    data: id,
  };
};

export const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    data: page,
  };
};

export const updateDefaultView = (view) => {
  return {
    type: UPDATE_DEFAULT_VIEW,
    data: view,
  };
};
