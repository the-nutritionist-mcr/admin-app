import { Customer } from "../models";

const isActive = (customer: Customer): boolean => {
  const now = new Date(Date.now());

  if (customer.pauseEnd && now > new Date(customer.pauseEnd)) {
    return true;
  }

  if (customer.pauseStart && now < new Date(customer.pauseStart)) {
    return true;
  }

  if (
    customer.pauseStart &&
    now > new Date(customer.pauseStart) &&
    customer.pauseEnd &&
    now < new Date(customer.pauseEnd)
  ) {
    return false;
  }

  if (
    !customer.pauseStart &&
    customer.pauseEnd &&
    now < new Date(customer.pauseEnd)
  ) {
    return false;
  }

  if (
    customer.pauseStart &&
    now > new Date(customer.pauseStart) &&
    !customer.pauseEnd
  ) {
    return false;
  }

  return true;
};

export default isActive;
