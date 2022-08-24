const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const errorMsgHandler = (err) => {
  console.log(err);
  let validationErrors;
  if (err) {
    validationErrors = {};
    err.forEach((error) => {
      validationErrors[error.param] = error.msg;
    });
  }
  return validationErrors;
};

module.exports = {
  hashPassword,
  errorMsgHandler,
};
