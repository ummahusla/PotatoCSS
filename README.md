<p align="center"><img src="logo.png" alt="PotatoCSS" /></p>
<h3 align="center"><a href="https://potatocss.github.io/">PotatoCSS</a></h3>
<p align="center"><small><code>Simple CSS framework for hackers. Simple as potato.</code></small></p>

[![npm version](https://badge.fury.io/js/potato-css.svg)](https://badge.fury.io/js/potato-css)

___

🥔 PotatoCSS is a beautiful CSS framework for hackers: boasting a responsive 12 column grid, ready to use built-in forms and buttons, it's clean, simple and easy-to-use.


## Installation

[**PotatoCSS**](https://potatocss.github.io/) can be installed via the methods below,

* Manual: [Download](https://github.com/ummahusla/PotatoCSS/archive/master.zip)
* via NPM: `npm install potato-css`
* via git: `git clone https://github.com/ummahusla/PotatoCSS.git`

## How to use

Just grab `potato.css` or `potato.min.css` from the `/stylesheets/css` folder and shove it where you store the CSS files for your project.

Demo can be found at [**https://potatocss.github.io/**](https://potatocss.github.io/).

Alternately, you can find examples and snippets to use with PotatoCSS in the [example folder](https://github.com/ummahusla/PotatoCSS/examples).

📢 **SASS / LESS versions are still in development**

## Browser Support

The following details are estimates, assume [evergreen browser](http://stackoverflow.com/a/19060334) support for now.

* **Chrome**            : ALL
* **Firefox**           : 3.5+
* **Safari**            : 3.2+
* **Opera**             : 11+
* **Opera Mini**        : ALL
* **Edge**              : ALL
* **Internet Explorer** : 9+

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. To build the code from SCSS version, you can now run:

  ```shell
  gulp build-sass
  ```
4. To build the code from LESS version, you can now run:

  ```shell
  gulp build-less
  ```
5. You will find the compiled code in the `stylesheets` and `js` folders.
6. To watch changes while develop, you can now run:

  ```shell
  gulp default
  
  # It will start watching process and local server with livereloading
  ```
7. To test changes in compiled stylesheets, you can now run:

  ```shell
  gulp test-css
  # or
  npm test
  ```

## Contributing

Please read the repository's 🗒 [**contributing guide**](CONTRIBUTING.md) for more information on how you can help.

## License

[**PotatoCSS**](https://potatocss.github.io/) is licensed under the [**MIT License**](LICENSE.md).

## Credits

[**PotatoCSS**](https://potatocss.github.io/) was created for [**Hacktoberfest**](https://hacktoberfest.digitalocean.com/) by [**Edvins Antonovs**](https://twitter.com/edvinsantonovs). You can find more details in [**this blog post**](http://edvinsantonovs.co.uk/potatocss-and-hacktoberfest2016/).

🎉 Big thanks to all the [**contributors**](https://github.com/ummahusla/PotatoCSS/graphs/contributors).
