import User from '@chat/shared/models/'
import { Response, Request } from "express";

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
        $ne: req.token?._id,
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
