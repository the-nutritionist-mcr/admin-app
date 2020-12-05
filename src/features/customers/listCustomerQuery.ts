const listCustomersQuery = `
query MyQuery {
  listCustomers {
    address
    breakfast
    email
    daysPerWeek
    firstName
    legacyPrice
    id
    notes
    pauseEnd
    pauseStart
    paymentDayOfMonth
    salutation
    plan {
      category
      costPerMeal
      mealsPerDay
      name
    }
    snack
    startDate
    surname
    telephone
  }
}
`;

export default listCustomersQuery;
