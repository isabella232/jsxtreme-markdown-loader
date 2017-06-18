'use strict';

const loader = require('./index.js');
const loaderUtils = require('loader-utils');
const mdReactTransformer = require('@mapbox/md-react-transformer');

describe('mdReactTransformerLoader', () => {
  let callback;
  let mockContext;
  let transformResult;
  let mockOptions;

  beforeEach(() => {
    callback = jest.fn();
    mockContext = {
      async: jest.fn(() => callback),
      loader,
      resource: 'mockResource'
    };
    mockOptions = {};
    transformResult = Promise.resolve('mockResult');
    jest.spyOn(loaderUtils, 'getOptions').mockReturnValue(mockOptions);
    jest.spyOn(mdReactTransformer, 'mdToComponentModule').mockReturnValue(transformResult);
  });

  afterEach(() => {
    loaderUtils.getOptions.mockRestore();
    mdReactTransformer.mdToComponentModule.mockRestore();
  });

  test('registers as async', () => {
    return mockContext.loader('mockMarkdown').then(() => {
      expect(mockContext.async).toHaveBeenCalledTimes(1);
    });
  });

  test('gets options', () => {
    return mockContext.loader('mockMarkdown').then(() => {
      expect(loaderUtils.getOptions).toHaveBeenCalledTimes(1);
      expect(loaderUtils.getOptions).toHaveBeenCalledWith(mockContext);
    });
  });

  test('passes arguments to mdToComponentModule', () => {
    return mockContext.loader('mockMarkdown').then(() => {
      expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledTimes(1);
      expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledWith('mockMarkdown', mockOptions);
    });
  });

  test('calls the callback with the results', () => {
    return mockContext.loader('mockMarkdown').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, 'mockResult');
    });
  });

  test('passes errors to the callback', () => {
    mdReactTransformer.mdToComponentModule.mockReturnValue(Promise.reject('mockError'));
    return mockContext.loader('mockMarkdown').then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('mockError');
    });
  });

  test('getWrapper function ends up providing options.wrapper', () => {
    const getWrapper = jest.fn(() => 'mockWrapper');
    loaderUtils.getOptions.mockReturnValue({ getWrapper });
    return mockContext.loader('mockMarkdown').then(() => {
      expect(getWrapper).toHaveBeenCalledTimes(1);
      expect(getWrapper).toHaveBeenCalledWith('mockResource');
      expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledTimes(1);
      expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledWith('mockMarkdown', {
        wrapper: 'mockWrapper'
      });
    });
  });
});
