const textToJSONParser = (req, res, next) => {
  if (req?.body?.data) {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }
  }
  next();
};

export default textToJSONParser;