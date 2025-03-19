require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Thư viện mã hóa mật khẩu
const path = require('path');

const app = express();

// Middleware
app.use(express.json()); // Xử lý dữ liệu JSON
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu form-urlencoded
app.use(express.static('public')); // Cung cấp file tĩnh từ thư mục 'public'

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' Kết nối MongoDB thành công'))
.catch(err => console.error(' Lỗi kết nối MongoDB:', err));

// Tạo Schema và Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String 
    
});

const User = mongoose.model('User', userSchema);

// Route đăng ký tài khoản
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email đã tồn tại!' });
        }

        // Lưu người dùng mới vào MongoDB mà không mã hóa mật khẩu
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ success: true, message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra!' });
    }
});


// Route đăng nhập
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Tài khoản không tồn tại!' });
        }

        // So sánh trực tiếp mật khẩu nhập vào với mật khẩu trong database
        if (user.password !== password) {
            return res.json({ success: false, message: 'Mật khẩu không đúng!' });
        }

        res.json({ success: true, message: 'Đăng nhập thành công!' });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra!' });
    }
});


// Route trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/log_in.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
