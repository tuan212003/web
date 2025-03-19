const registrantionButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const container = document.getElementById('container');

registrantionButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn chặn tải lại trang

    // Lấy giá trị từ các input trong form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify({ email, password }) // Chuyển đổi object thành JSON
        });

        const result = await response.json(); // Chuyển đổi kết quả thành JSON

        if (result.success) {
            window.location.href = '/home'; // Chuyển hướng nếu đăng nhập thành công
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi khi gửi form:", error);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn chặn tải lại trang

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify({email, password }) // Chuyển đổi object thành JSON
        });

        const result = await response.json(); // Chuyển đổi kết quả thành JSON

        if (result.success) {
            alert('Đăng ký thành công!');
            window.location.href = '/home'; // Chuyển hướng về trang đăng nhập
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Lỗi khi gửi form:", error);
    }
});
