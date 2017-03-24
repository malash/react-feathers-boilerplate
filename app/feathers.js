import feathers from 'feathers/client';
import rest from 'feathers-rest/client';

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(rest(`${window.location.protocol}//${window.location.host}/api/v1`).fetch(window.fetch.bind(window)));

// app.authenticate()
//   .then((response) => {
//     state.set('authenticated', true);
//     state.set('currentUser', response.data);
//   }).catch(error => {
//     if (error.code === 401) {
//       state.set('authenticated', false);
//     }
//     console.error(error);
//   });

export default app;