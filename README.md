# md-react-transformer-loader

Webpack loader to transform Markdown with interpolated JS and JSX into React components.

Runs files through the `mdToComponentModule` function of [md-react-transformer](https://github.com/mapbox/md-react-transformer).

You can pass all of [the options from `mdToComponentModule`](https://github.com/mapbox/md-react-transformer#mdtocomponentmodule) (e.g. a custom template).

Additional options for the loader:

- **getWrapper** `?Function` - A function that receives the module's `resource` as an argument, and returns the path to a `wrapper` component.

⚠️  **The output of the default template includes JSX and ES2015 (`class`), so you should chain this loader with the [`babel-loader`](https://github.com/babel/babel-loader).**
