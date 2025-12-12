import { User } from "../models/user.model.js";
import { transformUser, transformUsers } from "../utils/imageUrlHelper.js";

export const bookmark = async (req, res, next) => {
    try {
        const loggedInUserId = req.user || req.body.id; // Use req.user from auth middleware, fallback to req.body.id for compatibility
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (user.bookmark.includes(tweetId)) {
            //remove
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmark: tweetId } });
            return res.status(200).json({
                message: "This blog is removed from bookmark",
                success: true
            })
        } else {
            //Add
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmark: tweetId } });
            return res.status(200).json({
                message: "This blog is bookmarked",
                success: true
            })
        }
    } catch (error) {
        next(error)
    }
};

export const getMyProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        const transformedUser = transformUser(user?.toObject ? user.toObject() : user);
        return res.status(200).json({
            user: transformedUser,
        })
    } catch (error) {
        next(error)
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers) {
            return res.status(401).json({
                message: "Currently do not have any user",
                success: false
            })
        };

        const transformedUsers = transformUsers(otherUsers.map(u => u.toObject ? u.toObject() : u));
        return res.status(200).json({
            otherUsers: transformedUsers
        });
    } catch (error) {
        next(error);
    }
};

export const follow = async (req, res, next) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        if (loggedInUserId === userId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });
        }
        else {
            return res.status(400).json({
                message: `${loggedInUser.name}  already followed to ${user.name}`
            });
        };
        const updatedLoggedInUser = await User.findById(loggedInUserId).select("-password");
        const updatedTargetUser = await User.findById(userId).select("-password");
        return res.status(200).json({
            message: `${loggedInUser.name} just follow to ${user.name}`,
            success: true,
            loggedInUser: transformUser(updatedLoggedInUser.toObject ? updatedLoggedInUser.toObject() : updatedLoggedInUser),
            targetUser: transformUser(updatedTargetUser.toObject ? updatedTargetUser.toObject() : updatedTargetUser)
        });
    } catch (error) {
        next(error);
    }
}

export const unfollow = async(req,res,next) =>{
     try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });
        }
        
        else {
            return res.status(400).json({
                message: `${loggedInUser.name} already unfollowed to ${user.name}`
            });
        };
        const updatedLoggedInUser = await User.findById(loggedInUserId).select("-password");
        const updatedTargetUser = await User.findById(userId).select("-password");
        return res.status(200).json({
            message: `${loggedInUser.name} just unfollow to ${user.name}`,
            success: true,
            loggedInUser: transformUser(updatedLoggedInUser.toObject ? updatedLoggedInUser.toObject() : updatedLoggedInUser),
            targetUser: transformUser(updatedTargetUser.toObject ? updatedTargetUser.toObject() : updatedTargetUser)
        });
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, username, bio } = req.body;
        const updatePayload = {};
        if (name) updatePayload.name = name;
        if (username) updatePayload.username = username;
        if (bio !== undefined) updatePayload.bio = bio;
        if (req.file) {
            // Use environment variable for backend URL, fallback to request-based URL
            const backendUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
            const fileUrl = `${backendUrl}/uploads/${req.file.filename}`;
            updatePayload.profilePicture = fileUrl;
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatePayload },
            { new: true, runValidators: true, select: "-password" }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const transformedUser = transformUser(updatedUser.toObject ? updatedUser.toObject() : updatedUser);
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: transformedUser
        });
    } catch (error) {
        console.error('Update profile error:', error);
        next(error);
    }
};