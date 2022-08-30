import axios from "axios";

/**
 * This function will send sms to Phone number
 * @param {Phone Number} number
 * @param { Message body} message
 * @returns
 */
async function sendSms(number, message) {
  const result = await axios.post(
    `https://bulksmsbd.net/api/smsapi?api_key=e7utumasEy2PaHBhCfVh&type=text&number=${number}&senderid=${"8809601004401"}&message=${message}`
  );
  return result;
}

export default sendSms;
