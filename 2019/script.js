function StickyNavbar(elem, className) {
  var html = window.document.documentElement;
  var body = window.document.body;
  window.document.addEventListener('scroll', function() {
    var scrollTop = body.scrollTop || html.scrollTop;
    if (scrollTop < elem.offsetTop) {
      elem.classList.remove(className);
    } else {
      elem.classList.add(className);
    }
  });
}

// スクロールするとメニューが張り付いてくるやつ
new StickyNavbar(window.document.querySelector('body > nav'), "fixed");

// ページ内リンクをスクロールするやつ
new SmoothScroll('a[href*="#"]', { offset: 100 });

// スマホメニュー
var menuModal = new PureModal(window.document.getElementById('nav-modal'));

window.document.getElementById('nav-button-open').addEventListener('click', function(event) {
  event.preventDefault();
  menuModal.open();
});

// タイムテーブル
var timetableModal = new PureModal(window.document.getElementById('timetable-modal'));
function openTimetableModal(event) {
  timetableModal.elem.querySelector('.talk-title').textContent = this.title;
  timetableModal.elem.querySelector('.talk-speaker').textContent = this.name;
  if (this.url)
    timetableModal.elem.querySelector('.talk-speaker').href = this.url;
  else
    timetableModal.elem.querySelector('.talk-speaker').removeAttribute('href');
  timetableModal.elem.querySelector('.talk-description').innerHTML = this.description.replace(/\n/g, '<br />');
  timetableModal.elem.querySelector('.talk-language').textContent = '日本語';
  timetableModal.open();
  // モダーダル内のスクロール位置をリセットする
  timetableModal.elem.querySelector('.window > div').scrollTop = 0;
}
axios.get('talks.json').then(function(res) {
  var table = document.querySelector('#timetable table');
  for (var talk of res.data) {
    var td = table.getElementsByClassName('talk-' + talk.id)[0];
    if (!td) {
      console.warn('Talk element "' + talk.id + '" is not found');
      continue;
    }
    td.textContent = talk.title;
    var small = document.createElement('small');
    small.textContent = talk.name;
    td.appendChild(small);
    td.addEventListener('click', openTimetableModal.bind(talk));
  }
});

// スポンサー
var sponsorModal = new PureModal(window.document.getElementById('sponsor-modal'));
function openSponsorModal(event) {
  sponsorModal.elem.querySelector('.sponsor-name').textContent = this.name;
  var description = this.description
    .replace(/\n/g, '<br />')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  sponsorModal.elem.querySelector('.sponsor-description').innerHTML = description;
  sponsorModal.elem.querySelector('.sponsor-link a').textContent = this.url;
  sponsorModal.elem.querySelector('.sponsor-link a').href = this.url;
  sponsorModal.open();
  // モダーダル内のスクロール位置をリセットする
  sponsorModal.elem.querySelector('.window > div').scrollTop = 0;
}
axios.get('sponsors.json').then(function(res) {
  var ranks = {
    'platinum': 'プラチナ',
    'gold': 'ゴールド',
    'silver': 'シルバー',
    'community': 'コミュニティ',
  };
  var ul = document.querySelector('#sponsors > ul');
  // 企業スポンサー
  for (var rank of ['platinum', 'gold', 'silver', 'community']) {
    var li = document.createElement('li');
    li.classList.add(rank);
    ul.appendChild(li);
    var h3 = document.createElement('h3');
    h3.textContent = ranks[rank] + 'スポンサー';
    li.appendChild(h3);
    var ul2 = document.createElement('ul');
    li.appendChild(ul2);
    for (var sponsor of res.data[rank]) {
      var li2 = document.createElement('li');
      li2.style.backgroundImage = 'url(images/sponsors/' + sponsor.logo + ')';
      li2.addEventListener('click', openSponsorModal.bind(sponsor));
      ul2.appendChild(li2);
    }
  }
  // パトロン
  var li = document.createElement('li');
  li.classList.add('patron');
  ul.appendChild(li);
  var h3 = document.createElement('h3');
  h3.textContent = 'パトロン (個人スポンサー)';
  li.appendChild(h3);
  var ul2 = document.createElement('ul');
  li.appendChild(ul2);
  for (var patron of res.data.patron) {
    var li2 = document.createElement('li');
    li2.style.backgroundImage = 'url(images/patron/' + patron.icon + ')';
    ul2.appendChild(li2);
    var a = document.createElement('a');
    a.href = patron.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li2.append(a);
    var span = document.createElement('span');
    span.classList.add('tooltip');
    span.textContent = patron.name;
    li2.append(span);
  }
});

// スタッフ
axios.get('staff.json').then(function(res) {
  var ul = document.querySelector('#staff > ul');
  for (var staff of res.data) {
    var li = document.createElement('li');
    li.style.backgroundImage = 'url(images/staff/' + staff.icon + ')';
    li.classList.add('staff-icon');
    ul.appendChild(li);
    var a = document.createElement('a');
    a.href = staff.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li.append(a);
    var span = document.createElement('span');
    span.classList.add('tooltip');
    span.textContent = staff.name;
    li.append(span);
  }
});