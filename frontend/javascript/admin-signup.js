const form = document.getElementById('admin-signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    username: form.name.value,   // backend expects username
    email: form.email.value,
    password: form.password.value,
    phone: form.phone.value,
    address: form.address.value,
    role: 'admin'               // mark as admin
  };

  try {
    const res = await fetch('http://localhost:5000/api/register', { // backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save JWT in localStorage
      localStorage.setItem('token', data.token);

      alert('Account created successfully!');

      // ✅ Redirect based on role
      if (data.user.role === 'admin') {
        window.location.href = '/frontend/admin/admin-dashboard.html';
      } else {
        window.location.href = '/frontend/volunteer/volunteer-dashboard.html';
      }

    } else {
      alert(data.message || 'Failed to create account!');
    }

  } catch (err) {
    console.error(err);
    alert('Cannot connect to backend!');
  }
});