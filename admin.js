import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6KsEukf_ZCLihRGNIdHjxJsQa5zTIdj4",
  authDomain: "my-blog-project-78b84.firebaseapp.com",
  databaseURL: "https://my-blog-project-78b84-default-rtdb.firebaseio.com",
  projectId: "my-blog-project-78b84",
  storageBucket: "my-blog-project-78b84.firebasestorage.app",
  messagingSenderId: "531624482514",
  appId: "1:531624482514:web:17e25835a98587eb07ff0b",
  measurementId: "G-E57HREWSL0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// تحقق من تسجيل الدخول
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// حفظ البيانات عند الضغط على زر الحفظ
document.getElementById("save-btn").addEventListener("click", async () => {
  const blogText = document.getElementById("blog-input").value;
  const videoLink = document.getElementById("video-link").value;

  try {
    await set(ref(db), {
      blog: blogText,
      video: videoLink,
    });
    document.getElementById("status").textContent = "تم الحفظ بنجاح!";
  } catch (error) {
    document.getElementById("status").textContent = "حدث خطأ أثناء الحفظ.";
    console.error(error);
  }
});
