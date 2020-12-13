import { allCustomersSelector, fetchCustomers } from "./customersSlice";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../domain/Customer";
import React from "react";

interface UseCustomersReturnValue {
  customers: Customer[];
}

const useCustomers = (): UseCustomersReturnValue => {
  const dispatch = useDispatch();

  const customers = useSelector(allCustomersSelector);

  React.useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return {
    customers,
  };
};

export default useCustomers;
