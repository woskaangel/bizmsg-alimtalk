import { BizmsgButtonType, BizmsgMessageType, BizmsgSmsKind, BooleanString, PluginType, SenderProfileType } from './type';

interface RequestButton {
  /**
   * @title 바로연결 명
   * @length 28
   */
  name: string;

  /**
   * @title 바로연결 타입
   */
  type: BizmsgButtonType;

  /**
   * @title pc 환경에서 바로연결 클릭 시 이동할 url
   */
  url_pc?: string;

  /**
   * @title mobile 환경에서 바로연결 클릭 시 이동할 url
   */
  url_mobile?: string;

  /**
   * @title mobile ios 환경에서 바로연결 클릭 시 실행할 application custom scheme
   */
  scheme_ios?: string;

  /**
   * @title mobile android 환경에서 바로연결 클릭 시 실행할 application custom scheme
   */
  scheme_android?: string;

  /**
   * @title 상담톡/봇 전환 시 전달할 메타정보
   * @length 50
   */
  chat_extra?: string;

  /**
   * @title 봇 전환 시 연결할 봇 이벤트명
   * @length 50
   */
  chat_event?: string;

  /**
   * @title 플러그인 ID
   * @length 24
   */
  plugin_id?: string;

  /**
   * @title 플러그인 실행시 X-Kakao-Plugin-Relay-Id 헤더를 통해 전달 받을 값
   * @description 카카오톡 비즈플러그인 안내 페이지 하단 개발 가이드 참고
   */
  relay_id?: string;

  /**
   * @title 원클릭 결제 플러그인에서 사용하는 결제 정보
   * @description 카카오톡 비즈플러그인 안내 페이지 하단 개발 가이드 참고
   */
  oneclick_id?: string;

  /**
   * @title 원클릭 결제 플러그인에서 사용하는 결제 정보
   * @description 카카오톡 비즈플러그인 안내 페이지 하단 개발가이드 참고
   */
  product_id?: string;
}
interface RequestQuickReply {
  /**
   * @title 바로연결 명
   */
  name: string;

  /**
   * @title 바로연결 타입
   */
  type: BizmsgButtonType;

  /**
   * @title pc 환경에서 바로연결 클릭 시 이동할 url
   */
  url_pc?: string;

  /**
   * @title mobile 환경에서 바로연결 클릭 시 이동할 url
   */
  url_mobile?: string;

  /**
   * @title mobile ios 환경에서 바로연결 클릭 시 실행할 application custom scheme
   */
  scheme_ios?: string;

  /**
   * @title mobile android 환경에서 바로연결 클릭 시 실행할 application custom scheme
   */
  scheme_android?: string;
}
export interface SendMessage {
  /**
   * @title 메시지 타입
   * @typedef {string} MessageType
   * @default AT
   */
  message_type?: BizmsgMessageType;

  /**
   * @title 전화번호
   * @description 국가코드(82)를 포함한 전화번호
   * @length 15
   */
  phn: string;

  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  profile?: string;

  /**
   * @title 메시지 예약발송을 위한 시간
   * @typedef {string} yyyyMMddHHmmss
   * @length 14
   * @example 20180601000000: 2018/06/01 00:00:00 예약 전송, 00000000000000: 즉시 전송
   * @default 00000000000000
   */
  reserveDt?: string;

  /**
   * @title 사용자에게 전달될 메시지
   * @description 공백 포함
   * @length 1000
   * @limit 친구톡 이미지 타입: 400자, 친구톡 이미지 타입 와이드형: 76자
   */
  msg: string;

  /**
   * @title 템플릿 내용 중 강조 표기할 핵심 정보
   * @length 23
   * @reference https://t1.daumcdn.net/biz/DM/%EC%95%8C%EB%A6%BC%ED%86%A1%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EA%B2%80%EC%88%98%20%EA%B0%80%EC%9D%B4%EB%93%9C_202105.pdf
   */
  title?: string;

  /**
   * @title 메시지 유형을 확인할 템플릿 코드
   * @description 사전에 승인된 템플릿의 코드
   * @length 25
   */
  tmplId?: string;

  /**
   * @title 문자메시지 전환발송시 SMS/LMS 구분
   * @description SMS/LMS 대체발송 상품 이용시 사용 가능 (비즈엠 홈페이지 - 내 정보 - 이용상품에서 발신프로필별 문자 설정 가능)
   * @typedef {string} SmsKind
   */
  smsKind?: BizmsgSmsKind;

  /**
   * @title 카카오 비즈메시지 발송 실패 시 문자메시지 대체 발송을 위한 메시지 내용
   * @length 2000
   */
  msgSms?: string;

  /**
   * @title 문자메시지 발송을 위한 발신번호
   * @description 비즈엠 사이트에 등록 승인된 발신번호
   * @length 15
   */
  smsSender?: string;

  /**
   * @title LMS(장문 메시지) 발송시 메시지 제목
   * @length 120
   */
  smsLmsTit?: string;

  /**
   * @title 카카오 비즈메시지 발송과 관계 없이 문자메시지 전용
   * @description 알림톡/친구톡 발송을 시도하지 않고 문자메시지로만 발송 요청
   * @example Y: 사용, N: 미사용
   * @default N
   */
  smsOnly?: BooleanString;

