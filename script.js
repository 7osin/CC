async function fetchData() {
  const res = await fetch('https://your-vercel-endpoint.vercel.app/api/data');
  const data = await res.json();

  document.getElementById('blog-text').textContent = data.blog;
  document.getElementById('youtube-video').src = data.video;
}

fetchData();