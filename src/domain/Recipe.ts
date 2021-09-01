import Exclusion from "./Exclusion";

export default interface Recipe {
  id: string;
  name: string;
  shortName: string;
  hotOrCold: string;
  description?: string | null;
  potentialExclusions: ReadonlyArray<Exclusion>;
  createdAt?: string;
  updatedAt?: string;
}
