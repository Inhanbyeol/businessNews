window.addEventListener('load', async () => {
  const teamName = document.getElementById('teamName');
  const teamUrl = document.getElementById('teamURL');
  const LDname = document.getElementById('LDname');
  const LDphone = document.getElementById('LDphone');
  const LDemail = document.getElementById('LDemail');
  const SLDname = document.getElementById('SLDname');
  const SLDphone = document.getElementById('SLDphone');
  const SLDemail = document.getElementById('SLDemail');
  const opentalkURL = document.getElementById('opentalkURL');
  const opentalkcode = document.getElementById('opentalkcode');
  const opentalknick = document.getElementById('opentalknick');
  const About = await ClassicEditor.create(document.querySelector('#Abouteditor'));
  const Regulation = await ClassicEditor.create(document.querySelector('#Regulationeditor'));

  const api = await fetch('/pageadmin/edt');
  const result = await api.json();

  About.setData(result.about);
  Regulation.setData(result.regulation);
  teamUrl.value = `${window.location.origin}/page/${result.pageid}`;

  document.querySelector('#createBtn').addEventListener('click', async () => {
    const saveAPI = await fetch('/pageadmin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new pagedata()),
    });

    const result = await saveAPI.json();

    if (result.affectedRows == 1) {
      alert('수정이 완료되었습니다.');
      window.location.reload();
    } else {
      alert('오류가 발생하였씁니다.');
      console.log(result);
    }
  });

  class pagedata {
    constructor() {
      this.team = teamName.value;

      this.leadername = LDname.value;
      this.leaderphone = LDphone.value;
      this.leaderemail = LDemail.value;

      this.subleadername = SLDname.value;
      this.subleaderphone = SLDphone.value;
      this.subleaderemail = SLDemail.value;

      this.opentalkurl = opentalkURL.value;
      this.opentalk = opentalknick.value;
      this.opentalkcode = opentalkcode.value;

      this.about = About.getData();
      this.regulation = Regulation.getData();
    }
  }
});
