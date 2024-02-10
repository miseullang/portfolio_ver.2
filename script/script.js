// 토글 버튼 클릭하면 버튼 이동 light <=> dark
const modeToggle = document.querySelector(".modeToggle");
const toggleBut = document.querySelector(".toggleBut");
const wrap = document.querySelector(".wrap");
// 테두리 속성을 가지고 있는 요소를 선택
const borderColorEls = document.querySelectorAll(".borderColor");

modeToggle.addEventListener('click', colorToggle);

let toggleCount = 0;

function colorToggle() {
    const toggleArr = ['0', '50px'];
    toggleCount = 1 - toggleCount;
    toggleBut.style.left = toggleArr[toggleCount];

    const borderColor = (toggleArr[toggleCount] === '0') ? '#111' : '#ffffff';

    // 토글버튼 위치가 0이면 라이트 모드, 50이면 다크모드
    if (toggleArr[toggleCount] === '0') {
        // 라이트 모드 스타일
        wrap.style.backgroundColor = '#ffffff';  // 배경색
        wrap.style.color = '#111';  // 폰트 색상

        borderColorEls.forEach(element => {
            element.style.borderColor = borderColor;
        });
    } else {
        // 다크 모드 스타일
        wrap.style.backgroundColor = '#111';  // 배경색
        wrap.style.color = '#ffffff';  // 폰트 색상

        borderColorEls.forEach(element => {
            element.style.borderColor = borderColor;
        });
    }
}

// 메인페이지 감지시 텍스트 애니메이션 동작하기
const mainPage = document.querySelector(".mainPage");
const blackTxts = document.querySelectorAll(".blackTxt");
// 1. 메인페이지 이외의 모든 페이지에서만 fixButWrap 보이기
const fixButWrap = document.querySelector(".fixButWrap");

const mainTextObserver = new IntersectionObserver(
  (Texts) => {
    Texts.forEach((blackTxt) => {
      if(blackTxt.isIntersecting) {
        blackTxt.target.style.animation = "textFlow 5s";
        fixButToggle("hidden",0);
      } else {
        blackTxt.target.style.animation = "none";
        fixButToggle("visible",1);
      }
    })
})

function fixButToggle(visibility,opacity) {
  fixButWrap.style.visibility = visibility;
  fixButWrap.style.opacity = opacity;
}

blackTxts.forEach((blackTxt) => mainTextObserver.observe(blackTxt));

// 숨김메뉴 ===============================================================
// 고정메뉴의 버튼을 클릭했을 때 숨김메뉴 나타나기
const hideMenuBut = document.querySelector(".hideMenuBut");
const hiddenMenuWrap = document.querySelector(".hiddenMenuWrap");
let ButCount = 0;

// 초기에 hiddenMenuWrap를 숨김 상태로 설정
hiddenMenuWrap.style.visibility = "hidden";

hideMenuBut.addEventListener('click', hiddenMenuToggle);
function hiddenMenuToggle() {
  const visibilityArr = ["hidden","visible"];
  ButCount = 1 - ButCount;
  hiddenMenuWrap.style.visibility = visibilityArr[ButCount]
  // hiddenMenuWrap의 자식 요소들에 대해서도 visibility 설정
  const hiddenHeaders = hiddenMenuWrap.querySelectorAll(".hiddenHeader");
  hiddenHeaders.forEach(hiddenHeader => {
    hiddenHeader.classList.remove("clickHeaderWidth");
    hiddenHeader.classList.remove("otherHeaderWidth");
    hiddenHeader.classList.remove("headerWidth");
  });
  const hiddenMenus = hiddenMenuWrap.querySelectorAll(".hiddenMenu");
  hiddenMenus.forEach(hiddenMenu => {
    hiddenMenu.classList.remove("headerWidth");
  });

  const hiddenConBoxs = hiddenMenuWrap.querySelectorAll(".hiddenConBox");
  hiddenConBoxs.forEach(hiddenConBox => {
    hiddenConBox.classList.remove("conBoxOpen");
  });

}




