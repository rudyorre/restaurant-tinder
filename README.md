# restaurant-tinder
A restaurant matching web application that helps users decide which restaurant to eat at. It allows the user to input their cuisine, location, price, etc. preferences as a saved filter profile. From this filter profile, users can either approve or disapprove each restaurant one at a time and also see more in depth information about it. The user can also make notes about their orders for restaurants they’ve approved of.

## Members
- Dioscuri
- ezhang6811
- ItsTim2001
- kgoeltner
- rudyorre

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
npm start
```
The source files will be in [`restaurant-tinder-app/src`](https://github.com/rudyorre/restaurant-tinder/tree/main/restaurant-tinder-app/src).  

### Backend Setup 
```bash
npm install
node server.js
```
The source files will be in [`restaurant-tinder-backend`](https://github.com/rudyorre/restaurant-tinder/tree/main/restaurant-tinder-backend).  

**Make sure the frontend and backend servers are running on different ports, i.e. port 3000 (frontend), port 3001 (backend)**
