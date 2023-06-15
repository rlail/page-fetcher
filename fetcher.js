const http = require('http');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

http.get(url, (response) => {
  let body = '';

  response.on('data', (chunk) => {
    body += chunk;
  });

  response.on('end', () => {
    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.error('Error saving file:', error);
        return;
      }

      const fileSize = body.length;
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
}).on('error', (error) => {
  console.error('Error:', error.message);
});
