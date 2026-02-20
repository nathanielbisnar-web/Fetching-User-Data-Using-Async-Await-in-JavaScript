const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';
const userEl = document.getElementById('user');
const refreshBtn = document.getElementById('refresh');

async function fetchUser() {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showLoading() {
  userEl.innerHTML = '<p class="loading">Loading user...</p>';
}

function showError(err) {
  userEl.innerHTML = `<p class="error">Error: ${escapeHtml(err.message)}</p>`;
}

function showUser(user) {
  userEl.innerHTML = `
    <p><strong>Name:</strong> ${escapeHtml(user.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
    <p><strong>City:</strong> ${escapeHtml(user.address.city)}</p>
  `;
}

async function load() {
  try {
    showLoading();
    const user = await fetchUser();
    showUser(user);
  } catch (err) {
    showError(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refreshBtn.addEventListener('click', load);
  load();
});