import { allCustomersSelector, fetchCustomers } from "./customersSlice";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../domain/Customer";
import React from "react";
import { fetchExclusions } from "../exclusions/exclusionsSlice";

interface UseCustomersReturnValue {
  customers: Customer[];
}

const useCustomers = (): UseCustomersReturnValue => {
  const dispatch = useDispatch();

  const customers = useSelector(allCustomersSelector);

  React.useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
      dispatch(fetchExclusions());
    }
  }, [dispatch]);

  return {
    customers,
  };
};

export default useCustomers;
