// controllers/apiController.js
function index(req, res) {
  res.json({
    message: 'Welcome to tunely!',
    documentation_url: 'https://github.com/sf-wdi-labs/tunely',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/', description: 'View the index, very exciting'
      },
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      },
      {
        method: 'GET', path: '/api/albums', description: 'View all albums in our DB'
      },
      {
        method: 'GET', path: '/api/albums/:id', description: 'View specific album by ID'
      },
      {
        method: 'POST', path: '/api/albums', description: 'Create a new album'
      },
      {
        method: 'PUT', path: '/api/albums/:id', description: 'Update current Album'
      },
      {
        method: 'DELETE', path: '/api/albums/:id', description: 'Delete an album by its specific ID'
      },
    ]
  });
};
module.exports = {
  index: index
};
