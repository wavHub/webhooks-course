require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
  //Todo: Change the content variable to contain the repository name and
  // the github user name... and emoji flair of your choice!
  const repoName = req.body.repository.name;
  const userName = req.body.sender.login;
  const avatarUrl = req.body.sender.avatar_url;
  const action = req.body.action;
  
  let content;
  if (action === "created") {
    content = `Look who just ⭐️ ${repoName}! \nThanks ${userName}:rocket:!`;
  } else if (action === "deleted") {
    content = `Oh no! ${userName} unstarred ${repoName} 😢`;
  } else {
    content = `${userName} performed action: ${action} on ${repoName}`;
  }
    
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => {
      console.error(`Error sending to Discord: ${err}`);
      res.status(500).send({ error: "Failed to send to Discord" });
    });
});

app.use((error, req, res, next) => {
  res.status(500).send({error: error.message});
  console.error(error.stack);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
