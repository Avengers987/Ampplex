// Generating unique postID

const date = new Date();

const postID =
  date.getMilliseconds() * date.getSeconds() +
  Math.floor(Math.random() * 1000 + 2) *
    Math.floor(Math.random() * 150000 + 100);

console.log(postID);
