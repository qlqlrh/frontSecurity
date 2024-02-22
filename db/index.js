const { pool } = require("./pool");

// 객체 구조 분해를 함수 파라미터에 적용
// async function selectSignin( {uid, upw} )
// exports.selectSignin = async function ( {uid, upw} )
exports.selectSignin = async ({ uid, upw }) => {
  let conn;
  let rows; // 결과
  let err = {}; // 에러
  try {
    conn = await pool.getConnection();
    rows = await conn.query(
      `
            select 
                no, uid, name 
            from  
                users
            where
                uid=? and upw=?
            ;            
        `,
      [uid, upw]
    );
  } catch (e) {
    console.log("sql 오류", e);
    err = e;
  } finally {
    // 커넥션이 존재하면 반납하시오 (무조건 수행)
    if (conn) conn.release();
  }
  return {
    rows,
    err,
  };
};
