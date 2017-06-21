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
    mockContext = {
      loader,
      resource: 'mockResource'
    };
    mockOptions = {};
    transformResult = 'mockResult';
    jest.spyOn(loaderUtils, 'getOptions').mockReturnValue(mockOptions);
    jest.spyOn(mdReactTransformer, 'mdToComponentModule').mockReturnValue(transformResult);
  });

  afterEach(() => {
    loaderUtils.getOptions.mockRestore();
    mdReactTransformer.mdToComponentModule.mockRestore();
  });

  test('gets options', () => {
    mockContext.loader('mockMarkdown');
    expect(loaderUtils.getOptions).toHaveBeenCalledTimes(1);
    expect(loaderUtils.getOptions).toHaveBeenCalledWith(mockContext);
  });

  test('passes arguments to mdToComponentModule', () => {
    mockContext.loader('mockMarkdown');
    expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledTimes(1);
    expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledWith('mockMarkdown', mockOptions);
  });

  test('calls the callback with the results', () => {
    const result = mockContext.loader('mockMarkdown');
    expect(result).toBe('mockResult');
  });

  test('passes errors to the callback', () => {
    mdReactTransformer.mdToComponentModule.mockImplementation(() => {
      throw new Error('mockError');
    });
    expect(() => mockContext.loader('mockMarkdown')).toThrow('mockError');
  });

  test('getWrapper function ends up providing options.wrapper', () => {
    const getWrapper = jest.fn(() => 'mockWrapper');
    loaderUtils.getOptions.mockReturnValue({ getWrapper });
    mockContext.loader('mockMarkdown');
    expect(getWrapper).toHaveBeenCalledTimes(1);
    expect(getWrapper).toHaveBeenCalledWith('mockResource');
    expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledTimes(1);
    expect(mdReactTransformer.mdToComponentModule).toHaveBeenCalledWith('mockMarkdown', {
      wrapper: 'mockWrapper'
    });
  });
});
