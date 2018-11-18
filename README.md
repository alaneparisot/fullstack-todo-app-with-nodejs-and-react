# Fullstack To-do App with Node.js and React

A simple to-do app to explore fullstack development, with Node.js and React.

[Demo](https://alaneparisot-todo-nodejs-react.herokuapp.com) (you may need to wait 15-20 seconds for the page to load, since it's hosted freely on Heroku).

## Local Installation

In `package.json`, delete this line (used by Heroku):
```bash
"install": "npm i --prefix server",
```

Then, execute:
```bash
$ npm i && cd server && npm i && cd ../client && npm i && cd ..
```

Check out `server/config/config.js` to see the environment variables you need to configure.

When you're ready, execute:
```bash
$ npm run dev
```

## Technologies Involved

### JavaScript

* [ES6](https://www.ecma-international.org/ecma-262/6.0/)+
* [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
* [axios](https://github.com/axios/axios)

### Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Passport.js](http://www.passportjs.org/)
* [JSON Web Token](https://jwt.io/)

### Frontend

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Material-UI](https://material-ui.com/)
* [styled-components](https://www.styled-components.com/)

## Future Developments

This app is in continuous development and improvement. Here are some directions I would like to follow, with no particular order:

* Bug fixing [PRIORITY 1]
* Unit testing (backend and frontend) [PRIORITY 2]
* React's [Hooks](https://reactjs.org/docs/hooks-intro.html)
* CI--Continuous Integration
* File upload (such as images)
* [Socket.IO](https://socket.io/) (to create a live chat)
* [GraphQL](https://graphql.org/)
* [PWA--Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Apps/Progressive)
* [React Native](https://facebook.github.io/react-native/)
* [Electron](https://electronjs.org/)
* [Next.js](https://nextjs.org/)
* Rewrite in [TypeScript](https://www.typescriptlang.org/)
* Optimizations