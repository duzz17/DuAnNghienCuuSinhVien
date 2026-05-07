const http = require('http');
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/comments/1',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
};
const req = http.request(options, res => {
  let data = '';
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('BODY', data);
  });
});
req.on('error', err => console.error('ERR', err));
req.end();
