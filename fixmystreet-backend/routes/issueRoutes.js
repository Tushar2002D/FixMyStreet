const express = require("express");
const Issue = require("../models/Issue");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const { Parser } = require("json2csv");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const upload = multer({ storage });
const router = express.Router();

// ✅ Create an issue (Authenticated)
router.post("/", protect, upload.single("image"), async (req, res) => {
  const { title, description, category, location } = req.body;

  try {
    const issue = new Issue({
      userId: req.user.id,
      title,
      description,
      category,
      imageURL: req.file?.path || "",
      location: location ? JSON.parse(location) : {},
    });

    await issue.save();
    res.status(201).json({ message: "Issue reported", issue });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error reporting issue" });
  }
});

// ✅ Get all issues (Public, with filters)
router.get("/", async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const issues = await Issue.find(filter).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching issues" });
  }
});

// ✅ Get issues of current user
router.get("/my", protect, async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.user.id });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your issues" });
  }
});

// ✅ Update issue status (admin only)
// PATCH /api/issues/:id/status (admin only)
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "In Progress", "Resolved"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = status;
    await issue.save();

    res.json({ message: "Status updated", issue });
  } catch (err) {
    res.status(500).json({ message: "Error updating issue status" });
  }
});

// ✅ Export issues as CSV (admin only)
router.get("/export/csv", protect, adminOnly, async (req, res) => {
  try {
    const issues = await Issue.find().populate("userId", "name email");

    if (!issues.length) {
      return res.status(404).json({ message: "No issues found to export" });
    }

    const fields = [
      { label: "Reported By", value: (row) => row.userId?.name || "N/A" },
      { label: "Email", value: (row) => row.userId?.email || "N/A" },
      { label: "Title", value: "title" },
      { label: "Description", value: "description" },
      { label: "Category", value: "category" },
      { label: "Status", value: "status" },
      {
        label: "Created At",
        value: (row) => new Date(row.createdAt).toLocaleString(),
      },
      { label: "Address", value: "location.address" },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(issues);

    res.header("Content-Type", "text/csv");
    res.attachment("issues.csv");
    return res.send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "Error exporting CSV" });
  }
});

module.exports = router;
