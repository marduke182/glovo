# Glovo Senior Frontend Engineer Challenge

We’d like to offer you a challenge to get a better understanding of your capabilities as a senior frontend engineer.

We expect you to spend no more than a day on this task. To submit the results it’s enough to just share a GitHub link
to a public repository with your solution or send the compressed project. You are expected to work on this task alone,
without help or advice from others.

If you have any issues with the assignment or require clarifications, please feel free to reach out to us.

## Introduction
You'll find in this project a server that has two endpoints:

### `/categories`
Returns a list of categories that we support right now. Each category has a label, and two icons.

### `/stores?category={name}`
Returns a list of stores inside that category. Each store has:
  - name
  - description
  - tags: Array of tags
  - schedule: Array of days of the week (starting on Monday), with opening & closing times (local)


## Assignment
Your task is to create a simple application that will display to the user a list of categories (with icon). If the user enters in a category, he will be able to see all the stores from that category.

But beware, there are certain conditions:

- Open stores should display a message that says: "Open right now"
- Closed stores should display a message that says: "Next opening time: [day of the week] at [hour]"
- Closed stores should be displayed last
- If all the stores of a category are closed, the category itself should be closed
- You should be able to filter by tags


## Tools
There is no specific framework requirement. Feel free to use the tools that you are more comfortable with, but be sure to demonstrate that you know them.

Design decisions (UI/UX) are completely open and you can use CSS libraries.

## Server
Just clone this project and run `npm install && npm run serve` (or yarn). Server will be running on port 3000.

## Delivery
Create a zip file and upload it using the submission link present in the e-mail that had this project attached. Please make sure to include all your source files and your git folders with it.

## What we'll value
- Clean, succinct code that works without bugs
- Smart UI/UX decisions
