#redux-json-request-formatting-tutorial

A very small demo app demonstrating how to use Redux middleware to transform asynchronous JSON responses to the correct key format for your app, before your reducer handles the action. Relies on `redux`, `redux-action-transform-middleware`, and `camelize`.

##How to run

1. Install dependencies: `npm install`.
2. Build `dist/bundle.js` with webpack: `webpack`.
3. Open `index.html` in a web browser.

##How the app works

* The app will display the current `data` state as JSON.
* Press the "Fetch data" button at the top-left to simulate a server request. After a moment, the view will re-populate with the (transformed to camelCase) request object.
* Press "Clear data" at the top-right to reset the `data` state.
