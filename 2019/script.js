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
axios.get('sponsors.json').then(function(res) {
  var target = document.querySelector('#sponsors > div');
  var ranks = {
    'platinum': 'プラチナ',
    'gold': 'ゴールド',
    'silver': 'シルバー',
  };
  for (var rank of ['platinum', 'gold', 'silver']) {
    var div = document.createElement('div');
    div.classList.add(rank);
    target.appendChild(div);
    var h3 = document.createElement('h3');
    h3.textContent = ranks[rank] + 'スポンサー';
    div.appendChild(h3);
    var ul = document.createElement('ul');
    div.appendChild(ul);
    for (var sponsor of res.data[rank]) {
      var li = document.createElement('li');
      li.style.backgroundImage = 'url(images/sponsors/' + sponsor.logo + ')';
      ul.appendChild(li);
    }
  }
});