  /**
   * @title 친구톡 메시지 발송 시 광고성 메시지 필수 표기사항 노출여부
   * @typedef {string} Y / N
   * @limit 친구톡 메시지 발송 시 광고성 메시지 필수
   * @example Y: 노출, N: 노출하지 않음
   * @default Y
   */
  ad_flag?: BooleanString;

  /**
   * @title 친구톡 발송 시 메시지에 첨부할 이미지 URL
   * @length 2083
   */
  img_url?: string;

  /**
   * @title 첨부된 이미지 클릭시 이동할 URL
   * @length 2083
   */
  img_link?: string;

  /**
   * @title 메시지에 첨부할 버튼1
   */
  button1?: RequestButton;

  /**
   * @title 메시지에 첨부할 버튼2
   */
  button2?: RequestButton;

  /**
   * @title 메시지에 첨부할 버튼3
   */
  button3?: RequestButton;

  /**
   * @title 메시지에 첨부할 버튼4
   */
  button4?: RequestButton;

  /**
   * @title 메시지에 첨부할 버튼5
   */
  button5?: RequestButton;

  /**
   * @title 메시지에 첨부할 바로연결 1
   */
  quickReply1?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 2
   */
  quickReply2?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 3
   */
  quickReply3?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 4
   */
  quickReply4?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 5
   */
  quickReply5?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 6
   */
  quickReply6?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 7
   */
  quickReply7?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 8
   */
  quickReply8?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 9
   */
  quickReply9?: RequestQuickReply;

  /**
   * @title 메시지에 첨부할 바로연결 10
   */
  quickReply10?: RequestQuickReply;

  /**
   * @title message(사용자에게 전달될 메시지) 내 포함된 가격/금액/결제금액
   * @example 39900 (숫자만 입력)
   */
  price?: string;

  /**
   * @title message(사용자에게 전달될 메시지) 내 포함된 가격/금액/결제금액의 통화단위
   * @example KRW, USD, EUR
   * @reference https://justforex.com/ko/education/currencies
   */
  currency_type?: string;
}
export interface CheckMessage {
  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  profile: string;

  /**
   * @title 메시지 일련번호
   * @description 메시지에 대해 고유한 값
   * @length 20
   */
  msgid: string;
}
export interface CancelMessage {
  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  profile: string;

  /**
   * @title 메시지 일련번호
   * @description 메시지에 대해 고유한 값
   * @length 20
   */
  msgid: string;
}
export interface UploadImage {
  /**
   * @title 업로드할 이미지
   */
  image: string;

  /**
   * @title 와이드형 이미지 여부
   * @typedef {string} Y / N
   * @default Y
   */
  wide: BooleanString;

  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  profile?: string;
}
export interface DeleteImage {
  /**
   * @title 이미지 URL
   * @description 응답으로 수신받은 img_url
   */
  image_name: string;

  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  profile?: string;
}
export interface UploadBusinessForm {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @description alpha-numeric
   * @length 40
   */
  senderKey: string;

  /**
   * @title 업로드할 비즈폼 아이디
   */
  bizFormId: string;
}
export interface GetBusinessFormList {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;
}
export interface GetBusinessForm {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;

  /**
   * @title 업로드할 비즈폼 아이디
   */
  bizFormId: string;
}
export interface CreateCallbackUrl {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;

  /**
   * @title 플러그인 타입
   */
  pluginType: PluginType;

  /**
   * @title 플러그인 ID
   */
  pluginId: string;

  /**
   * @title 콜백 URL
   */
  callbackUrl: string;
}
export interface UpdateCallbackUrl {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;

  /**
   * @title 플러그인 ID
   */
  pluginId: string;

  /**
   * @title 콜백 URL
   */
  callbackUrl: string;
}
export interface DeleteCallbackUrl {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;

  /**
   * @title 플러그인 ID
   */
  pluginId: string;
}
export interface GetCallbackUrl {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;

  /**
   * @title 플러그인 ID
   */
  pluginId: string;
}
export interface GetCallbackUrlList {
  /**
   * @title 메시지 발송 주체인 카카오톡 채널 아이디 등록 후 발급되는 발신프로필키
   * @length 40
   */
  senderKey: string;
}
export interface GetBalance {
  /**
   * @title 사용자 계정키 (비즈엠)
   * @description 비즈엠 홈페이지 [내 정보]에서 확인 가능
   */
  userkey: string;
}
export interface GetTestToken {
  /**
   * @title 발송 테스트 이용할 휴대폰번호
   * @description 해당 번호로 토큰번호 전송
   */
  phoneNumber: string;
}
export interface ConfirmTestToken {
  /**
   * @title 토큰 번호 요청에 사용된 휴대폰번호
   */
  phoneNumber: string;

  /**
   * @title 카카오톡 메시지로 수신한 토큰 번호
   */
  token: string;
}
export interface ConfirmTestTemplate {
  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  senderKey?: string;

  /**
   * @title 템플릿 코드
   */
  templateCode: string;

  /**
   * @title 발신프로필타입
   */
  senderKeyType?: SenderProfileType;

  /**
   * @title 댓글
   */
  comment?: string;
}
export interface CancelTestTemplate {
  /**
   * @title 발신프로필키
   * @description 메시지 발송 주체인 카카오톡 채널 등록 후 발급되는 키
   * @length 40
   */
  senderKey?: string;

  /**
   * @title 템플릿 코드
   */
  templateCode: string;

  /**
   * @title 발신프로필타입
   */
  senderKeyType?: SenderProfileType;

  /**
   * @title 댓글
   */
  comment?: string;
}
