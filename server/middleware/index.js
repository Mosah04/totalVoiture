import admin from "../config/firebase-config.js";

class MiddleWare {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(req.headers.authorization);

    try {
      const decodeValue = admin.auth().verifyIdToken(token);
      if (decodeValue) {
        return next();
      }
      return res.status("400").json({ message: "Unauthorized" });
    } catch (error) {
      console.log(error.message);
      return res.status("500").json({ message: "Internal Error" });
    }
  }
}

export default new MiddleWare();
