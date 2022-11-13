const sendMessage = require("../../lib/sendMessage");
const FetchCrawler = require("@viclafouch/fetch-crawler");

getContent = async (driver, roomId, userData, searchTerm) => {
  const contentSourceUrl = `${process.env.CONTENT_SOURCE_URL}/search?q=${searchTerm}`;
  await FetchCrawler.launch({
    url: contentSourceUrl,
    evaluatePage: ($) => collectContent($),
    onSuccess: ({ result, url }) =>
      doSomethingWith(result, url, contentSourceUrl, driver, roomId, userData),
    onError: ({ error, url }) =>
      console.log("Whouaa something wrong happened :("),
    maxRequest: 5,
    maxDepth: 4,
    parallel: 6,
  });
};

const collectContent = ($) => {
  const content = [];
  $(".mntl-card-list-items").each(function (i, elem) {
    content.push({
      imageLink: $(this).find($("img")).attr("data-src"),
      postLink: $(this).attr("href"),
      title: $(this).find($(".card__title")).text(),
    });
  });
  return content;
};
doSomethingWith = async (
  content,
  url,
  contentSourceUrl,
  driver,
  roomId,
  userData
) => {
  if (url === contentSourceUrl) {
    console.log(content.length, "COntent Lendth");
    if (content.length > 0) {
      await sendMessage(
        driver,
        {
          attachments: [
            {
              text: "## Here are some articles based on your search 🔎📰",
              color: "green",
            },
            {
              image_url: content[0].imageLink,
              text: `### [${content[0].title}](${content[0].postLink})`,
              color: "#5DA3FA",
            },
            {
              image_url: content[1].imageLink,
              text: `### [${content[1].title}](${content[1].postLink})`,
              color: "#5DA3FA",
            },
            {
              image_url: content[2].imageLink,
              text: `### [${content[2].title}](${content[2].postLink})`,
              color: "#5DA3FA",
            },
          ],
        },
        roomId,
        true,
        userData
      );
    } else {
      await sendMessage(
        driver,
        {
          attachments: [
            {
              text: "## No articles found based on your search , Please try again with different keywords ",
              color: "red",
            },
          ],
        },
        roomId,
        true,
        userData
      );
    }
  }
};

(async () => {
  await FetchCrawler.launch({
    url: "https://www.health.com/search?q=meditation",
    evaluatePage: ($) => collectContent($),
    onSuccess: ({ result, url }) => doSomethingWith(result, url),
    onError: ({ error, url }) =>
      console.log("Whouaa something wrong happened :("),
    maxRequest: 20,
    maxDepth: 4,
    parallel: 6,
  });
})();

module.exports = getContent;
