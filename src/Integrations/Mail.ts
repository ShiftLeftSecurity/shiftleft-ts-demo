import FormData from 'form-data';
import fs from 'fs';
import axios, { AxiosInstance } from 'axios';
class Mail {
  axiosClient: AxiosInstance;
  constructor(
    host = 'https://api.mailgun.net',
    domain,
    username = 'api',
    apiKey
  ) {
    this.axiosClient = axios.create({
      baseURL: `${host}/v3/${domain}`,
      timeout: 120000,
      auth: {
        username: username,
        password: apiKey
      }
    });
    console.log(
      `Connecting to mail host: ${host}:${domain} with login ${username}/${apiKey}`
    );
  }

  sendMail(fromAddress, toAddress, subject, msg) {
    const formData = new FormData();
    formData.append('msg', msg);
    try {
      formData.append('package', fs.readFileSync('./package.json'));
    } catch (ex) {
      console.error(ex);
    }
    this.axiosClient.post('/message.mime', {
      from: fromAddress,
      to: toAddress,
      subject,
      html: formData,
      'o:testmode': true
    });
  }
}

export = new Mail(
  process.env.MAIL_GUN_HOST,
  process.env.MAIL_GUN_DOMAIN,
  process.env.MAIL_GUN_USERNAME,
  process.env.MAIL_GUN_API_KEY
);
