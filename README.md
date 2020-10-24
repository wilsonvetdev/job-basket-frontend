# Job-Basket
The single-page app is inteded to allow a user to keep track of job postings they are interested in. Sort the jobs by status(applied, not applied, interviewed, offered, hired), and also add reminders for the day.

# General Info
Job-Basket is a Flatiron School Web Developement Module 4 project to demonstrate working knowledge of drawing an ERD(entity relational database), spinning up a Rails API with all the appropriate configurations(associations, routes, actions), and heavy focus on React as frontend for interactions between user and browser.

# Tech Stack
This web app employs the following technologies(not inclusive):

* Ruby [2.6.1]
* Rails [6.0.3.2]
* React(Components and Routes)
* Semantic UI React for styling
* PostgresQL - Database
* Bcrypt and JWT for authentication and authorization
* rack-cors - provides support for Cross-Origin Resource Sharing for Rack compatible web applications(allows the front-end portion of this project to perform fetch requests)
* active_model_serializers - allows customization and rendering of data in JSON format as responses to requests
* heroku - deployment to cloud

# https://jobbasket-app.herokuapp.com/ - live - visit the live app without setting up on your local machine

# Set-Up
1. clone this repo to your local environment -- git clone < git repository >
2. cd(change directory) into the repo
3. $run 'npm install' into your command line
3. $run 'npm start' into your command line
* **NOTE: This requires a few more steps. Please read below.**
4. visit https://github.com/wilsonvetdev/job-basket-api
5. clone the repo to your local environment -- git clone < git repository >
6. $ bundle install - installs gems and dependencies
7. $ rails db:migrate - creates the tables for the database
8. $ rails db:seed - seed the data necessary
9. rails s to start the server
10. With the server running as a result from Step 9, the application should be working in the browser now.

# What's Next?

Database schema will need to be updated with more tables to add more features. Frontend styling will also be greatly improved, and will be revisited in the future after the end of the Web Dev Fellowship at Flatiron. I will be taking in recommendations and tracking the features in the Nice-To-Have section below.

# Nice to have features(not final):

* Sort jobs by dates added
* Allowing a user to delete their account information
* Make weather API dynamic according to users' geolocation

# Known Issues so far:
* Weather API on top of app not dynamic to users' geolocation

![home_page_of_app](https://github.com/wilsonvetdev/job-basket-frontend/blob/main/Screen%20Shot%202020-10-24%20at%207.43.32%20PM.png)

