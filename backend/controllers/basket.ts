import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import User from "../models/User";
import errorGenerate from "../utils/errorGenerate";

export const addToCart = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.user })
      .populate("basket.cartItems.productId")
      .select("-password -refreshToken")
      .exec();

    if (!user) {
      errorGenerate("User not found", 404);
    } else {
      const productId = req.params.id;

      const product = await Product.findById(productId);

      if (!product) {
        errorGenerate("Product not found", 404);
      }

      const cartProductIndex = user.basket!.cartItems.findIndex((cp) => {
        //@ts-ignore
        return cp.productId._id.toString() === productId.toString();
      });
      !user.basket &&
        (user.basket = { cartItems: [], totalAmount: 0, totalQTY: 0 });
      let newQuantity = 1;
      const updatedCartItems = [...user.basket.cartItems];

      if (cartProductIndex >= 0) {
        newQuantity = user.basket.cartItems[cartProductIndex].cartQuantity + 1;
        updatedCartItems[cartProductIndex].cartQuantity = newQuantity;
      } else {
        updatedCartItems.push({
          productId,
          cartQuantity: newQuantity,
        });
      }
      const updatedAmount = user.basket.totalAmount + product!.price;
      const updatedQTY = user.basket.totalQTY + 1;
      const updatedCart = {
        totalAmount: updatedAmount,
        totalQTY: updatedQTY,
        cartItems: [...updatedCartItems],
      };
      user.basket = updatedCart;
      await user.save();
      res
        .status(200)
        .json({ message: "Product added to cart", data: user.basket });
    }
  } catch (err) {
    next(err);
  }
};

export const removeFromCartSingle = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.user })
      .populate("basket.cartItems.productId")
      .select("-password -refreshToken")
      .exec();

    if (!user) {
      errorGenerate("User not found", 404);
    } else {
      const productId = req.params.id;

      const product = await Product.findById(productId);

      if (!product) {
        errorGenerate("Product not found", 404);
      }

      const cartProductIndex = user.basket!.cartItems.findIndex((cp) => {
        //@ts-ignore
        return cp.productId._id.toString() === productId.toString();
      });
      !user.basket &&
        (user.basket = { cartItems: [], totalAmount: 0, totalQTY: 0 });
      let newQuantity = 1;
      let updatedCartItems = [...user.basket.cartItems];

      if (cartProductIndex >= 0) {
        newQuantity = user.basket.cartItems[cartProductIndex].cartQuantity - 1;
        updatedCartItems[cartProductIndex].cartQuantity = newQuantity;
        if (newQuantity === 0) {
          updatedCartItems = user.basket.cartItems.filter((item) => {
            //@ts-ignore
            return item.productId._id.toString() !== productId.toString();
          });
        }
      } else {
        errorGenerate("This product isn`t in the basket", 400);
      }
      const updatedAmount = user.basket.totalAmount - product!.price;
      const updatedQTY = user.basket.totalQTY - 1;
      const updatedCart = {
        totalAmount: updatedAmount,
        totalQTY: updatedQTY,
        cartItems: [...updatedCartItems],
      };
      user.basket = updatedCart;
      await user.save();
      res
        .status(200)
        .json({ message: "Product amount decreased", data: user.basket });
    }
  } catch (err) {
    next(err);
  }
};

export const removeFromCartMulti = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.user })
      .populate("basket.cartItems.productId")
      .select("-password -refreshToken")
      .exec();

    if (!user) {
      errorGenerate("User not found", 404);
    } else {
      const productId = req.params.id;
      const product = await Product.findOne({ _id: productId }).exec();

      if (!product) {
        errorGenerate("Product not found", 404);
      }

      !user.basket &&
        (user.basket = { cartItems: [], totalAmount: 0, totalQTY: 0 });
      const updatedCartItems = user.basket.cartItems.filter((item) => {
        //@ts-ignore
        return item.productId._id.toString() !== productId.toString();
      });

      const cartProductIndex = user.basket.cartItems.findIndex((cp) => {
        console.log(cp.productId.toString());
        console.log(productId.toString());
        //@ts-ignore
        return cp.productId._id.toString() === productId.toString();
      });
      console.log(cartProductIndex);

      const deletedQuantity =
        user.basket.cartItems[cartProductIndex].cartQuantity;

      const updatedAmount =
        user.basket.totalAmount - deletedQuantity * product!.price;
      const updatedQTY = user.basket.totalQTY - deletedQuantity;
      const updatedCart = {
        totalAmount: updatedAmount,
        totalQTY: updatedQTY,
        cartItems: [...updatedCartItems],
      };
      user.basket = updatedCart;
      await user.save();
      res
        .status(200)
        .json({ message: "Product removed from cart", data: user.basket });
    }
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.user })
      .select("-password -refreshToken")
      .exec();

    if (!user) {
      errorGenerate("User not found", 404);
    }

    user!.basket = { cartItems: [], totalAmount: 0, totalQTY: 0 };
    await user!.save();

    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.user })
      .populate("basket.cartItems.productId")
      .select("-password -refreshToken")
      .exec();
    if (!user) {
      errorGenerate("User not found", 404);
    }
    const cartData = user!.basket;

    res
      .status(200)
      .json({ message: "Cart retrieved successfully", data: cartData });
  } catch (err) {
    next(err);
  }
};
