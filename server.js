const https = require('https');
const app = require('./backend/app');
const fs = require('fs')

const config = require('platformsh-config').config();

const server = https.createServer(options, app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(config.port);

