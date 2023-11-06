const crypto = require('crypto');

const createNewString = () => crypto.randomBytes(32).toString('hex');

const checkSessionId = (req, res, next) => {
  const id = req.cookies.sessionId;
  if (!id) {
    res.cookie('sessionId', createNewString(), {
      maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true,
    });
  }
  next();
};

module.exports = checkSessionId;
