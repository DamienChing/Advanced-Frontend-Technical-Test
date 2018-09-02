
# Advanced-Frontend-Technical-Test
**Time taken to develop:** Approximately 2.5 days

## Table of Contents
* [Running the Application](#running-the-application)
* [Local Development](#local-development)
* [Local Build](#local-build)
* [Docker Build](#docker-build)
* [Component Structure](#component-structure)
* [Caching Method](#caching-method)

## Running the Application
1. Run application using [local dev](#local-development) or [local build](#local-build) or [docker](#docker-build) mode.
2. Go to http://localhost:3000 (dev) or the chosen localhost port.
3. Enter a valid API key into the dialog. If you are using the mock server, it can be anything.

## Local Development
Install node first https://nodejs.org/en/

### `npm run start`
Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Mock API Server
### `node mock_api_server.js`
Runs a server to simulate. Change **src/constants/index.js** to switch endpoints that are used.

## Local Build
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Docker Build
### build
#### `sh ./docker_build.sh <image_name>` 
This will build an nginx image 

### run
#### `docker run -d -p <port>:80 --name <instance_name> <image_name>`

## Component Structure
### API Token Dialog
![API Token Input](https://github.com/DamienChing/Advanced-Frontend-Technical-Test/raw/master/images/readme/1.JPG)

### Card Pages View
![Card Pages View](https://github.com/DamienChing/Advanced-Frontend-Technical-Test/raw/master/images/readme/2.JPG)

### Card Details View
![Card Details View](https://github.com/DamienChing/Advanced-Frontend-Technical-Test/raw/master/images/readme/3.JPG)

## Caching Method
### Summary
The card data is cached as a list of objects in the redux store.

The fetching of the cards is divided in blocks of 4 pages. The size of the block and number of cards per page can be changed in the constants folder.

On application entry, the API is called immediately to fetch the first block. The maximum number of pages is also set.

Afterwards, every time the page is changed, the application checks if the block has been requested or loaded. If not, then the block is set as requested and the API is called to request the block.

The previous step is also applied to the next block, so that the blocks can be loaded beforehand.

This allows the UI to traverse pages until the max page count, even if the blocks have not been loaded, but requested.

### Logic Diagram
![Card Fetch Flow Diagram 1](https://github.com/DamienChing/Advanced-Frontend-Technical-Test/raw/master/images/readme/4.JPG)

### Visual Diagram 
On the left, showing that blocks are loaded ahead of time after initial load. but doesn't fetch loaded, or requested blocks.

On the right, diagram shows that the client can traverse blocks that haven't been loaded yet, but are in a requested state. In this case the cards show a loading diagram.
![Card Fetch Flow Diagram 2](https://github.com/DamienChing/Advanced-Frontend-Technical-Test/raw/master/images/readme/5.JPG)