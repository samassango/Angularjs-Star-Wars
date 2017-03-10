# my-app

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

##How to run this project

1. Install grunt serve using command `npm install grunt serve -g`.
2. Clone the repository using command `git clone` https://github.com/samassango/Angularjs-Star-Wars.git
3. run `grunt serve` command inside the project folder.

##Files worked on
1. A file for controllers is in `app/scripts/controllers/project.js`.
2. A file for service is in `app/scripts/services/prople.service.js`.
3. Configurations such as routing is in `app/scripts/app.js`.
4. Views are in `app/views/' which is `people.html`, `search.html`,`map.html` and style in `styles`.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

###PLEASE NOTE: Please make sure you allow permissions to retrieve your location because the map relies on your current location. And, check if you have CORS enabled when running this in the browser if it blocks the request to google maps API.