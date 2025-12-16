/* 
구현 샘플 스크립트 입니다.
오류가 있을 수 있습니다.
필요에 맞게 새로 작성해주세요.
*/


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




/* 확인용 레이어 닫기(임시) */
let layers = document.querySelectorAll(".layer");
layers.forEach(function(item){
	item.querySelectorAll("button").forEach(function(e){
		e.addEventListener("click", function(){
            if(item.classList.contains("toast")) {
                console.log("toast");
                item.classList.remove("active");
                item.classList.add("deactive");
                item.addEventListener("animationend", function(){
                    item.classList.remove("deactive");
                })
            }
            else {
                item.closest(".layer").style.display = "none";
            }
			
			
		})
	})
})
/* // 확인용 레이어 닫기(임시) */





/* 비밀번호키패드 클릭 효과 */
let keypad = document.querySelector(".keypad_wrap");
if(keypad != null) {
	let btn = keypad.querySelectorAll("button.btn_num");
	btn.forEach(function(item){
		item.addEventListener("click", function(){
			item.classList.add("active");
			setTimeout(function(){
				item.classList.remove("active");
			}, 100)
		})
	})
}






// 전역 변수 설정
let pinNum = '';
// 핀 번호 점(dot) 요소들 선택 (6개의 span.pin_dot)
let pinDot = document.querySelectorAll('.pin_dot_wrap .pin_dot');
// 비밀번호 입력 영역 전체 컨테이너 (오류 표시를 위해 사용)
let pinInputWrap = document.querySelector('.pin_dot_wrap');
// PIN 실패 횟수 카운터 추가
let pinFailCount = 0;
// 새로운 알림 요소 선택
let pinAlert = document.querySelector('.pin_alert');

// --- 알림 메시지 업데이트 및 표시 함수 ---
function updateAlertMessage() {
    if (!pinAlert) return; // 요소가 없으면 실행 중단

    if (pinFailCount === 0) {
        // 0회 실패 시: 메시지 숨김 및 error 클래스 제거
        pinAlert.style.display = 'none';
        pinInputWrap.classList.remove('error');
    } else if (pinFailCount < 5) {
        // 1회~4회 실패 시: 횟수 표시 및 메시지 보이기
        pinAlert.innerHTML = `5회 실패 시 OTP PIN 번호를 재설정 해야합니다.<br />(${pinFailCount}/5)`;
        pinAlert.style.display = 'block';
        pinInputWrap.classList.add('error');
    } else {
        // 5회 실패 시: 브라우저 alert 표시 및 상태 유지
        pinInputWrap.classList.add('error');
        pinAlert.style.display = 'block';
        pinAlert.innerHTML = `5회 실패 시 OTP PIN 번호를 재설정 해야합니다.<br />(${pinFailCount}/5)`;
        alert('PIN 번호 입력에 5회 실패하여 OTP PIN 번호를 재설정해야 합니다.');
    }
}

// --- 전체 초기화 함수 정의 (공통으로 사용) ---
function resetAll() {
    pinNum = '';
    pinInputWrap.classList.remove('error'); 
    pinDot.forEach(function(span) {
        span.classList.remove('active');
    });
    // 전체삭제 시에는 오류 메시지 숨김 (실패 횟수는 유지)
    if (pinAlert) {
        pinAlert.style.display = 'none';
    }
    console.log("전체 삭제됨. pinNum: " + pinNum);
}

// resetActive 함수는 기존 코드를 유지합니다.
function resetActive(){
    document.querySelector("#toast_test01").style.display = "block";
    setTimeout(function(){
        let service_name_sections = document.querySelectorAll("#service_name .section");
        document.querySelector("#toast_test01").style.display = "none";
        service_name_sections.forEach(function(item){
            item.style.display = "none";
            document.querySelector("#test001").style.display = "block";
        })
        resetAll();
    }, 2000)
}

// 페이지 로드 시 초기 상태 적용
document.addEventListener('DOMContentLoaded', function() {
    updateAlertMessage(); 
});


// --- 숫자 버튼 클릭 이벤트 처리 ---
document.querySelectorAll('.keypad_wrap .btn_num').forEach(function(button) {
    button.addEventListener('click', function() {
        
        // 5회 실패 상태에서는 추가 입력 방지
        if (pinFailCount >= 5) {
            alert('PIN 번호 입력 횟수를 초과했습니다. 재설정이 필요합니다.');
            return; 
        }

        pinInputWrap.classList.remove('error'); // 입력 시작 시 error 클래스 제거
        if (pinAlert) {
            pinAlert.style.display = 'none'; // 입력 시작 시 알림 숨김
        }

        let number = this.querySelector('.num').textContent;
        
        if (pinNum.length < 6) {
            pinNum += number;
            console.log(pinNum);
        }

        pinDot.forEach(function(spanElement, idx) {
            if (idx < pinNum.length) {
                spanElement.classList.add('active');
            }
        });

        if (pinNum.length === 6) {
            if (pinNum === '121212') {
                // --- 성공 로직 ---
                pinFailCount = 0; // 성공 시 실패 횟수 초기화
                updateAlertMessage(); // 성공 후 메시지 숨김 (0회 상태)
                document.querySelector("#toast_test01").classList.add("active");
                resetActive();

            } else {
                // --- 실패 로직 ---
                pinFailCount++; // 실패 횟수 증가
                
                // 입력 상태 초기화 (Dot, pinNum)
                pinNum = '';
                pinDot.forEach(span => span.classList.remove('active'));

                // 메시지 업데이트 및 오류 표시
                updateAlertMessage();
            }
        }
    });
});


// --- 1. 전체삭제 버튼 클릭 이벤트 처리 ---
document.querySelector('.keypad_tools .btn_reset').addEventListener('click', function() {
    resetAll();
    // 전체삭제는 실패 횟수와 별개로 동작하므로 pinFailCount는 유지
});


// --- 2. 딜리트(백스페이스) 버튼 클릭 이벤트 처리 ---
document.querySelector('.keypad_tools .btn_del').addEventListener('click', function() {
    pinInputWrap.classList.remove('error'); 
    if (pinAlert) {
        pinAlert.style.display = 'none'; // 삭제 버튼 클릭 시에도 알림 숨김
    }
    
    if (pinNum.length > 0) {
        pinNum = pinNum.slice(0, pinNum.length - 1);
        console.log("삭제 후 pinNum: " + pinNum);

        let lastActiveIndex = pinNum.length;

        if (lastActiveIndex >= 0 && lastActiveIndex < pinDot.length) {
            pinDot[lastActiveIndex].classList.remove('active');
        }
    }
});






function fnToastAction(){
    let toastLayer = document.querySelector(".layer.toast");
    toastLayer.classList.add("active");
    setTimeout(() => {
        toastLayer.classList.remove("active");
        toastLayer.classList.add("deactive");
        toastLayer.addEventListener("animationend", function(){
            toastLayer.classList.remove("deactive");
        })
    }, 2000); // 2초 후 사라짐
}