import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "resume") {
            cb(null, "uploads/resumes/");
        } else if (file.fieldname === "profilePic") {
            cb(null, "uploads/profilePics/");
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const multiUpload = multer({
    storage: storage
}).fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]);

export const companyLogoUpload = multer({ storage: multer.memoryStorage() }).single("logo");