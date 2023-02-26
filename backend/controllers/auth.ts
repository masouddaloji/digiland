import User from "../models/User";
import Social from "../models/Social";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import checkCredential from "../validators/register";
import checkSocial from "../validators/social";
import errorGenerate from "../utils/errorGenerate";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, pwd } = req.body;
  if (!pwd || !email)
    return res
      .status(400)
      .json({ message: "email and password are required." });

  try {
    const checkData = await checkCredential({ email, pwd });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      email: email,
      password: hashedPwd,
    });

    if (!result) {
      errorGenerate("Users data was not saved.Try again...");
    }
    res.status(201).json({ message: `New user created!`, user: { email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const checkData = await checkCredential({ email, pwd });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      errorGenerate("Invalid email or password", 401);
    }

    const match = await bcrypt.compare(pwd, foundUser!.password as string);

    if (!match) {
      errorGenerate("Invalid email or password", 401);
    }

    const accessToken = jwt.sign(
      { email: foundUser!.email, role: foundUser!.role },
      process.env.ACCESS_TOKEN_SECRET?.toString()!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser!.email },
      process.env.REFRESH_TOKEN_SECRET?.toString()!,
      { expiresIn: "7d" }
    );

    // Saving refreshToken with current user
    foundUser!.refreshToken = refreshToken;
    const result = await foundUser!.save();
    if (!result) {
      errorGenerate("Users credentials was not saved.Try again...");
    }

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      //secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) {
      errorGenerate("Unauthorized", 401);
    }
    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET?.toString()!
    ) as { email: string };
    if (!decoded || !decoded.email) {
      errorGenerate("Forbidden", 403);
    }
    const foundUser = await User.findOne({
      email: decoded.email,
    }).exec();
    if (!foundUser) {
      errorGenerate("Unauthorized", 401);
    }
    const accessToken = jwt.sign(
      { email: foundUser!.email, role: foundUser!.role },
      process.env.ACCESS_TOKEN_SECRET?.toString()!,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); //*
    res.json({ message: "Cookie cleared" });
  } catch (err) {
    next(err);
  }
};

export const social = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, profileUrl } = req.body;
  if (!username || !profileUrl || !email)
    return res
      .status(400)
      .json({ message: "Your received data is wrong.Please send valid data" });

  try {
    const checkData = await checkSocial({ email, username, profileUrl });
    if (checkData !== true) {
      errorGenerate("Invalid Inputs", 400, checkData);
    }
    let foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      foundUser = await User.create({
        email: email,
        name: username,
        image: profileUrl,
      });
      await Social.create({ username, profileUrl, userId: foundUser._id });
    }
    const accessToken = jwt.sign(
      { email: foundUser!.email, role: foundUser!.role },
      process.env.ACCESS_TOKEN_SECRET?.toString()!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser!.email },
      process.env.REFRESH_TOKEN_SECRET?.toString()!,
      { expiresIn: "7d" }
    );

    // Saving refreshToken with current user
    foundUser!.refreshToken = refreshToken;
    const result = await foundUser!.save();

    if (!result) {
      errorGenerate("Users credentials was not saved.Try again...");
    }

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send accessToken
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};
