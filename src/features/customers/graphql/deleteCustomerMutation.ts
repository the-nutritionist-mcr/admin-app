const deleteCustomerMutation = `
mutation DeleteCustomerMutation {
  deleteCustomer($input: DeleteCustomerInput!) {
    id
  }
}
`;

export default deleteCustomerMutation;
