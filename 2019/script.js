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
if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function(s) { var el = this; do { if (el.matches(s)) return el; el = el.parentElement || el.parentNode; } while (el !== null && el.nodeType === 1); return null; };
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
  for (var i in res.data) {
    var talk = res.data[i];
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
  // URL にトークの個別ページの hash がついていたら、そのトークのモーダルを開く
  if (matched = location.hash.match(/^#(talk-.+)$/)) {
    location.hash = '#timetable';
    var td = table.getElementsByClassName(matched[1])[0];
    if (td) td.click();
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
  var arr = ['platinum', 'gold', 'silver', 'community'];
  for (var i in arr) {
    var rank = arr[i];
    var li = document.createElement('li');
    li.classList.add(rank);
    ul.appendChild(li);
    var h3 = document.createElement('h3');
    h3.textContent = ranks[rank] + 'スポンサー';
    li.appendChild(h3);
    var ul2 = document.createElement('ul');
    li.appendChild(ul2);
    for (var j in res.data[rank]) {
      var sponsor = res.data[rank][j];
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
  for (var i in res.data.patron) {
    var patron = res.data.patron[i];
    var li2 = document.createElement('li');
    li2.style.backgroundImage = 'url(images/patron/' + patron.icon + ')';
    ul2.appendChild(li2);
    var a = document.createElement('a');
    a.href = patron.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li2.appendChild(a);
    var span = document.createElement('span');
    span.classList.add('tooltip');
    span.textContent = patron.name;
    li2.appendChild(span);
  }
});

// スタッフ
axios.get('staff.json').then(function(res) {
  var ul = document.querySelector('#staff > ul');
  for (var i in res.data) {
    var staff = res.data[i];
    var li = document.createElement('li');
    li.style.backgroundImage = 'url(images/staff/' + staff.icon + ')';
    li.classList.add('staff-icon');
    ul.appendChild(li);
    var a = document.createElement('a');
    a.href = staff.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li.appendChild(a);
    var span = document.createElement('span');
    span.classList.add('tooltip');
    span.textContent = staff.name;
    li.appendChild(span);
  }
});