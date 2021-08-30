import { BizmsgErrorCode } from './enum';

/**
 * @S sms
 * @L lms
 * @M mms
 * @N 발송하지 않음
 */
export type BizmsgSmsKind = 'S' | 'L' | 'M' | 'N';
/**
 * @AT 알림톡
 * @AI 이미지 알림톡
 * @FT 친구톡
 * @FI 이미지 친구톡
 * @FW 와이드 이미지 친구톡
 */
export type BizmsgMessageType = 'AT' | 'AI' | 'FT' | 'FI' | 'FW';
/**
 * @WL 웹링크
 * @AL 앱 링크
 * @DS 배송 조회
 * @BK 봇 키워드
 * @MD 메시지 전달
 * @BC 상담톡 전환
 * @BT 봇 전환
 * @AC 채널 추가
 * @BF 비지니스 폼
 * @P1 이미지 전송 플러그인
 * @P2 개인정보 이용 플러그인
 * @P3 원클릭 결제 플러그인
 */
export type BizmsgButtonType = 'WL' | 'AL' | 'DS' | 'BK' | 'MD' | 'BC' | 'BT' | 'AC' | 'BF' | 'P1' | 'P2' | 'P3';
/**
 * @Y true, yes
 * @N false, no
 */
export type BooleanString = 'Y' | 'N';
/**
 * @SECURE_IMAGE 보안 이미지
 * @ONE_TIME_PROFILE 일회용 프로필
 */
export type PluginType = 'SECURE_IMAGE' | 'ONE_TIME_PROFILE';
/**
 * @G 그룹
 * @S 기본
 */
export type SenderProfileType = 'G' | 'S';
export type BizmsgErrorCodeType = keyof typeof BizmsgErrorCode;
