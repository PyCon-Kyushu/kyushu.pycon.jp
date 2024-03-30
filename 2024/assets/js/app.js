const app = Vue.createApp({
  data() {
    return {
      isOpen: false,
      content1Visible: true,
      content2Visible: false,
      content3Visible: false,
      content4Visible: false,
      content5Visible: false,
      timetable: [],
      showModal: false,
      showSponsorModal: false,
      selectedSponsor: null,
      selectedTalk: null,
      message: null,
      param: null,
      language: 'jp',
      jp: {
        buttonLabel: 'Switch to English'
      },
      en: {
        buttonLabel: '日本語に切り替え'
      }
    };
  },
  created() {
    window.addEventListener('resize', this.checkWidth);
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('param');
    this.param = param;
    this.showContent(param);
    this.checkWidth();
    fetch('./assets/json/talks.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.timetable = data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWidth);
  },
  computed: {
    buttonLabel() {
      return this[this.language].buttonLabel;
    }
  },
  methods: {
    checkWidth() {
      if (window.innerWidth < 1024) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    showContent(mode) {
      this.content1Visible = false;
      this.content2Visible = false;
      this.content3Visible = false;
      this.content4Visible = false;
      this.content5Visible = false;
      switch (mode) {
        case 'Sessions':
          this.content2Visible = true;
          break;
        case 'TimeTable':
          this.content3Visible = true;
          break;
        case 'CoC':
          this.content5Visible = true;
          break;
        default:
          this.content1Visible = true;
          mode = '';
          break;
      }
      const newUrl = new URL(window.location.href);
      if (mode !== '') {
        newUrl.searchParams.set('param', mode);
      } else {
        newUrl.searchParams.delete('param');
      }
      window.history.pushState({}, '', newUrl);
    },
    translateLevel: translateLevel,
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      if (window.innerWidth <= 768) {
        this.isOpen = false;
      }
    },
    truncate(string, value) {
      return string.substring(0, value) + '...';
    },
    linkify(inputText) {
      let replacedText, replacePattern1, replacePattern2, replacePattern3;
  
      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
  
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
  
      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
  
      return replacedText;
    },
    openSessionModal(talk) {
      console.log('openSessionModal is called');
      this.selectedTalk = talk;
      this.showModal = true;
    },
    openTimetableModal(id) {
      console.log('openTimetableModal is called');
      const talk = this.timetable.find(t => t.id === id);
      this.selectedTalk = talk;
      this.showModal = true;
    },
    openSponsorModal(sponsor) {
      console.log('openSponsorModal is called');
      this.selectedSponsor = sponsor;
      this.showSponsorModal = true;
    },
    switchLanguage() {
      this.language = this.language === 'jp' ? 'en' : 'jp';
    }
    ,
  },
});
const vm = app.mount('#app');
window.app = vm;

axios.get('./assets/json/talks.json').then(function (res) {
  for (let i in res.data) {
    const talk = res.data[i];
    let div = document.getElementById(talk.id);
    if (!div) {
      console.warn('Talk element "' + talk.id + '" is not found');
      continue;
    }
    let talkLevelElement = div.querySelector('.talk-level');
    let levelText = translateLevel(talk.level);
    talkLevelElement.textContent = levelText;
    talkLevelElement.classList.add('talk-' + talk.level);
    div.querySelector('h2').textContent = talk.title;
    div.querySelector('h3').textContent = talk.subTitle;
    div.querySelector('p').innerHTML = talk.name;
    div.querySelector('.btn.btn-primary').textContent = talk.buttonText;
    div.addEventListener('click', function() {
      vm.openTimetableModal(this.id);
    });
  }
});

axios.get('assets/json/sponsors.json').then(function(res) {
var ranks = {
  'platinum': 'プラチナ',
  'gold': 'ゴールド',
  'silver': 'シルバー',
  'community': 'コミュニティー',
};
var ul = document.querySelector('#sponsorlist');
// 企業スポンサー
var arr = ['gold', 'silver'];
for (var i in arr) {
  var rank = arr[i];
  var li = document.createElement('div');
  li.classList.add(rank);
  li.classList.add('mb-5');
  ul.appendChild(li);
  ul.classList.add('py-10');
  var h3 = document.createElement('h3');
  h3.classList.add('text-2xl', 'font-bold', 'mb-4', 'text-center');
  if (rank == 'community') {
      h3.textContent = ranks[rank] + '紹介';
  } else {
      h3.textContent = ranks[rank] + 'スポンサー';
  }
  li.appendChild(h3);
  var ul2 = document.createElement('div');
  li.appendChild(ul2);
  ul2.classList.add('flex', 'flex-wrap', 'justify-center');
  for (var j in res.data[rank]) {
    var sponsor = res.data[rank][j];
    var li2 = document.createElement('div');
    li2.classList.add('flex', 'justify-center', 'items-center');
    if (sponsor.logo) {
        var img = document.createElement('img');
        if (rank == 'gold') {
            img.classList.add('mb-4', 'mx-4');
            img.style.width = '320px';
            img.style.objectFit = 'cover';
        }
        if (rank == 'silver') {
            img.classList.add('mb-4', 'mx-4');
            img.style.width = '120px';
            img.style.objectFit = 'cover';
        }
        img.src = 'assets/images/sponsors/' + sponsor.logo;
        img.addEventListener('click', (function(sponsor) {
            return function() {
                window.app.openSponsorModal(sponsor);
            };
        })(sponsor));
        img.alt = 'Logo 1';
        li2.appendChild(img);
    }
    ul2.appendChild(li2);
  }
}
});

function translateLevel(level) {
  switch (level) {
    case 'Beginner':
      return '初級';
    case 'Intermediate':
      return '中級';
    case 'Advanced':
      return '上級';
    default:
      return level;
  }
}