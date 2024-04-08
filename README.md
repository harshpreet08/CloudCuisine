# CloudCuisine

CloudCuisine is a serverless web application developed using various AWS services. It allows users to create, share, edit, and delete recipes, along with uploading images of the recipes. The project is developed using React and MaterialUI for the frontend, with various AWS services handling the backend functionalities.

## Tech Stack

- **Frontend:**
  - React
  - MaterialUI

- **AWS Services:**
  - EC2: Deployment of the web application
  - Lambda: Handling sharing functionality
  - S3: Storage for images
  - DynamoDB: Database for storing recipes
  - API Gateway: For calling Lambda functions
  - ELB (Elastic Load Balancer): Load balancing for EC2 instance
  - SES (Simple Email Service): Sending emails for recipe sharing
  - AppSync: Creating and calling GraphQL APIs interacting with DynamoDB
  - Cognito: User management

- **Packages Used:**
  - `@aws-amplify/ui-react`: Version 6.1.2
  - `@emotion/css`: Version 11.11.2
  - `@emotion/react`: Version 11.11.3
  - `@emotion/styled`: Version 11.11.0
  - `@fortawesome/free-solid-svg-icons`: Version 6.5.1
  - `@fortawesome/react-fontawesome`: Version 0.2.0
  - `@mui/icons-material`: Version 5.15.7
  - `@mui/material`: Version 5.15.7
  - `aws-amplify`: Version 6.0.13
  - `react`: Version 18.2.0
  - `react-dom`: Version 18.2.0
  - `react-redux`: Version 9.1.0
  - `react-router-dom`: Version 6.22.0

## Features

- **Recipe Management:**
  - Create, edit, and delete recipes.
  - Recipes include name, ingredients, instructions, and images.

- **Sharing:**
  - Share recipes via email.
  - Users can easily share their recipes with others.

- **User Authentication:**
  - Users have the option to register and establish their individual profiles, enabling subsequent login functionality. Authentication procedures are handled through Cognito.
  - Each user maintains a distinct set of recipes within their profile, affording them the ability to share these recipes as needed.

## Running the Project

1. **Clone Repository:**
   `git clone https://github.com/harshpreet08/CloudCuisine.git`
2. **Open Directory**
    `cd CloudCuisine`
3. **Install Dependencies**
    `npm install`
4. **Run Project**
    `npm run dev`
5. **Access CloudCuisine**
    `http://localhost:5173`

## Contributors
- [Harshpreet Singh](https://github.com/harshpreet08)
