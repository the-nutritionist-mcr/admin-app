import Customer from "../domain/Customer";

import calendarFormat from "../lib/calendarFormat";
import isActive from "./isActive";
import moment from "moment";

const getStatusString = (customer: Customer): string => {
  const untilString = customer.pauseEnd
    ? ` until ${moment(new Date(customer.pauseEnd)).calendar(
        null,
        calendarFormat
      )}`
    : "";

  return isActive(customer) ? "Active" : `Paused${untilString}`;
};

export default getStatusString;
