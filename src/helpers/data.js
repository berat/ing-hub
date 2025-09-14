// example data
export const TableData = {
  firstName: 'Berat',
  lastName: 'Bozkurt',
  dateOfEmployee: '23-09-2022',
  dateOfBirth: '04-01-1999',
  phone: '+904444444244',
  email: 'email@dotcom.com',
  department: 'Analytics',
  position: 'Junior',
};

// create 30 items by TableData
export const TableData30Times = Array.from({length: 30}, (_, i) => ({
  id: i + 1,
  ...TableData,
}));
