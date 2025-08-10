import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "uploads", "resumes", filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    // Only allow PDF viewing in browser
    if (path.extname(filename).toLowerCase() === ".pdf") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    } else {
        // For other files, force download
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    }

    fs.createReadStream(filePath).pipe(res);
});

export default router;