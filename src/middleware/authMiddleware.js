const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(404).json({
      message: "Token not found",
      status: "ERROR",
    });
  }

  const token = tokenHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: `lỗi ${err}`,
        status: "ERROR",
      });
    }
    console.log(user); // bar
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "you are not admin",
        status: "ERROR",
      });
    }
  });
};

// const authUserMiddleWare = (req, res, next) => {
//   const token = req.headers.token.split(" ")[1];
//   const userId = req.params.id;
//   jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//     if (err) {
//       return res.status(404).json({
//         message: `lỗi ${err}`,
//         status: "ERROR",
//       });
//     }
//     console.log(user); // bar
//     if (user?.isAdmin || user?.id === userId) {
//       next();
//     } else {
//       return res.status(404).json({
//         message: "you are not admin",
//         status: "ERROR",
//       });
//     }
//   });
// };

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("req", req);

  if (!token) {
    return res.status(404).json({
      message: "Token not found",
      status: "ERROR",
    });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2) {
    return res.status(404).json({
      message: "Invalid token format",
      status: "ERROR",
    });
  }

  const tokenValue = tokenParts[1];
  const userId = req.params.id || req.body.user;

  jwt.verify(tokenValue, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: `lỗi ${err}`,
        status: "ERROR",
      });
    }
    console.log(user); // bar
    console.log(userId);
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "you are not admin",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
