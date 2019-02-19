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