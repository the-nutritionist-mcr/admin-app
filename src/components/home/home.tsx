import { Heading, } from "grommet";
import React from "react";
import notes from "../../CHANGELOG.md"
import ReactMarkdown from "react-markdown";

const transformNotes = (inputNotes: string): string => {
  return inputNotes.replace(/\((?<date>\d{4}-\d{2}-\d{2})\)/gu, " - $<date>")
  .replace(/\d{4}-\d{2}-\d{2}/gu, (match) => new Date(match).toDateString())
}

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Heading level={2}>
        Releases
      </Heading>
      {/* eslint-disable react/display-name */}
      <ReactMarkdown components={{
        h2: ({...props}) => <Heading margin="small" {...props} level={3} />,
        h3: ({...props}) => <Heading margin="small" {...props} level={4} />
        
      }}>{transformNotes(notes)}</ReactMarkdown>
      {/* eslint-enable react/display-name */}
    </React.Fragment>
  );
};

export default Home;
