import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6KsEukf_ZCLihRGNIdHjxJsQa5zTIdj4",
  authDomain: "my-blog-project-78b84.firebaseapp.com",
  databaseURL: "https://my-blog-project-78b84-default-rtdb.firebaseio.com",
  projectId: "my-blog-project-78b84",
  storageBucket: "my-blog-project-78b84.appspot.com",
  messagingSenderId: "531624482514",
  appId: "1:531624482514:web:17e25835a98587eb07ff0b",
  measurementId: "G-E57HREWSL0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storageRef = ref(storage, 'videos/' + file.name);


document.getElementById("status").textContent = "";

window.saveData = async function () {
  const blog = document.getElementById("blog-input").value;
  const videoLink = document.getElementById("video-link").value;
  const fileInput = document.getElementById("video-file");
  const status = document.getElementById("status");

  status.textContent = "جاري الحفظ...";

  let finalVideoURL = videoLink;

  // إذا تم رفع ملف فيديو
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const storageRef = sRef(storage, 'videos/' + file.name);
    try {
      await uploadBytes(storageRef, file);
      finalVideoURL = await getDownloadURL(storageRef);
    } catch (err) {
      status.textContent = "فشل رفع الفيديو: " + err.message;
      return;
    }
  }

  // حفظ البيانات في قاعدة البيانات
  try {
    await set(ref(db), {
      blog: blog,
      video: finalVideoURL
    });
    status.textContent = "تم الحفظ بنجاح!";
  } catch (err) {
    status.textContent = "حدث خطأ أثناء الحفظ: " + err.message;
  }
};
