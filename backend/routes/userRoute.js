import express from "express"
import multer from "multer";
import { login, logout, Signup, getCurrentUser } from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/auth.js";
import { bookmark, follow, getAllUsers, getMyProfile, unfollow, updateProfile} from "../controllers/user.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.route("/signup").post(Signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getCurrentUser);
router.route("/bookmark/:id").put(isAuthenticated,bookmark);
router.route("/profile/:id").get(isAuthenticated,getMyProfile);
router.route("/allusers/:id").get(isAuthenticated,getAllUsers);
router.route("/follow/:id").post(isAuthenticated,follow);
router.route("/unfollow/:id").post(isAuthenticated,unfollow);
router.route("/update/:id").put(isAuthenticated,upload.single("profilePicture"),updateProfile);




 
export default router;