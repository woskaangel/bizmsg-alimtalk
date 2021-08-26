export enum BizmsgUrl {
  /**
   * @title 운영 서버 URL
   */
  prodUrl = 'https://alimtalk-api.bizmsg.kr',

  /**
   * @title 개발 서버 URL
   */
  devUrl = 'https://dev-alimtalk-api.bizmsg.kr:1443',
}

export enum BizmsgPath {
  /**
   * @title 메시지 전송 요청
   */
  send = '/v2/sender/send',

  /**
   * @title 메시지 전송 확인
   */
  check = '/v2/sender/report',

  /**
   * @title 메시지 전송 예약 취소
   */
  cancelReserve = '/v2/sender/cancel_reserved',

  /**
   * @title 이미지 업로드
   */
  uploadImage = '/v2/ft/{profile_key}/upload_image',

  /**
   * @title 이미지 삭제
   */
  deleteImage = '/v2/ft/{profile_key}/delete_image',

  /**
   * @title 비즈니스폼 업로드
   */
  uploadBusinessForm = '/bizform/upload',

  /**
   * @title 비즈니스폼 리스트 조회
   */
  getBusinessFormList = '/bizform/list',

  /**
   * @title 비즈니스폼 조회
   */
  getBusinessForm = '/bizform/key',

  /**
   * @title 콜백 URL 생성
   */
  createCallbackUrl = '/v1/plugin/callbackurl/create',

  /**
   * @title 콜백 URL 수정
   */
  updateCallbackUrl = '/v1/plugin/callbackurl/update',

  /**
   * @title 콜백 URL 삭제
   */
  deleteCallbackUrl = '/v1/plugin/callbackurl/delete',

  /**
   * @title 콜백 URL 리스트 조회
   */
  getCallbackUrlList = '/v1/plugin/callbackurl/list',

  /**
   * @title 콜백 URL 조회
   */
  getCallbackUrl = '/v1/plugin/callbackurl',

  /**
   * @title 계정 잔액 조회
   */
  getBalance = '/v1/user/balance',

  /**
   * @title 테스트 사용자 인증 토큰 요청
   */
  getTestToken = '/v2/partner/test/user/token',

  /**
   * @title 테스트 사용자 인증 승인
   */
  confirmTestToken = '/v2/partner/test/user/certify',

  /**
   * @title 테스트 템플릿 승인
   */
  confirmTestTemplate = '/v2/partner/test/template/approve',

  /**
   * @title 테스트 템플릿 반려
   */
  cancelTestTemplate = '/v2/partner/test/template/reject',
}
