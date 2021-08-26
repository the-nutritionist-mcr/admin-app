import Exclusion from "./Exclusion";
import Plan from "./Plan";
import { CustomerPlan } from "../features/customers/types";

export enum Snack {
  None = "None",
  Standard = "Standard",
  Large = "Large",
}

export default interface Customer {
  id: string;
  firstName: string;
  surname: string;
  createdAt?: string;
  updatedAt?: string;
  salutation: string;
  address: string;
  telephone: string;
  startDate?: string;
  paymentDayOfMonth?: number;
  notes?: string;
  email: string;
  pauseStart: string | null;
  pauseEnd: string | null;
  daysPerWeek: number;
  plan: Plan;
  newPlan?: CustomerPlan;
  legacyPrice?: number;
  snack: string;
  breakfast: boolean;
  exclusions: Exclusion[];
}
