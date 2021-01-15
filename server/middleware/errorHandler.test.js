const errorHandler = require('./errorHandler');

describe('middleware.ErrorHandler', () => {
  let req;
  let res;
  const next = jest.fn();
  const consoleError = jest.fn();

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      },
    };

    next.mockClear();
    console.error = consoleError;
  });

  it('should handle error', () => {
    errorHandler(
      new Error('This is just a test, not a real error'),
      req,
      res,
      next
    );

    expect(res.code).toBeDefined();
    expect(res.code).toBe(500);

    expect(res.data).toBeDefined();
    expect(res.data).toBe('Something broke!');
    expect(consoleError).toBeCalledWith(
      expect.stringContaining('This is just a test, not a real error')
    );
  });
});
