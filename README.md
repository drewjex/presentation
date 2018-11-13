This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get up and running

In the project directory, you can run:

### `yarn install && yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

To modify/add/remove slides, simply update App.json. Background color defaults to random colors, but can be assigned specific color if desired.

### `Available Attributes`

- title (string): Large, centered text,
- header (string): Underlined text at top of page,
- content (string or array): Simple text or list of elements,
- footer (string): Text at botom of slide,
- image (string): URL of image to display,
- imageStyle (string): If \"contain\", then display entire image. Else, scale to provided space,
- iframe (string): URL of external site - useful for demos in Codepen or similar (remember CORS)
