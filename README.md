# jsxtreme-markdown-loader

[![Build Status](https://travis-ci.org/mapbox/jsxtreme-markdown-loader.svg?branch=master)](https://travis-ci.org/mapbox/jsxtreme-markdown-loader)

Webpack loader to transform Markdown with interpolated JS and JSX into React components.

Runs files through the `toComponentModule` function of [jsxtreme-markdown](https://github.com/mapbox/jsxtreme-markdown).

You can pass all of [the options from `toComponentModule`](https://github.com/mapbox/jsxtreme-markdown#tocomponentmodule).

Additional options for the loader:

- **getWrapper** `?Function` - A function that receives the Webpack module's `resource` as an argument, and returns the path to a `wrapper` component.

⚠️  **The output of the default template includes JSX and ES2015 (`class`), so you should chain this loader with the [`babel-loader`](https://github.com/babel/babel-loader).**
