# Advanced-Frontend-Technical-Test
## Local Development
Install node first https://nodejs.org/en/

#### `npm run start`
Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Local Build
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Build Docker Production Image
### build
#### `sh ./docker_build.sh <image_name>` 
This will build an nginx image 

### run
#### `docker run -d -p <port>:80 --name <instance_name> <image_name>`
