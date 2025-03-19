const express = require("express");
const cors = require("cors"); // Import CORS
const path = require("path");

const app = express();
const PORT = 8000;

// ✅ Bật CORS để cho phép Unity WebGL tải dữ liệu từ server này
app.use(cors());

// ✅ Route mặc định để kiểm tra server hoạt động
app.get("/", (req, res) => {
    res.send("Server JSON đang chạy! 🟢");
});

// ✅ Phục vụ file JSON
app.get("/question.json", (req, res) => {
    res.setHeader("Content-Type", "database");
    res.sendFile(path.join(__dirname, "question.json"));
});

// ✅ Chạy server
app.listen(PORT, () => {
    console.log(`Server JSON chạy tại: http://localhost:${PORT}`);
});
