import Exclusion from "./Exclusion";

export default interface Recipe {
  id: string;
  name: string;
  description?: string;
  potentialExclusions: Exclusion[];
  createdAt?: string;
  updatedAt?: string;
}
