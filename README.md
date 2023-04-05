## Redux E-commerce Shop

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The code repository for this project contains a full stack web application built using the MERN Stack. The application is designed to create an e-commerce website using React and Redux, with Stripe payments integration.

Users will enjoy an uninterrupted checkout process, even in the event of a lost internet connection. They will also have access to their order history outside of checkout. User authentication is a key feature of this application, with the ability for users to sign up and log in to their accounts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Deployed Site Link](#deployed-site-link)
- [Authors](#authors)
- [License](#license)

## Technologies Used

- This application is a MERN stack application which is a group of four technologies, that is:-
  - MongoDB
  - Express.js
  - ReactJS
  - Node.js
- The MERN stack has a three-layer architecture based on Model-View-Controller pattern and each interconnected layer performs a specific function in the application:-

  | Client (View)          | React JS                   | User inputs data and Data display                        |
  | ---------------------- | -------------------------- | -------------------------------------------------------- |
  | **Server(Controller)** | **Express.js and Node.js** | **Method called to store and retrieve data in database** |
  | **Database(Model)**    | **MongoDB**                | **Stores raw data and contains no logic**                |

- As this application has come already with mostly pre-installed npm packages and is fully functioning Google Books API search engine built with a RESTful API and to refactor it to be a Graph API built with Apollo Server, the following additional npm packages were installed:-

        - npm i apollo-server-express
        - npm i graphql
        - npm i @apollo/client
        - npm i @apollo/react-hooks

* Before deploying to Heroku, the application is run in develop mode and tested using by entering at command prompt:-

  - npm install (ensure all that dependencies are installed)
  - npm init
  - npm run develop ( cd to the correct directory)


## Deployment

To deploy this application from the associated GitHub repository, follow these steps:

1. Clone the repository to your local machine.

2. In the project directory, run the command npm start to launch the application in development mode.

3. Open your web browser and navigate to http://localhost:3000 to view the application. You can make changes to the code and the page will automatically reload.

4. Use npm test to launch the test runner in interactive watch mode to ensure the application is functioning correctly. Refer to the section about running tests for more information.

5. When you're ready to deploy the application, use the command npm run build to build the app for production to the build folder. React will be bundled in production mode, and the build will be optimized for best performance. The build is also minified, and the filenames include the hashes.

6. With the app built, your application is ready to be deployed. Refer to the section about deployment for more information.


## Application Demo Snippet

![reduxshop](https://user-images.githubusercontent.com/114820394/230220267-ddf25bbd-128b-4b45-9a3e-e829b6635945.gif)



## 🔗 Deployed Site Link
[![Click for Website](https://img.shields.io/badge/website-Click-yellow)](https://redux-storefront.herokuapp.com)


## Tech Stack


- JavaScript
- Express.js
- Stripe
- Redux
- ReactJS
- MongoDB
- Node.js 
- TailwindCSS
- ES6+ Syntax


**Server:** Visual Studio Code


## Authors

- [@liquidmonks](https://www.github.com/liquidmonks)


![Logo](https://i.imgur.com/RXZyAtU.png)


## License

[MIT](https://choosealicense.com/licenses/mit/)
