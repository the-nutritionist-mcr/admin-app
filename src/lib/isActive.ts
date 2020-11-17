import Customer from "../domain/Customer";

const isActive = (customer: Customer): boolean => {
  const now = new Date(Date.now());

  if (customer.pauseEnd && now > customer.pauseEnd) {
    return true;
  }

  if (customer.pauseStart && now < customer.pauseStart) {
    return true;
  }

  if (
    customer.pauseStart &&
    now > customer.pauseStart &&
    customer.pauseEnd &&
    now < customer.pauseEnd
  ) {
    return false;
  }

  if (!customer.pauseStart && customer.pauseEnd && now < customer.pauseEnd) {
    return false;
  }

  if (customer.pauseStart && now > customer.pauseStart && !customer.pauseEnd) {
    return false;
  }

  return true;
};

export default isActive;
