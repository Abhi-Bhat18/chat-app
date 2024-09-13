import User from "../model/user.model";
import { Response, Request } from "express";
import { ApiResponse, ApiError, asyncHandler } from "@chat/shared";

/**
 * Retrieves all users from the database.
 * Only selected fields: fullName, userName, and imgUrl are returned for each user.
 *
 */

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pageLimit = req.query.pageLimit
      ? parseInt(req.query.pageLimit as string, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 0;

    const users = await User.find({
      _id: {
        $ne: req.token?.id,
      },
    })
      .select("fullName userName imgUrl")
      .skip(page * pageLimit);

    if (!users)
      return res.status(404).json({
        success: false,
        message: "Unable to find the resource",
      });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server Error",
    });
  }
};

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // get the user by id
  const user = await User.findById(req.token?.id);

  if (!user) throw new ApiError(404, "Unable data not found");

  return res.json(new ApiResponse(200, user, "User data fetched successfully"));
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // get the data from the body

    const user = await User.findByIdAndUpdate(
      req.token?.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    // send user update event through the kafka

    return res.json(new ApiResponse(200, user, "User updated successfully"));
  }
);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  
  // get the user array from the query
  let { ids } = req.query;

  if (ids && typeof ids == "string") {
    ids = ids.split(",");
  }else throw new ApiError(400, 'Bad request')

  // get the user
  const users = await User.find({
    _id: {
      $in: { ids },
    },
  }).select('firstName lastName imgUrl userName');

  console.log("Users", users);

  return res.json(new ApiResponse(200, users, 'Users fetched successfully'))
});
