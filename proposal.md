# CS 35L Project Proposal

## Team Members
- Karl Goeltner (205312849) - kgoeltner@g.ucla.edu
- Timothy Lee (105290386) - tim06012001@g.ucla.edu
- Eric Zhang (605502239) - ericzhang11@g.ucla.edu
- Kelly Yang (205307843) - kyang33@g.ucla.edu
- Rudy Orre (305788790) - rudyorre@g.ucla.edu 

## Overall Project Idea

A restaurant matching web application that helps users decide which restaurant to eat at. It allows the user to input their cuisine, location, price, etc. preferences as a saved filter profile. From this filter profile, users can either approve or disapprove each restaurant one at a time and also see more in depth information about it. The user can also make notes about their order for restaurants they’ve approved of.

### Features
- Display Dynamic Data to the User
- User opens the app and creates an account (username, password).
- The user will input restaurant preference data based on location, price, distance, cuisine, open times into our application.
- After the user hits submit, then the backend uses the user’s preferences to create a list of proposed restaurants via the Yelp Fusion API.
- Like tinder-style, the application will display one restaurant at a time; the user can click right (approve) or click left (reject) a restaurant.
- Each restaurant card displays the name, location, price, and other information; potentially also a link to a yelp website.

### Upload data from Client to Back-end
Each time the user wants to create a new search, they will input their preferences which will be saved as a filter profile. Basically, for that session, their filters will be saved under a unique profile.
The user can save the filter profile as a unique name and it will be stored in the server’s database.

### Meaningfully search through server-side data
The user can search through the following lists by name:
1) Created filter profiles
2) Approved restaurants
3) Disapproved restaurants
They can select one profile to be used for a restaurant matching session.
Perhaps we can have a list of 5 predetermined filters such that they can start off with some ideas and their database isn’t empty, i.e.
Japanese Eats in Westwood w/n 5 Miles
Mexican Eats in San Diego $$
Thai Eats in Davis Lunch/Dinner

### Unique Feature #1: Account Registration/Login
Let user login to their account via a username/password to access their information:
First, Last Name
Email address
Collection of profile filters
List of approved restaurants
List of disapproved restaurants

### Unique Feature #2: Like/Dislike
The user can like or dislike a restaurant by swiping or clicking right or left on a restaurant card.
This data is saved and persisted in the backend to prevent disliked restaurants from reappearing.
We can allow the user to select whether they want to allow for previously liked restaurants to reappear in match sessions.

### Unique Feature #3: Note to Self
For the list of favorite restaurants, add an order field where the user can input notes about their order (200 max char).
Ex. Medium Fries, Classic Chicken Sandwich, hold the mayo; Ranch, Thousand Island Dressing, Large Diet Coke, Caesar Salad
CS 35L Project Schedule/Milestones

### Team Members
Karl Goeltner (205312849) - kgoeltner@g.ucla.edu
Timothy Lee (105290386) - tim06012001@g.ucla.edu
Eric Zhang (605502239) - ericzhang11@g.ucla.edu
Kelly Yang (205307843) - kyang33@g.ucla.edu
Rudy Orre (305788790) - rudyorre@g.ucla.edu 

## Schedule/Milestones

### Week 4
- Create the Github repository
- Work with the Yelp Fusion API and determining which query params we need
- How to get a list of restaurants
- Storage/Database Setup
### Week 5
- Look into setting up the web app (getting familiar with the code)
- Create a mock-up based on other websites to determine navigation workflow
### Week 6
- Basic Web App Setup
- Search bar for profiles, approved list, disapproved list
- Database access
- Preferences page
- User profile page
- Navigation bar
- Approved restaurants page
- Disapproved restaurants page
- Filter profiles page
- Approve/Disapprove single restaurant page
### Week 7
- Basic Web App Setup (Finalizing the skeleton)
- Continue implementing features
- Implement the login access (username & password)
- Connect database to web app and test queries
### Week 8
- Wrap up implementing features and putting the pages together with navigation
- Ensure basic user functionality for all core features are implemented
- Finalize CSS styles to beautify the app
### Week 9
- Test and implement final features
- Prepare for presentation, slides, visuals
### Week 10
- Project Due -- finalize and prepare project for submission

## Roles
- Tim -- Backend Storage Solution
- Rudy -- Backend Yelp API 
-Kelly -- Frontend React/Design 
- Eric -- Frontend React
- Karl -- Backend Yelp API 
- Weekly meeting on Saturday 1:30-2:30pm



