import express from 'express';
import dotenv from 'dotenv';
import ErrorHandler from './Handler/ErrorHandler.js';

const app = express();

const test = process.env.TEST;

if (!test) {
  const isOkay = dotenv.config({ path: './.env' });

  if (isOkay.error) {
    throw new ErrorHandler('Error loading .env file', 500);
  }
}

// Set up additional configurations and routes for your Express app...

app.on('error', (error) => {
  console.error('Express error:', error);
  throw new ErrorHandler(
    {
      msg: 'Server not set up properly',
      error: error,
    },
    500
  );
});


// Files checks 


export default app;
