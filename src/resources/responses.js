export const jsonResponse = (res, code, message, data = null) =>
  res.json({
    status: code,
    message: message,
    data: data,
  });

export const notFound = res =>
  res.json({
    status: 404,
    message: 'Not Found!!',
    data: null,
  });

export const badRequest = res =>
  res.json({
    status: 403,
    message: 'Bad request!!',
    data: null,
  });

export const serverError = (res, error) =>
  res.json({
    status: 500,
    message: 'Server error!!',
    data: error,
  });
