import { Customer } from "../models";

import calendarFormat from "../lib/calendarFormat";
import isActive from "./isActive";
import moment from "moment";

const getStatusString = (customer: Customer): string => {
  const now = new Date(Date.now());

  const activeString =
    customer.pauseStart && new Date(customer.pauseStart) > now
      ? ` until ${moment(new Date(customer.pauseStart)).calendar(
          null,
          calendarFormat
        )}`
      : "";

  const untilString = customer.pauseEnd
    ? ` until ${moment(new Date(customer.pauseEnd)).calendar(
        null,
        calendarFormat
      )}`
    : "";

  return isActive(customer) ? `Active${activeString}` : `Paused${untilString}`;
};

export default getStatusString;
