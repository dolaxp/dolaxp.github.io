document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginErrorDiv = document.getElementById("loginError");

    // --- بيانات الاعتماد (يمكن تغييرها هنا) ---
    const correctUsername = "admin";
    const correctPassword = "123123123";
    // ----------------------------------------

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // منع إرسال النموذج الافتراضي

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        loginErrorDiv.textContent = ""; // مسح أي رسائل خطأ سابقة

        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            // تسجيل الدخول ناجح
            // يمكنك استخدام sessionStorage أو localStorage لتذكر حالة تسجيل الدخول إذا أردت
            // sessionStorage.setItem('isLoggedIn', 'true'); 
            
            // إعادة التوجيه إلى صفحة الهبوط الرئيسية
            window.location.href = "main.html"; 
        } else {
            // تسجيل الدخول فشل
            loginErrorDiv.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
            // اختياري: هز النموذج للإشارة إلى الخطأ
            const loginContainer = document.querySelector('.login-container');
            if (loginContainer) {
                loginContainer.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    loginContainer.style.animation = '';
                }, 500);
            }
        }
    });
});

// Optional: Add shake animation CSS (can be added to the main style.css or inline here)
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}
`;
document.head.appendChild(style);

