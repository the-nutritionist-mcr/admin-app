import Plan from "./Plan";

export default interface Customer {
  name: string;
  email: string;
  daysPerWeek: number;
  mealsPerDay: number;
  plan: Plan;
  allergicTo: string[];
}
