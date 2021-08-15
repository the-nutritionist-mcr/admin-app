import { Heading, } from "grommet";
import React from "react";
import notes from "../../CHANGELOG.md"
import ReactMarkdown from "react-markdown";

interface Card {
  idShort: number,
  url: string
}

const replaceNumberWithTrelloUrl = async () => {
  const result = await fetch("https://api.trello.com/1/boards/OfdLJmww/cards")
  const cards = await result.json()

  return (cardNumber: string) => {
    const number = cardNumber.split('-')[1].trim()
    const card = cards.find((foundCard: Card) => foundCard.idShort === Number.parseInt(number));
    if(!card) {
      return cardNumber
    }
    return `[TRELLO-${number}](${card.url})`
  }
}

const transformNotes = (inputNotes: string): string => {
  return inputNotes
    .replace(/\((?<date>\d{4}-\d{2}-\d{2})\)/gmu, " - $<date>")
    .replace(/\d{4}-\d{2}-\d{2}/gmu, (match) => new Date(match).toDateString())
    .replace(/\(\S+?\)$/gmu, "")
    .replace(/^\* [a-z]/gmu, (match) => `* ${match.split(' ')[1].toUpperCase()}`)
}

const Home: React.FC = () => {
  const [theNotes, setTheNotes] = React.useState<string>(notes)

  React.useEffect(() => {
    (async () => {
    const ticketLoader = await replaceNumberWithTrelloUrl();
    const newNotes = theNotes.replace(/TRELLO-\d+/gu, ticketLoader)
    setTheNotes(newNotes)
    })()
  }, [])
  return (
    <React.Fragment>
      <Heading level={2}>
        Releases
      </Heading>
      {/* eslint-disable react/display-name */}
      <ReactMarkdown components={{
        h2: ({...props}) => <Heading margin="small" {...props} level={3} />,
        h3: ({...props}) => <Heading margin="small" {...props} level={4} />
      }}>{transformNotes(theNotes)}</ReactMarkdown>
      {/* eslint-enable react/display-name */}
    </React.Fragment>
  );
};

export default Home;
