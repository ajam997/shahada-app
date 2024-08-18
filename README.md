# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Shahada Teaching Application

## Overview

The Shahada Teaching Application is an interactive web app designed to help users learn and practice reciting the Shahada in both their native language and Latinized Arabic. The app combines speech recognition and synthesis technologies to provide a dynamic and educational experience.

## Features

- **Multi-Language Support**: Currently supports English and French.
- **Speech Recognition**: Uses the Web Speech API to transcribe and evaluate the user's spoken recitation.
- **Speech Synthesis**: Uses the Web Speech API to read aloud the text to assist users in learning the correct pronunciation.
- **Phased Learning Approach**: 
  - Users first practice reciting the Shahada in their native language.
  - After successfully completing this phase, they proceed to recite in Latinized Arabic.
- **Retry Mechanism**: Allows users to retry recitation if their spoken input is incorrect.
- **Transition Phase**: Moves users from their native language to Latinized Arabic upon successful completion.

## Technologies Used

- **React**: A JavaScript library for building user interfaces. We use React to manage the state of our application and render UI components.
- **Lottie**: A library for rendering animations. We use Lottie to provide engaging animations that enhance the user experience.
- **Web Speech API**: Provides speech recognition and synthesis capabilities.
  - **SpeechRecognition**: Captures and converts spoken words into text.
  - **SpeechSynthesis**: Reads aloud text to help users practice pronunciation.

## Project Structure

1. **App Component**: The main component that controls the flow of the application.
2. **Language Selection Component**: Allows users to select their preferred language for recitation.
3. **ShahadaTeaching Component**: Manages the learning phases and integrates speech recognition and synthesis.
   - **Phases**:
     - **Language Phase**: Users recite the Shahada in their native language.
     - **Transition Phase**: After completing the native language phase, users are prompted to proceed to Latinized Arabic.
     - **Arabic Phase**: Users recite the Shahada in Latinized Arabic.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/shahada-teaching-app.git
   cd shahada-teaching-app