// 숨김메뉴의 hiddenMenu를 클릭하면
// 해당 hiddenMenu는 윈도우 크기의 50%, 나머지 hiddenMenu는 50%/3

const hiddenMenus = document.querySelectorAll(".hiddenMenu");
let clickCount = 0;
let prevClickedMenu;

hiddenMenus.forEach(hiddenMenu => {
  hiddenMenu.addEventListener('click', (event) => {
    const clickedHeader = event.currentTarget;

    // 이전에 클릭된 hiddenMenu가 있으면 해당 hiddenMenu의 클래스를 제거
    if (prevClickedMenu && prevClickedMenu !== clickedHeader) {
      prevClickedMenu.classList.remove("headerWidth");
      prevClickedMenu.querySelector(".hiddenHeader").classList.remove("clickHeaderWidth");
      prevClickedMenu.querySelector(".hiddenConBox").classList.remove("conBoxOpen");
      prevClickedMenu.querySelector(".hiddenHeader").classList.remove("otherHeaderWidth");
    }

    // 나머지 hiddenMenu의 너비를 (윈도우 너비 - 클릭된 hiddenMenu의 너비) / 3 로 설정
    hiddenMenus.forEach(Menu => {
      if (Menu !== clickedHeader) {
        Menu.querySelector(".hiddenHeader").classList.add("otherHeaderWidth");
      } 
      else {
        Menu.querySelector(".hiddenHeader").classList.remove("otherHeaderWidth");
      }
    });

    if (clickCount === 0 || prevClickedMenu !== clickedHeader) {
      // 클릭된 hiddenMenu의 너비를 50vw로 설정
      clickedHeader.classList.add("headerWidth");
      // 클릭된 hiddenMenu의 자식 hiddenHeader를 선택하여 너비 조정
      clickedHeader.querySelector(".hiddenHeader").classList.add("clickHeaderWidth");
      // 클릭된 hiddenMenu의 자식 hiddenConBox를 열기
      clickedHeader.querySelector(".hiddenConBox").classList.add("conBoxOpen");

      // 이전에 클릭된 hiddenMenu 갱신
      prevClickedMenu = clickedHeader;
      clickCount = 1;
    } else if (clickCount === 1 && prevClickedMenu === clickedHeader) {
      // 클릭된 hiddenMenu의 너비를 원래대로
      clickedHeader.classList.remove("headerWidth");
      // 클릭된 hiddenMenu의 자식 hiddenHeader의 너비를 원래대로
      clickedHeader.querySelector(".hiddenHeader").classList.remove("clickHeaderWidth");
      // 클릭된 hiddenMenu의 자식 hiddenConBox를 닫기
      clickedHeader.querySelector(".hiddenConBox").classList.remove("conBoxOpen");
      clickedHeader.querySelector(".hiddenHeader").classList.remove("otherHeaderWidth");
      
      // 이전에 클릭된 hiddenMenu 제거
      prevClickedMenu = null;
      clickCount = 0;
    }
  });
});



// 숨김메뉴 끝 ===============================================================


// 어바웃페이지 진입&퇴장시 어바웃타이틀 애니메이션 효과
const aboutPage = document.querySelector(".aboutPage")
const aboutTitle = document.querySelector(".aboutTitle");

const aboutPageObserver = new IntersectionObserver(
  (texts) => {
    texts.forEach((txt) => {
        if(txt.isIntersecting) {
          aboutTitle.classList.add("visible");
        } else {
          aboutTitle.classList.remove("visible");

        }
    });

}
)
aboutPageObserver.observe(aboutPage);

// 어바웃페이지 카드 플립 스크롤 효과
class CardFlipOnScroll {
    constructor(wrapper, sticky) {
      this.wrapper = wrapper
      this.sticky = sticky
      this.cards = sticky.querySelectorAll('.card')
      this.length = this.cards.length

      this.start = 0
      this.end = 0
      this.step = 0
    }

