/* 

구현 샘플 스크립트 입니다.
오류가 있을 수 있습니다.
필요에 맞게 새로 작성해주세요.

*/

let wrap = document.querySelector(".wrap");
let headerWrap = document.querySelector(".header_wrap");
let containerWrap = document.querySelector(".container_wrap");
let section = document.querySelector("section.container");
let footerWrap = document.querySelector(".footer_wrap");

let windowPos = 0;
let containerPos = 0;

window.addEventListener('scroll', function(){
    windowPos = window.pageYOffset || window.scrollY;
    // console.log("windowPos : ", windowPos);
});

containerWrap.addEventListener('scroll', function(){
    containerPos = containerWrap.pageYOffset || containerWrap.scrollY;
    // console.log("containerWrap : ", containerWrap);
})





function fixedWrapSize(bloon){
    if(bloon) {
        // document.querySelector("html").removeAttribute("style");
        // document.querySelector("body").removeAttribute("style");
        // wrap.removeAttribute("style");
        // containerWrap.removeAttribute("style");

        document.querySelector("html").style.height = "";
        document.querySelector("body").style.height = "";
        wrap.style.height = "";
        containerWrap.style.height = "";
    } else if(!bloon) {
        document.querySelector("html").style.height = 100 + "%";
        document.querySelector("body").style.height = 100 + "%";
        wrap.style.height = 100 + "%";
        containerWrap.style.height = 100 + "%";
    } else {
        console.log("???")
    }
}


/* 전체 컨텐츠의 높이값이 화면보다 작은 경우 중간컨텐츠(container_wrap)의 최소 높이값 지정(높이값을 키운다) */
function fixedContainerSize(){
    wrap = document.querySelector(".wrap");
    headerWrap = document.querySelector(".header_wrap");
    containerWrap = document.querySelector(".container_wrap");
    section = document.querySelector("section.container");

    fixedWrapSize(true);
    if(section.clientHeight > containerWrap.clientHeight) {
        fixedWrapSize(true);
    } else if(wrap && wrap.clientHeight <= window.innerHeight){
        fixedWrapSize(false);
        if(headerWrap) {
            containerWrap.style.height = window.innerHeight - headerWrap.clientHeight + "px";
        } else {

        }
        containerWrap.style.height = window.innerHeight + "px";
        section.style.height = "100%";
	} else {
        containerWrap.style.backgroundColor = "";
    }
}
// fixedContainerSize();








function observerFn(ele){
    // 1. 대상 선정
    // 대상 node 선택
    const target = document.querySelector('.wrap');

    // 2. 옵저버 인스턴스 생성
    // 감시자 인스턴스 만들기
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // console.log(mutation.type);
            if(mutation.type == 'attributes') {
                // console.log("속성이 바뀌었다.")
            } else if (mutation.type == 'childList'){
                // console.log("항목이 삭제되거나 추가되었다.");
                fixedContainerSize();
            }
        });
    });

    // 3. 옵션 설정
    // 감시자의 설정:
    const config = {attributes:false, childList:true, characterData:false, subtree:true};
    // 4. 실행
    // 감시자 옵션 포함, 대상 노드에 전달
    observer.observe(target, config);
}
observerFn();





// let pos;

// window.addEventListener('scroll', function(){
// 	pos = window.scrollY;
// });




/* 목록 보기 필터 테스트 */
let list_select_wrap = document.querySelectorAll(".list_select_wrap");
if(list_select_wrap) {
    list_select_wrap.forEach(function(item){
        let btn_triger = item.querySelector("button.btn_triger");
        btn_triger.addEventListener("click", function(){
            btn_triger.classList.toggle("active");
            item.querySelector("ul").classList.toggle("active");
	    })    
    })
}
/* // 목록 보기 필터 테스트 */




$(".layer .btn_close, .layer .next").on("click", function(){
    $(this).parents(".layer").hide();
});





/* 공지사항, 자주하는 질문 내용(회색영역) 최소 높이값 */
const viewCon = document.querySelector(".view_con");
if(viewCon) {
	const bodyHeight = document.querySelector("body").offsetHeight;
	const cpHeaderHeight =  document.querySelector(".cp_header").offsetHeight;
	const viewTitHeight = document.querySelector(".view_tit").offsetHeight;	
	if(cpHeaderHeight) {
		viewCon.style.minHeight = (bodyHeight - cpHeaderHeight - viewTitHeight) + 'px';
	} else {
		viewCon.style.minHeight = (bodyHeight - viewTitHeight) + 'px';
	}
}

window.addEventListener("load", function(){
    fixedContainerSize();
})







// User-Agent 문자열 가져오기
const userAgent = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(userAgent);
const isAndroid = /Android/.test(userAgent);

if (isIOS) {
  let bgAlerts = document.querySelectorAll(".bg_alert");
  bgAlerts.forEach(function(item){
    item.classList.add("iOS")
  })
} else if (isAndroid) {
  let bgAlerts = document.querySelectorAll(".bg_alert");
  bgAlerts.forEach(function(item){
    item.classList.add("AOS")
  })
} else {
  // iOS와 Android가 아닐 때 처리 (예: PC 브라우저)
}

