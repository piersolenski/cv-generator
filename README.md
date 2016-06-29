# CV Generator

A little workflow for generating CVs from JSON, using Handlebars and Gulp.

## Get started
Install Gulp globally if you haven't already:
```
npm install -g gulp
```

Install the dependencies for the project:
```
npm install
```

## Running the tasks
Build for distribution with performance in mind, using minification and image optimisation:
```
gulp
```

Build for development using a server watching for changes, with sourcemaps enabled for debugging.
```
gulp watch
```

## Changing the theme

You can modify the colour theme by changing the `$base` variable in `variables.scss`. The SASS color functions will generate a complimentary theme based around your chosen colour.

![Blue theme](https://raw.githubusercontent.com/superfunkminister/cv-generator/master/samples/cv-blue.jpg)
![Green theme](https://raw.githubusercontent.com/superfunkminister/cv-generator/master/samples/cv-green.jpg)
![Purple theme](https://raw.githubusercontent.com/superfunkminister/cv-generator/master/samples/cv-purple.jpg)


## Printing your CV

Simply click Print in your browser, and choose PDF or paper. The print stylesheet takes care of the rest for you! Works best in Chrome.
