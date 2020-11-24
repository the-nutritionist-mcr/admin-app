import Exclusion from "./Exclusion";
import Plan from "./Plan";

export enum Snack {
  None = "None",
  Standard = "Standard",
  Large = "Large",
}

export default interface Customer {
  id: string;
  firstName: string;
  surname: string;
  salutation: string;
  address: string;
  telephone: string;
  startDate?: string;
  paymentDayOfMonth?: number;
  notes?: string;
  email: string;
  pauseStart?: string;
  pauseEnd?: string;
  daysPerWeek: number;
  plan: Plan;
  legacyPrice?: number;
  snack: Snack;
  breakfast: boolean;
  exclusions: Exclusion[];
}
