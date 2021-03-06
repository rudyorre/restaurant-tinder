<p align="center">
  <img src="images/scramble.png" width=50% height=50%/>
</p>

# Scramble!
A restaurant-matching web application that helps users find restaurants. Scramble! allows users to input their preferred cuisine, location, price, and other preferences, which will be saved as a "filter profile." From this "filter profile," users can either approve or disapprove each restaurant (one at a time) and see more in depth information about each restaurant. Users can also make notes about orders for their approved, or liked, restaurants.

## Members
- Kelly Yang, [Dioscuri](https://github.com/Dioscuri)
- Eric Zhang, [ezhang6811](https://github.com/ezhang6811)
- Tim Lee, [ItsTim2001](https://github.com/ItsTim2001)
- Karl Goeltner, [kgoeltner](https://github.com/kgoeltner)
- Rudy Orre, [rudyorre](https://github.com/rudyorre)

## Links
- [Project Tasks](https://github.com/rudyorre/restaurant-tinder/projects/1?add_cards_query=is%3Aopen)
- [Project Proposal Google Doc](https://docs.google.com/document/d/11MiO7qC6HRgcwL0tFzGR1OGJ3Lp-lQLyfBPIhYGOYIQ/edit)
- [Project Proposal Markdown](https://github.com/rudyorre/restaurant-tinder/blob/main/proposal.md)
- [Yelp Fusion API Documentation](https://www.yelp.com/developers/documentation/v3)
  - [Github Repository](https://www.yelp.com/developers/documentation/v3)
  - [Unofficial Documentation for Node.js](https://github.com/tonybadguy/yelp-fusion)
  - [Sample for Node.js](https://github.com/Yelp/yelp-fusion/tree/master/fusion/node)
- [Facebook Messenger](https://www.facebook.com/messages/)
- [Project Spec Sheet and Grading](https://web.cs.ucla.edu/classes/fall21/cs35L/project.html)
- [***Beautiful Eggert Chrome Extension***](https://chrome.google.com/webstore/detail/beautiful-eggert/gkhkfkioobdgdboaejfjgbefmedmeijh)

## Getting Started
After cloning the repository, you can run the current build locally by running:

### Frontend Setup
```bash
cd restaurant-tinder-app/src
npm install
npm install react-router-dom
npm install --save styled components
npm install react-icons --save
npm install react-tinder-card --save
npm install react-rating-stars-component --save
npm install @mui/material @emotion/react @emotion/styled
npm start
```
The source files will be in [`restaurant-tinder-app/src`](https://github.com/rudyorre/restaurant-tinder/tree/main/restaurant-tinder-app/src).  

### Backend Setup
```bash
cd restaurant-tinder-back
```
Create a new file in this directory called ".env", which is used for storing environment variables.
Then, go to the [`Yelp Fusion API`](https://www.yelp.com/developers/documentation/v3/get_started) and create an account.
Click on "Create App" and fill out the parameters. Click "Create New App" at the bottom.
This will generate a unique Client ID and API Key that will be used to fetch the restaurant data for your local app.
Put the following two lines in .env and paste the two generated values:
```.env
REACT_APP_CLIENT_ID=<paste client id here>
REACT_APP_API_KEY=<paste api key here>
```
Run the following bash commands to complete the backend setup.
```bash
npm install
node server.js
```
The source files will be in [`restaurant-tinder-backend`](https://github.com/rudyorre/restaurant-tinder/tree/main/restaurant-tinder-backend).  

**Make sure the frontend and backend servers are running on different ports, i.e. port 3000 (frontend), port 3001 (backend)**
