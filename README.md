# Cryptolio

## Project Overview

The **Cryptolio (Cryptocurrency Portfolio) App** is a web-based single-page application (SPA) built with React, Node, and TypeScript. It allows users to manage and monitor their cryptocurrency tokens efficiently. Users can connect their wallets, add tokens to their watch list, view their current and historical balances, check token allowances, and perform token transfers.

The link to the deployed Docker instance is https://cryptolio.thesynthax.xyz

## Features

1. **Wallet Connection**:
   - Users can connect their wallet using MetaMask.
   
2. **Watch List**:
   - Users can add tokens to their watch list and view the current balance of each token.

3. **Historical Data**:
   - The app fetches and displays historical balances of each token.
   - A date picker allows users to select a date range for viewing historical data.
   - Data is visually represented using charts and graphs.

4. **Token Allowance**:
   - Users can check the allowance of tokens for different smart contracts.

5. **Token Transfer**:
   - Users can transfer tokens to another address by specifying the recipient address and amount.

6. **Profile**:
   - Users can save and edit their profile using their wallet address.

## Hosting and Deploying your own instance
### Docker
1) Type `docker pull thesynthax/cryptolio:1.0` in command line.
2) Now run `docker run -d -p 5000:5000 thesynthax/cryptolio:1.0` to run the server.
### OR
### Building from source
1) Clone this repository using `git clone https://github.com/thesynthax/cryptolio.git`
2) `cd dropifi/server` and `npm i`. Make sure you are using Node 21.
3) Do the same with `dropifi/client`. Here, run `npm run build`.
4) `cp -r build ../server/`.
5) Set your API Key in `client/src/static/api.json`
6) Go to `cryptolio/server` and run `npm run build`.
7) Now run `npm run start` to run the production server.

## Setting up the codebase

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v21 recommended)
- **npm**
- **MetaMask** extension for your browser

### Installation

1. **Clone the Repository:**
   
   ```bash
   git clone https://github.com/thesynthax/cryptolio.git
   cd cryptolio

3. **Enter the following in client/ and server/**

   ```bash
   npm i

5. **Set the API Key in**

   ```bash
   client/src/static/api.json

6. **Run the backend:**

   ```bash
   cd cryptolio/server
   npm run dev
  Backend is running on http://localhost:5000

7. **Run the frontend:**

   ```bash
   cd cryptolio/client
   npm start
  Frontend is running on http://localhost:3000




## Technologies Used
- React: For building the user interface.
- TypeScript: For type safety and better development experience.
- Ethers.js: For interacting with Ethereum blockchain.
- Etherscan API: For fetching token data.
- react-datepicker: For date picking functionality.
- recharts: For visual representation of data.
- FontAwesome and Tailwindcss: For icons and improved designing.
