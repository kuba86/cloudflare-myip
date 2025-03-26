# MyIP
A Cloudflare Worker that displays your IP address information and optionally sends notifications via [ntfy](https://github.com/binwiederhier/ntfy).
## About
MyIP is a simple web application that shows visitors their IP address and related information. It retrieves IP details using the ipinfo.io API and presents them in a clean Bootstrap interface. Additionally, it can send notifications with visitor information to a specified ntfy channel.
## Features
- Displays visitor's IP address and connection information
- Retrieves detailed IP data including:
    - Organization
    - Hostname
    - Country
    - Region
    - City
    - Postal code
    - Timezone

- Clean, responsive UI using Bootstrap
- Optional notification system via ntfy.sh
- Deployed as a Cloudflare Worker

## Prerequisites
- Node.js
- npm
- Cloudflare account
- ipinfo.io API token
- ntfy.sh account (optional for notifications)

## Setup
### Install Dependencies
1. Install Node.js:
``` shell
   sudo dnf install nodejs
```
1. Install project dependencies:
``` shell
   npm install
```
### Configuration
The application requires environment variables to be set in your Cloudflare Worker:
- `ipinfo_token` - Your ipinfo.io API token
- `ntfy_token` - Your ntfy.sh authentication token (if using notifications)

## Development
### Run Locally
To run the application locally with remote bindings:
``` shell
wrangler dev
```
### Deployment
To deploy the application to Cloudflare:
``` shell
wrangler deploy
```
## Project Structure
- `src/index.js` - Main application code
- `wrangler.toml` - Cloudflare Worker configuration
- `package.json` - Project dependencies and scripts

## Scripts
- `npm run start` - Start development server
- `npm run deploy` - Deploy to Cloudflare
- `npm run update` - Update dependencies

## Custom Domain
This application is configured to run on the custom domain `myip.kuba86.com` as defined in the wrangler.toml file. 
Make sure to change it.
## Version
Current version: 1.0.0
## License
GNU AGPLv3.
_This project uses the ipinfo.io API to retrieve IP information and ntfy.sh for notifications._
