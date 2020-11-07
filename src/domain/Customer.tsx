import Plan from "./Plan";

export default interface Customer {
  id: number;
  name: string;
  email: string;
  mealsPerWeek: number;
  plan: Plan;
  allergicTo: string[];
}
