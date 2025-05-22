import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.getElementById("save-btn").addEventListener("click", async () => {
  const blogText = document.getElementById("blog-input").value;
  const videoLinkInput = document.getElementById("video-link").value;
  const videoFileInput = document.getElementById("video-file").files[0];

  let videoUrl = videoLinkInput; // الرابط الافتراضي من اليوتيوب

  if (videoFileInput) {
    // إذا رفع ملف فيديو، نرفعه على Firebase Storage
    const storageRef = sRef(storage, `videos/${videoFileInput.name}`);
    try {
      await uploadBytes(storageRef, videoFileInput);
      videoUrl = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("خطأ في رفع الفيديو:", error);
      document.getElementById("status").textContent = "فشل رفع الفيديو.";
      return;
    }
  }

  // حفظ النص والرابط (سواء يوتيوب أو رابط الفيديو المرفوع)
  try {
    await set(ref(db), {
      blog: blogText,
      video: videoUrl,
    });
    document.getElementById("status").textContent = "تم الحفظ بنجاح!";
  } catch (error) {
    console.error("خطأ في حفظ البيانات:", error);
    document.getElementById("status").textContent = "حدث خطأ أثناء الحفظ.";
  }
});