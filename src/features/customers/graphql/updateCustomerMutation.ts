const updateCustomerMutation = `
mutation UpdateCustomerMutation {
  createCustomer($input: UpdateCustomerInput!) {
    exclusions {
      allergen
      id
      name
    }
  }
}
`;

export default updateCustomerMutation;
