# bdt-elm
Elm modules commonly used at BDT

## Examples
Examples can be viewed on github pages: https://bluedogtraining.github.io/bdt-elm/

## Folder Structure
The folder structure is pretty simple:

- `./src`: The library itself. It contains an elm.json file with type `package`.
- `./demo`: The Elm source for the demo shown above. It contains an elm.json file type `application`.
- `./docs`: The folder used by github pages. It contains an `index.html` file which pulls in the compiled demo in the `./docs/build` folder.
- `./tests`: The tests of the library. Run `elm-test` from the root directory.
- `./public`: A simple symlink to docs. Its where most servers (including our dev server) are looking for your public files. Just a convenience symlink really.

## Compile the demo
In order to compile the demo, navigate to `./demo` and run `./live`. 