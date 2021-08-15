import fetch from "node-fetch";
import Git from "nodegit";

interface Commit {
  message: string;
  hash: string;
}

interface Tickets {
  [ticketNumber: string]: 
    { commits: Commit[]; cardId: string }
}

const searchGitLog = async (string: string): Promise<Commit[]> => {
  const repo = await Git.Repository.open(".git");
  const head = await repo.getHeadCommit();
  const commits: Commit[] = [];
  const historyWalker = head.history();
  historyWalker.on("commit", (commit: Git.Commit) => {
    const message = commit.message().replace(/\n$/gu, ``);
    if (message.includes(string)) {
      commits.push({ message, hash: commit.sha() });
    }
  });

  return await new Promise<Commit[]>((accept) => {
    historyWalker.on("end", () => {
      accept(commits);
    });
    historyWalker.start();
  });
};

const trelloRequest = async (method: string, path: string) => {
  const response = await fetch(`https://api.trello.com/1${path}`, {
    method,
    headers: {
    'content-type': 'application/json',
    'authorization': `OAuth oauth_consumer_key="${process.env.TRELLO_KEY}", oauth_token="${process.env.TRELLO_TOKEN}"`
  }})

  return await response.json()
}

const trello = {
  get: trelloRequest.bind(null, 'GET')
}

  // return await fetch("https://api.trello.com/1/boards/OfdLJmww/cards")


;(async () => {

  const boardData = await trello.get('/boards/OfdLJmww/cards')

  const getCardIdFromBoardData = (ticket: string) => boardData.find((card: { idShort: number}) => card.idShort == Number.parseInt((ticket.split('-')[1]), 10))?.id ?? ""

  const commits = await searchGitLog("TRELLO-");

  const getTicketFromMessage = (message: string) => message.match(/TRELLO-\d+/gu)?.[0]

  const tickets = commits.map(commit => ({ ...commit, ticket: getTicketFromMessage(commit.message)})).reduce<Tickets>(
    (tickets, commit) => ({
      [commit.ticket ?? "(none)"]: commit.ticket && Object.hasOwnProperty.call(tickets, commit.ticket)
        ? { ...tickets[commit.ticket], commits: [...(tickets[commit.ticket].commits), commit] }
        : { commits: [commit], cardId: getCardIdFromBoardData(commit.ticket ?? "")}
    }),
    {}
  );


  console.log(tickets)

  // await Promise.all(Object.entries(tickets).map(async ([ticket, commits]) => {
  //   const card = await trello.get()
  // }))
})();
