import React from "react";
import { Heading, Paragraph, majorScale } from "evergreen-ui";

const Home = () => (
  <React.Fragment>
    <Heading is="h2" size={700} marginBottom={majorScale(2)}>
      Home Page
    </Heading>
    <Paragraph>
      Nothing to see here. Click on one of the links above...
    </Paragraph>
  </React.Fragment>
);

export default Home;
