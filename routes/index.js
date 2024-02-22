var express = require("express");
/////////////////////////////
const session = require("express-session"); //session 관리를 위해
const cookieParser = require("cookie-parser"); //쿠키 읽고 쓰기를 위해
const crypto = require("crypto"); //
////////////////////////////
var router = express.Router();

//세션 관리 설정
router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      //세션 쿠키 설정
      httpOnly: true, //Javascript를 통한 쿠키 탈취문제를 예방
      secure: false, //true로 설정하면 https가 아닌 통신에서는 쿠키를 전송하지 않음
      maxAge: 60 * 1000 * 5,
    },
  })
);

router.use(express.urlencoded({ extended: true })); //폼의 데이터를 읽을 수 있도록 URL 인코딩 활성화
router.use(cookieParser()); //쿠키를 읽고 쓰기 위해

let sessionData = {};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

function showMsg(res, msgStr) {
  res.render("msg", { msg: msgStr });
}

// 로그인 화면 (GET)
router.get("/signin", function (req, res, next) {
  // 실습 : 로그인 화면 준비 (아이디, 비번, 로그인 버튼)
  res.render("signin", { title: "로그인 화면" });
});

// 로그인 처리(POST) -> 포워딩 or 에러처리
router.post("/signin", function (req, res, next) {
  // 1. 아이디, 비번 정보 획득, 유효성 검사(데이터 누락 체크)
  const { uid, upw } = req.body;
  console.log(uid, upw);
  // 값을 검사해서 유효성 보장
  if (uid == null || upw == null || uid === "" || upw === "") {
    console.log(`[${uid}]-[${upw}]`);
    // 에러메세지 전송 + 이전페이지(URL 상태로)로 되돌아 간다
    showMsg(res, "아이디 혹은 비밀번호를 정확하게 입력하세요");
    return;
  }

  // 2. 아이디, 비번 정보를 이용하여 데이터베이스의 쿼리 수행
  if (uid == "guest" && upw == "1234") {
    /////////////////////////////////////////////////
    sessionData = req.session;
    sessionData.username = uid;
    /////////////////////////////////////////////
    // 3. 계정 정보가 존재하면
    console.log("회원 정보 존재");
    //  3-1. 회원 정보 획득 (전부 or 일부)
    //  3-2. 로그 처리 등등 필요한 작업 수행
    //  3-3. 세션 처리, 필요 정보 저장
    // TODO 세션 생성
    // console.log(req.session.uid, req.session.name);
    // req.session.uid = uid;
    // req.session.name = rows[0].name; // 쿼리 결과에서 0번 취하고 (일치하는 회원은 1명, 그 밑(객체)에 멤버 name 추출)
    //  3-4. 홈페이지로 이동
    res.redirect("/csrf");
  } else {
    // 4. 계정 정보가 없다면
    console.log("회원 정보 없음");
    //  4-1. 오류 메시지 전송 -> 특정 페이지로 포워딩 or 뒤로 가게 처리
    showMsg(res, "일치하는 회원 정보가 없습니다.");
    return;
  }
  console.log(rows);
});
// res.send('로그인 처리');

// router.post("/remit", (req, res) => {
//   if (!req.session.username || req.session.username !== sessionData.username) {
//     res.status(403);
//     res.send("로그인 필요");
//     return;
//   }

//   const { to, amount } = req.body;
//   res.send(`${to} 에게 ${amount}원을 송금하였습니다.`);
// });

module.exports = router;
