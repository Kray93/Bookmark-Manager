# Bookmark-Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This program allows one to keep all their bookmarks nicely organized to their hearts content. It permits one to create both collections of bookmarks, for those who work with many different pages online, and single bookmarks for those gems of webpages one finds online. Sometimes though it can be a while between uses when it comes to certain sites, so Bookmark-Manager lets you keep notes of what each bookmark is and why you have it saved there or in multiple places. Although there is the possibility of typos, or the copy/paste did not do what it said on the tin when one tried to save a link. Simply edit whichever collection or bookmark you would like, yes if you can try to get it on the first try. Or if you get tired of one of your collections or bookmarks, the delete feature lets you clear some space for more bookmarks. It is a simple way to keep track of all your favorite things online!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [User Story](#user-story)
- [Contributing](#contributing)
- [Future Development](#future-development)
- [Tests](#tests)
- [License](#license)
- [GitHub](#github)

## Installation

### Extension

1. Open the [chrome extension manager page](chrome://extensions)
2. Enable developer mode
3. Click on `Load unpacked` and select the `extension` directory in this repository
4. Select the extensions (puzzle piece) icon in the top right of your browser and pin bookmark manager

### Web Server

1. Open integrated terminal or enter the following into your console
2. Run `"npm i"`
3. Create a database
4. Create `.env` file w/ `DATABASE_URL` and `SESSION_SECRET` keys
5. Start Organizing those bookmarks!

## Usage

[Checkout our deployed app here](https://bookmark-man.herokuapp.com/)

or install and

1. Run `node server.js`
2. Navigate to localhost:8080

## User Story

```
GIVEN I as a user work heavily with chrome,
I need a central place where I can organize, edit, and delete my bookmarks


WHEN I open the app
THEN I will see a log in page
WHEN I try to log in they will be re-directed to a create account page
THEN I can enter in a custom username and password
WHEN I have entered my info
THEN I can press submit and will be taken to the front page
WHEN I view the front page
THEN I can see a background of bookshelves and an empty menu with an add folder button and an add Bookmark button
WHEN I add a folder
THEN I am presented with a small card to make a name and choose a color
WHEN I create a new folder
THEN I can go into it to create a Bookmark
WHEN I click to create a bookmark
THEN I am presented with a card to add a name, url, parent collection, and color
WHEN I add a new bookmark or folder but have a typo
THEN I can edit aforementioned bookmark or collection by clicking the edit button
WHEN I click the edit button the same card that was used to make the bookmark appears on the page with all of the information already entered
THEN I can change any of the information and re-submit it to save the changes
WHEN I want to use a bookmark
THEN I must find my way to the one that I wish to use and select it
WHEN I select a bookmark
THEN I am taken to that webpage
FIN
```

## Contributing

One can contribute as much or as little as they like so long as they comment and describe everything that they do, which means succinct commit messages and commented code.

## Future Development

- [Wire-Frame](public/assets/imgs/wire-frame.png)
- Circular Menu
- SVG Shapes
- Token-based Authentication
- Tag functionality

## Tests

Simply test it by running it and adding folders and bookmarks to make certain of functionality.

## License

[MIT License](https://opensource.org/licenses/MIT)

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

### GitHub

Questions on how it works? Take a look at our GitHub(s)

- [Application: ](https://github.com/Kray93/Bookmark-Manager/tree/main)_Application Repo_
- [John: ](https://github.com/JohnDJake)_Front-End + PM_
- [Mark: ](https://github.com/mtrupiano)_Back-End_
- [Kevin: ](https://github.com/Kray93)_Back-End + GM_
- [Zach: ](https://github.com/Z1springer)_Front-End_

### Email

Or if you have a suggestion/question, send us an email!

- [John](mailto:john.d.jake@gmail.com)
- [Mark](mailto:markt@uw.edu)
- [Kevin](mailto:kevinwillig@gmail.com)
- [Zach](mailto:zdspringer99@gmail.com)
