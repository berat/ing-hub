import * as data from './data';
import * as constants from './constants';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('ing_hub');
    if (serializedState === null) {
      const initialData = JSON.stringify({
        employees: data.TableData30Times,
        currentEmployee: {},
        ui: {
          defaultView: 'table',
        },
        pagination: {
          page: 1,
          totalPage: Math.ceil(
            data.TableData30Times.length / constants.PER_SIZE
          ),
        },
      });
      localStorage.setItem('ing_hub', initialData);
      return JSON.parse(serializedState);
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('ing_hub error:', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      employees: state.employees,
      pagination: state.pagination,
      ui: state.ui,
      currentEmployee: state.currentEmployee,
    });
    localStorage.setItem('ing_hub', serializedState);
  } catch (err) {
    console.warn('ing_hub error:', err);
  }
};
