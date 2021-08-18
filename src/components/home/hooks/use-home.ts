import { not, pipe } from "ramda";
import isActive from "../../../lib/isActive";
import useCustomers from "../../../features/customers/useCustomers";

const isInactive = pipe(isActive, not);

const useHome = (): {
  activePlans: number;
  inActivePlans: number;
  totalPlans: number;
} => {
  const { customers } = useCustomers();
  const inActivePlans = customers.filter(isInactive).length;
  const activePlans = customers.filter(isActive).length;
  const totalPlans = customers.length;
  return { activePlans, inActivePlans, totalPlans };
};

export default useHome;
