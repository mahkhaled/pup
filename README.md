# BADR Interns Day 2018
## Intro
This is the BADRians way to say Hello !. Welcome to our geeky little nest.

## Pre-requisites 
#### Skills
We assume that you possess the following skills (Intermediate level)
- HTML/CSS/JS 
- Git 

## Preparation hint
We will be having Meteor & React, as our technology stack for this challenge. And we would advice you to familiarize yourself with the stack before coming to the challenge. Since the time would be somewhat tight if you started from scratch. 

We recommend the following : 
[Meteor/React getting started tutorial](https://www.meteor.com/tutorials/react/creating-an-app)

You might need to install Meteor first : [Install Meteor](https://www.meteor.com/install)


## About the challenge
We have a very simple app, to enable Engineers to request snacks and beverages from the company's kitchen team. The pain is that there are 4 appartments containing 4 kitchens. Some of the kitchens are having different types of beverages than the rest. And some of the service providers (Office boys), do unique things (Like salad preparation), while others are just specialized in bringing ready made or easy to prepare beverages. 

Our Sample App here, is a modified version of "Pup". A boilerplate that is intended to be a production ready starter kit for products built using Meteor & React : [Read the Documentation](http://cleverbeagle.com/pup)

You'll be required to complete a specific set of steps toward the goal of this challenge. But if you got yourself familiar with the above boilerplate's code before the challenge starts, you would have put yourself ahead of the pack, before even the challenge starts.

## Getting Started 
- First install the dependencies
```Bash
git clone https://github.com/mostafaelganainy/pup.git mySnackTime
cd mySnackTime && meteor npm install
meteor npm start
```

> Note : If you receive any errors in your terminal when you start up Pup related to `meteor npm install`, make sure to follow the suggested commands to ensure dependencies are properly installed.

- The system is pre-loaded with a couple of office-boys. `officeboy1@gmail.com` & `officeboy2@gmail.com`. `Password : 123456`, for both of them
> Note : You can use a any email for the officeboy, we will assign him a role in a moment.

- Type in the command line : `meteor mongo` to open a mongo session

- Now you're ready to signup with your email, and starting having your delicious snaks

- AND, you're ready to start BADR Intern's Day 2018 challenges. Get ready to have some fun !

## Challenges to complete

1. Checkbox to hide old things.
 - In the orders list view of the user, show a check box, that when clicked the old orders would disappear from the view
... Bonus : Store this preference in the user profile (See this commit for example of how to store a configuration in the user profile : https://github.com/mostafaelganainy/pup/commit/42cc58b98aee00b3154ad2815700dbc081a31b25)
2. When choosing a new order, select the user's default location
... You can refer to the following commit, to see how this was implemented in the profile of the user (Choosing his default location and showing it) : https://github.com/mostafaelganainy/pup/commit/42cc58b98aee00b3154ad2815700dbc081a31b25
3. Play some sound when the office boy receive a new order.
... Play the sound only when the office boy receives a new order that wasn't in his list before
4. Rating
... Enable the users to rate the office boys, and show this rating in the office boy profile page.
5. Status in progress (Office boy other than the assigned doesn’t see the in progress ones)
... Enable the office boy to assign an order to himself, by clicking on a button (Start in the orders list)
... This should result in the order's status changed to "assigned". And a new attribute in the order "Assignee", becomes equal to the userId of the current office boy
... Other office boys sbouldn't see orders except the ones assigned to them.
6. ETA
... The data comes with a preloaded dataset. That dates back to one month ago. It's required to analyse this data and tell the user before he submits an order, how much time approximately would it take to prepare his order (Based on the history)



---

Need help or questions ? contact us : hr@badrit.com
