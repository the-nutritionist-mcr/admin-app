import isActive from "../../../lib/isActive";
import useCustomers from "../../../features/customers/useCustomers";

const useHome = (): { activePlans: number } => {
  const { customers } = useCustomers();
  const activePlans = customers.filter(isActive).length;
  return { activePlans };
};

export default useHome;
