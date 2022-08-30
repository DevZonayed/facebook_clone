function alphabet_count(str) {
  const str_arr = typeof str == "string" ? str.split("") : [""];
  let count = 0;
  str_arr.map((later) => {
    if (/^[a-zA-Z]$/i.test(later)) {
      count++;
    }
  });
  return count;
}

export default alphabet_count;
