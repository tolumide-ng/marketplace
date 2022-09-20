## Marketplace
This application is available live on [Heroku](https://tolu-market.herokuapp.com/)



## Conscious Decisions
1. Normally the `.env` of an application should never be public, and should be added to the `.gitignore` file of the project, but for the sake of running this application with ease by anyone (using either `docker compose` or `npm run dev`), I have made the `.env` file public.
2. This application does not make use of any form of state management as it doesn't currently need one owing to scope of the requirements. If we had to create an extra page to view the specific product, then `state management` would be needed.
3. This project uses `css modules` where necessary for `css modularisation`


## Steps to Run this project locally

1. Clone the project
2. Cd into the project

### Using Docker compose

3. If you have docker compose on your machine, run
    ```
    docker compose up
    ```
4. Open your web browser and visit:

    ```
    localhost:8000
    ```

### Using npm

    Pre-requisites

    a. Make sure you have atleast node@16.X installed
    b. Make sure you have npm on your machine
    c. You should have node-sass on your local machine

3. Run `npm install` to install the dependencies
4. Run `npm run dev` to start the application locally
5. Open your web browser and visit:

```
localhost:8000
```
6. To run the tests `npm run test`
