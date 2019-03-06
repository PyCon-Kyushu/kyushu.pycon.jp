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
}
axios.get('sponsors.json').then(function(res) {
  var ranks = {
    'platinum': 'プラチナ',
    'gold': 'ゴールド',
    'silver': 'シルバー',
  };
  var ul = document.querySelector('#sponsors > ul');
  for (var rank of ['platinum', 'gold', 'silver']) {
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
});