# "What's Cookin'?" Application

## Project Description

This is a [recipe planning application](https://jaypeasee.github.io/whats-cookin/). In the project, we were provided 3 separate data files of users, ingredients and recipes. With the data, we built an application (from scratch) for users to view, search, filter, "favorite", and add recipes to cook. We also provided a view of the ingredients that are currently in the user's pantry and a shopping list for when the user does not have enough ingredients after they select a recipe to cook. Finally, if the user did have enough ingredients for the recipe they select, those ingredients are then taken out of their pantry.

## Learning Goals

* Build out a robust testing suite using the `Mocha Framework` and `Chai Assertion Library` for `TDD`.

* Implement `ES6` functions and classes where appropriate.

* Practice using iterator methods on double-datasets to manipulate data.

* Use proper `event delegation` while providing a user interface that is clear and easy to use.

## Functionality

![View and interact with modal](https://media.giphy.com/media/RvGja3zWao9Xo7wAMI/giphy.gif)

![Show different views in application](https://media.giphy.com/media/ws8xrTaRdwEGxq5Ot0/giphy.gif)

![Display different searches](https://media.giphy.com/media/ifLeFNL8uv2MBTOb6N/giphy.gif)

## Programming Languages Used

* `JavaScript` with `ES6` implementations

* `HTML`

* `CSS`

## Planning

This project was assigned on October 9, 2020 and turned in on October 21, 2020. The first couple days were spent establishing a [DTR](https://github.com/jaypeasee/whats-cookin/blob/main/planning/dtr.md), [wireframing](https://github.com/jaypeasee/whats-cookin/blob/main/planning/what's-cookin-wireframe.png), outlining a class structure and then testing and implementing the classes. Once our data model was initialised, we built out the basic structure of the page and started creating minimal `DOM` functionality. The last few days of the project were spent back and forth between the `data mode`l and them `DOM` to increment on the functionality and user experience. When we were satisfied enough, we actually styled the page and added a media query to accommodate a mobile view.

## Challenges

1. Intentionally planning an overall specific strategy before actually jumping into writing code. This included writing tests and class implementations before working in the `DOM`.
2. Working between multiple datasets where the only commonality to match them was an id. And then creating functions out of them that could easily be reused later in the project's progression.
3. Avoiding using global variables by relying almost entirely on event delegation while still making the page dynamic and fully customizable.

## Wins

1. We built the minimum viable product where the user can view, add and search for all sorts of recipes without encountering any bugs.
2. The testing suite is specific with sad pathing outcomes and 53 total `it` blocks.
3. The page is mostly responsive with a media query for mobile devices.

## Set Up Instructions

1. Navigate to the [repository link](https://github.com/jaypeasee/whats-cookin)
2. `Fork` the repository.
3. In your Terminal, run `git clone <your SSH code key>` to bring the repository down to your local machine.
4. Run `cd whats-cookin` to move into the directory.
5. To see the code, run `<your text editor> .`
6. To see how the tests are run:
   * Run `npm install`
   * Run `npm test`
7. To see the application, run `open index.html`

## Contributors

[JP Carey](https://github.com/jaypeasee) - Application Co-Creator

[Cooper Terrones](https://github.com/coopterrones) - Application Co-Creator

[Bob Gu](https://github.com/BobGu) - Project Manager
