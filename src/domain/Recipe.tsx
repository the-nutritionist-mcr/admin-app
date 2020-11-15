import Exclusion from "./Exclusion";

export default interface Recipe {
  id: number;
  name: string;
  description?: string;
  potentialExclusions: Exclusion[];
}
