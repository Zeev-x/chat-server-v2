const http = require('http');
const server = require('./app');
const config = require('./config/config.json');
const chatServer = require(`${__dirname}/routes/function/chat`);

const port = config.port;

const app = http.createServer(server);

chatServer(app);

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
