# Interview Scheduler
React scheduler that allows users to create, delete and edit appointmments. Users can enter the name of interviewee, and select from a list of available interviewers. Application includes built-in test features.

## Final Product 
Main Page
!["Screenshot of main page"](https://github.com/cphung1/scheduler/blob/master/public/images/main_page.png)

Create a new appointment
!["Screenshot of form to create an appointment"](https://github.com/cphung1/scheduler/blob/master/public/images/create_appt.png)

Deletion Confirmation
!["Screenshot of confirmation for deleting appointment"](https://github.com/cphung1/scheduler/blob/master/public/images/delete_appt.png)

Transition States
!["Screenshot of loading status for async requests"](https://github.com/cphung1/scheduler/blob/master/public/images/transition_saving.png)

Error Handling
!["Screenshot of error handling"](https://github.com/cphung1/scheduler/blob/master/public/images/error_msg.png)

Storybook Component Tests
!["Screenshot of Storybook Component Tests"](https://github.com/cphung1/scheduler/blob/master/public/images/storybook.png)

Jest Unit Tests
!["Screenshot of Jest Unit Tests"](https://github.com/cphung1/scheduler/blob/master/public/images/jest.png)

Cypress E2E Tests
!["Screenshot of Cypress E2E Tests"](https://github.com/cphung1/scheduler/blob/master/public/images/cypress.png)

## Dependencies 

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Getting Started

1. Install dependencies using the `npm install` command.
2. Get and install the [server](https://github.com/cphung1/scheduler-api). 
3. Run the server. 
4. Run this client by using the `npm start` command.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test 

On the server 
```sh
npm run test:server
```

On the client 
```sh
npm run cypress
```
