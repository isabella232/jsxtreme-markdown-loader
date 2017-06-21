'use strict';

const loaderUtils = require('loader-utils');
const mdReactTransformer = require('@mapbox/md-react-transformer');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};
  if (options.getWrapper) {
    options.wrapper = options.getWrapper(this.resource);
    delete options.getWrapper;
  }
  return mdReactTransformer.mdToComponentModule(source, options);
};
