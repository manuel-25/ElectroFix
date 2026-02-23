import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './whatsapp-session'
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

export default client;