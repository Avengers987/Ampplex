const Capitalize_Str = (str) => {
  let new_str = "";

  str = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      new_str += str[i].toUpperCase();
    } else {
      new_str += str[i];
    }
  }

  return new_str;
};

const subject = "HELLO WORLD!";

console.log("HERE IS THE SUBJECT: ", Capitalize_Str(subject));
