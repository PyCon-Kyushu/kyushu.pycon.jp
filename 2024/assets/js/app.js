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
    showContent1() {
      this.content1Visible = true;
      this.content2Visible = false;
      this.content3Visible = false;
      this.content4Visible = false;
      this.content5Visible = false;
    },
    showContent2() {
      this.content1Visible = false;
      this.content2Visible = true;
      this.content3Visible = false;
      this.content4Visible = false;
      this.content5Visible = false;
    },
    showContent3() {
      this.content1Visible = false;
      this.content2Visible = false;
      this.content3Visible = true;
      this.content4Visible = false;
      this.content5Visible = false;
    },
    showContent4() {
      this.content1Visible = false;
      this.content2Visible = false;
      this.content3Visible = false;
      this.content4Visible = true;
      this.content5Visible = false;
    },
    showContent5() {
      this.content1Visible = false;
      this.content2Visible = false;
      this.content3Visible = false;
      this.content4Visible = false;
      this.content5Visible = true;
    },
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
    openTimetableModal(talk) {
      console.log('openTimetableModal is called');
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
    talkLevelElement.textContent = talk.level;
    talkLevelElement.classList.add('talk-' + talk.level);
    div.querySelector('h2').textContent = talk.title;
    div.querySelector('p').textContent = talk.name;
    div.querySelector('.btn.btn-primary').textContent = talk.buttonText;
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
