const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
  if (!username.value) return alert('사용자 이름을 입력해 주세요.');
  if (!password.value) return alert('비밀번호를 입력해 주세요.');

  const loginAPI = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(new login()),
  });

  const result = await loginAPI.json();

  if (result.loginSuccess === true) {
    window.location.reload();
  } else {
    alert('사용자 이름 혹은 패스워드가 일치하지 않습니다.');
  }
});

username.addEventListener('keyup', async (e) => {
  if (e.keyCode === 13) return loginBtn.click();
});

password.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) return loginBtn.click();
});

class login {
  constructor() {
    this.name = username.value;
    this.password = password.value;
  }
}
