import { Heading, Paragraph } from "grommet";
import React from "react";
import { useHome } from "../home/hooks";

const Reports: React.FC = () => {
  const { activePlans, inActivePlans, totalPlans } = useHome();
  return (
    <React.Fragment>
    <Heading level={2}>Reports</Heading>
      <Paragraph>
        <ul>
          <li>
            Total customers on file: <strong>{totalPlans}</strong>
          </li>
          <li>
            Active: <strong>{activePlans}</strong>
          </li>

          <li>
            Inactive: <strong>{inActivePlans}</strong>
          </li>
        </ul>
      </Paragraph>
    </React.Fragment>
  );
};

export default Reports;
