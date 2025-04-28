import { User } from "../models/User";
import jwt from "jsonwebtoken";

async function CheckAuth(token) {
  const decodedData = jwt.verify(token, process.env.JWT_SEC);
  const user = await User.findById(decodedData.id);

  return user;
}

export default CheckAuth;
