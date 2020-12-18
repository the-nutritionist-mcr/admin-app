import Exclusion from "./Exclusion";

export enum HotOrCold {
  Hot,
  Cold,
  Both,
}

export default interface Recipe {
  id: string;
  name: string;
  shortName: string;
  hotOrCold: HotOrCold;
  description?: string;
  potentialExclusions: Exclusion[];
  createdAt?: string;
  updatedAt?: string;
}
