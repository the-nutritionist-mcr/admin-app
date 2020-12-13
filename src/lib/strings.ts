export const sliceNames = {
  customers: "customers",
};

export const actionNames = {
  updateCustomer: `${sliceNames.customers}/update`,
  fetchCustomers: `${sliceNames.customers}/fetch`,
  createCustomers: `${sliceNames.customers}/create`,
  removeCustomer: `${sliceNames.customers}/remove`,
};