    init() {
      this.start = this.wrapper.offsetTop - 100
      this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2
      this.step = (this.end - this.start) / (this.length * 2)
    }

    animate() {
      this.cards.forEach((card, i) => {
        const s = this.start + this.step * i
        const e = s + this.step * (this.length + 1)

        if (scrollY <= s) {
          card.style.transform = `
            perspective(100vw)
            translateX(100vw) 
            rotateY(180deg)
          `
        } else if (scrollY > s && scrollY <= e - this.step) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
            rotateY(180deg)
          `
        } else if (scrollY > e - this.step && scrollY <= e) {
          card.style.transform = `
            perspective(100vw)
            translateX(${100 + (scrollY - s) / (e - s) * -100}vw)
            rotateY(${180 + -(scrollY - (e - this.step)) / this.step * 180}deg)
          `
        } else if (scrollY > e) {
          card.style.transform = `
            perspective(100vw)
            translateX(0vw) 
            rotateY(0deg)
          `
        }
      })
    }
  }

  const sticky = document.querySelector('.sticky')
  const cardFlipOnScroll = new CardFlipOnScroll(aboutPage, sticky)
  cardFlipOnScroll.init()

  window.addEventListener('scroll', () => {
    cardFlipOnScroll.animate()
  })

  window.addEventListener('resize', () => {
    cardFlipOnScroll.init()
  })

  // 스킬페이지 아코디언 메뉴 : 스킬탭을 클릭하면
  const skillTabs = document.querySelectorAll(".skillTab");
  const skillTabIcons = document.querySelectorAll(".skillTab i");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 모든 skillTab의 높이를 160px로 설정
      skillTabs.forEach((t) => {
        t.classList.remove("active");
      });

      // 클릭된 skillTab의 높이를 480px로 설정
      this.classList.add("active");
    });
  });

  skillTabIcons.forEach((icon, index) => {
    icon.addEventListener("click", function () {
      // 클릭된 skillTab i를 토글로 바꾸기
      this.textContent = (this.textContent === "+" ? "-" : "+");
  
      // 다른 skillTab i를 +로 바꾸기
      skillTabIcons.forEach((i, iIndex) => {
        if (iIndex !== index) {
          i.textContent = "+";
        }
      });
  
      // 클릭된 skillTab의 높이를 480px로 설정
      skillTabs.forEach((t, tIndex) => {
        t.classList.toggle("active", tIndex === index);
      });
    });
  });

// 포트폴리오 페이지 진입시 타이틀 애니메이션 동작
const portfolioPage = document.querySelector(".portfolioPage");
const portfolioTitles = document.querySelectorAll(".portfolioTitle span");

const portfolioObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("portActive");
            } else {
                entry.target.classList.remove("portActive");
            }
        });
    }
);

portfolioTitles.forEach((title) => { portfolioObserver.observe(title);});

// 개인 포트폴리오페이지 스와이퍼 ==========================
const personalSwiper = new Swiper('.personalPage .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, //버튼 클릭 여부
    type: 'fraction', //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  slidesPerView:"auto" //css에 지정한 슬라이더 크기 사용
});

// 팀 포트폴리오페이지 폴더스크롤 =================================================
class FolderScroll {
  // teamPage, stickyBox를 this로 전달하기
  constructor(teamPage, stickyBox) {
    this.teamPage = teamPage
    this.stickyBox = stickyBox
    this.inSections = this.stickyBox.querySelectorAll(".inSection")
    this.length = this.inSections.length
    this.headerHeight = (window.innerWidth <= 649) ? 12 : 6; // 인섹션 헤더 높이 (모바일에서는 10vh)
    this.contentHeight = 100 - this.headerHeight * this.length
    //헤더 높이*갯수 뺀 만큼을 내용 영역으로 갖기
    this.start = 0
    this.end = 0
  }

  // 초기값 설정
  initialization() {
    // 100 : 화면진입시 애니메이션이 바로 실행되지 않게 하기 위한 딜레이값
    this.start = this.teamPage.offsetTop + 100
    // 시작점 = 윈도우 시작점부터 컨텐츠 최상위 부모 시작점까지의 거리
    this.end = this.teamPage.offsetTop + this.teamPage.offsetHeight - innerHeight - 100
    // 끝잠 = 시작점 + 팀 포폴 페이지 높이 - 한 페이지의 높이(화면길이)

    this.inSections.forEach((inSection, i) => {
      inSection.style.bottom = -(100 - this.headerHeight * (this.length - i)) + 'vh'
      // 하나의 컨텐츠 페이지 시작점 : 100vh - 헤더 높이*(페이지 개수 - 인덱스번호)
      // => 화면에서 타이틀이 보이도록 지정
      inSection.querySelector('.projectTitle').style.height = this.headerHeight + 'vh'
      // 정의한 타이틀의 높이를 css 적용
      inSection.querySelector('.projectContent').style.height = this.contentHeight + 'vh'
      // 정의한 콘텐츠의 높이를 css 적용
    })
  }

  //애니메이션 동작
  animation() {
    this.inSections.forEach((inSection, i) => {
      // 전체 애니메이션 길이 : this.end - this.start
      // 각 콘텐츠별 애니메이션 길이 : 전체 애니메이션 길이 / 콘텐츠 갯수
      const unit = (this.end - this.start) / this.length
      const unitStart = this.start + unit * i + 100 // 100 : 섹션별 애니메이션 딜레이값
      // 각 유닛의 시작지점 : 전체 시작지점 + 유닛 길이
      const unitEnd = this.start + unit * (i + 1)
      // 각 유닛의 끝지점 : 앞 번호의 유닛이 끝난 자리 => 인덱스+1

      if (scrollY <= unitStart) {
        inSection.style.transform = `translate3d(0, 0, 0)`
        // 시작값
      } else if (scrollY >= unitEnd) {
        inSection.style.transform = `translate3d(0, ${-this.contentHeight}%, 0)`
        // 끝값
      } else {
        inSection.style.transform = `translate3d(0, ${(scrollY - unitStart) / (unit - 100) * (-this.contentHeight)}%, 0)`
        // 시작 <=> 끝 사이
        // 컨텐츠 영역에서의 위치 : (현재 스크롤값 - 유닛의 시작지점) / 유닛 길이 => 0 ~ 1 사이의 소수점 => 컨텐츠 영역 내에서 몇 퍼센트인지
        // (unit - 100) => 100 : 섹션별 애니메이션 딜레이값 
      }
    })
  }
}

const teamPage = document.querySelector(".teamPage");
const stickyBox = document.querySelector(".stickyBox");
const folderScroll = new FolderScroll(teamPage, stickyBox)
folderScroll.initialization() //초기값 호출

//스크롤시 애니메이션 실행
window.addEventListener('scroll', () => {
  folderScroll.animation()
})
// 윈도우 리사이즈시 초기값 다시 가져오기
window.addEventListener('resize', () => {
  folderScroll.initialization()
})
// 팀 포트폴리오페이지 폴더스크롤 끝 =================================================


// E-mail p태그 클릭하면 클립보드에 복사하기
function copyEmail() {
  // 복사할 이메일 주소를 가져옴
  const email = "yuio3619@naver.com"

  // 텍스트를 클립보드에 복사
  navigator.clipboard.writeText(email);

  // 복사되었다는 메시지를 표시
  alert("이메일 주소가 복사되었습니다: " + email);
}


// 팝업창
const notice = document.querySelector(".notice");
notice.addEventListener('click',() => {
  notice.style.display = "none"
})