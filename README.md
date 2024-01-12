# Norma technical assessment

## The project
### Description

This is a technical assessment for Norma.
It is a simple web application that allows users to calculate their total revenue based on their monthly salary. It also displays the revenue after taxes.
You don't need to bother about the right tax rate etc, this is just a fictional example.
There is a simple form where the user can enter their monthly salary and the total revenue is displayed on the page.
The user add multiple rows, each row contains a year and a monthly salary. The total revenue is calculated based on the sum of all the monthly salaries annualized. 
There's no backend, the calculation is done on the frontend.

### Installation

`npm install`

### Running the app

`npm run dev`

## Your task

We want to add a new feature : to allow user to also add their revenue as a freelancer. A freelancer, unlike a regular employee, earns a hourly rate. The user will be able to add multiple rows, each row corresponds to a year and can be either a monthly salary or a freelancer revenue. The total revenue will be calculated based on the sum of all the rows.
The fields that should be present for a freelancer row are :
- hourly rate : the amount of money the freelancer earns per hour
- year : Same as for the monthly salary.
- number of hours worked per day : the number of hours the freelancer works per day. Make sure it corresponds to a possible value for hours in a day.
- number of days worked per year : the number of days the freelancer works per year. Make sure it corresponds to a possible value for days in a year.

And to calculate the totals, you will need to calculate (but not display) the revenues per year for each row. The calculation should be the following :
- Yearly revenue of a freelancer : hourly rate * number of hours worked per day * number of days worked per year
- Yearly revenue of a freelancer after taxes = Total revenue of a freelancer * Freelancer tax rate (it is provided in the constants in the code)
- 
The calculation should be fairly similar to what we have for the monthly salary.

Also, you will have to update the calculation of the total revenue to take into account the new rows.
The calculation are the following :
- Total revenue = Sum of all the yearly revenues rows of both the monthly salaries and the freelancers
- Total revenue after taxes = Sum of all the yearly revenues after taxes rows of both the monthly salaries and the freelancers

The calculation should be fairly similar to what we have for the monthly salary.

You're free to add any fields you think are necessary to make the calculation work. You can also change the existing code if you think it's necessary.
You can also add any tests if you need them (it's not mandatory at all)

### Example of result
<img width="1076" alt="Screenshot 2024-01-11 at 22 32 10" src="https://github.com/jeremynac/norma-technical-assessment/assets/63456504/df754b10-a583-4f8a-84a8-65ec0f2e654c">

### How much time do you have ?
We expect you to finish the test within a day or 2 (should be much shorter in practice but this is just to give you some margin). If you don't have time to finish it, don't worry, just tell us and we can give you more time.

### What we will evaluate
- The code quality (meaningful names for variables, functions, etc)
- How clean and structured your code is
- How you integrate withing the existing code
- How you precise you are with the calculations and fields validations (this is a big part of what we do at Norma)
- How reusable the code is : it should be easy to add more fields or different types of revenues in the future
- How well you use Typescript

### What we won't evaluate 
- The design of the app is not important at all, don't bother trying to make it look good
- You don't need to add any backend, the calculation should be done on the frontend

### How to submit your work
- Fork this repository
- When you're done, send us the link to your fork
- Add @jeremynac to the fork so that we can access it or make it public

## Improvements
If you see any improvements or things that should have been done differently in this small project, feel free to tell us. We're a small team and everyone can criticize or improve the work of others.
And if you see something that's does not seem right in the calculations, don't hesitate to tell us as well, a big part of our work at Norma is to make sure the calculations are correct.

## Questions ?
If you have any questions before, during or after the test, don't hesitate to ask us.
