const permissions = {
  admin: ['dashboard', 'users', 'drivers', 'cabs', 'locations'],
  subadmin: ['dashboard', 'users', 'drivers', 'cabs', 'locations'],
  employee: ['dashboard', 'cabs', 'locations'],
  driver: ['dashboard', 'cabs', 'locations'],
};

export default permissions;