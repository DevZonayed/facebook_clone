function otpGen() {
  let randomNumber = Math.floor(Math.random() * 9999) + 1111;
  return randomNumber;
}

export { otpGen };
