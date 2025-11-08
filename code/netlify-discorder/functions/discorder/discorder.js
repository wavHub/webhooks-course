const axios = require("axios").default;
//This is an aync method and can us await. The discorder used axios make a request and a response
// pulling off the bodey with "req.body" and "then" pattern. 
// In Netlify we will use "try catch" pattern to handle errors.
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    console.log(event.body);
    const body = JSON.parse(event.body);
    console.log(body);
    const username = body.sender.login;
    const avatarUrl = body.sender.avatar_url;
    const repoName = body.repository.name;
    const action = body.action;

    let content;
    if (action === "created") {
      content = `Look who just ⭐️ ${repoName}!\nThanks ${username}! :rocket:!`;
    } else if (action === "deleted") {
      content = `Oh no! ${username} unstarred ${repoName} 😢`;
    } else {
      content = `${username} performed action: ${action} on ${repoName}`;
    }

    const res = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    });
    console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
