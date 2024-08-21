function asyncHandler(requestHandler) {
  return async (req, res, next) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      console.log("async handler issues ", error.message);
      next(error);
    }
  }
}

export default asyncHandler;