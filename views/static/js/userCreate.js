const username = document.getElementById('username');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const pageurl = document.getElementById('pageurl');
const createbtn = document.getElementById('createBtn');

createbtn.addEventListener('click', async () => {
  if (!username.value) return alert('사용자 이름을 입력해 주세요.');
  if (!password1.value) return alert('패스워드를 입력해 주세요.');
  if (!pageurl.value) return alert('사용할 url을 입력해 주세요.');
  if (!/^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/.test(username.value)) return alert('이름에는 한글과 영문만 가능합니다.');
  if (!/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(password1.value)) return alert('패스워드는 8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합해 주세요.');
  if (!/^[a-z]+[a-z0-9]{5,19}$/g.test(pageurl.value)) return alert('url은 영문자로 시작하는 영문자 또는 숫자 6~20자를 입력해 주세요.');
  if (!password2.value) return alert('패스워드를 한번 더 입력해 주세요.');
  if (password1.value !== password2.value) return alert('패스워드가 서로 일치하지 않습니다.');

  const createAPI = await fetch('/create/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(new create()),
  });

  const result = await createAPI.json();

  if (result[0].affectedRows == 1 && result[1].affectedRows == 1) {
    alert('계정이 생성되었습니다.');
    window.location.reload();
  } else {
    alert(result);
  }
});

class create {
  constructor() {
    this.name = username.value;
    this.password = password1.value;
    this.page = pageurl.value;
  }
}
