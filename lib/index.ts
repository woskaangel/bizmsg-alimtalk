import axios, { AxiosInstance } from 'axios';

import { BizmsgErrorCode, BizmsgPath, BizmsgUrl } from './@types/enum';
import {
  CancelMessage,
  CancelTestTemplate,
  CheckMessage,
  ConfirmTestTemplate,
  ConfirmTestToken,
  CreateCallbackUrl,
  CreateSMessage,
  DeleteCallbackUrl,
  DeleteImage,
  GetBalance,
  GetBusinessForm,
  GetBusinessFormList,
  GetCallbackUrl,
  GetCallbackUrlList,
  GetTestToken,
  SendMessage,
  UpdateCallbackUrl,
  UploadBusinessForm,
  UploadImage,
} from './@types/interface';
import { BizmsgErrorCodeType } from './@types/type';

class AlimTalk {
  private instance: AxiosInstance = axios.create({
    headers: {
      'Content-type': 'application/json',
    },
    timeout: 1000 * 20,
    responseType: 'json',
  });

  private profile?: string;

  private initialized = false;

  public init(userId: string, profileKey: string, url: string) {
    this.initialized = true;
    this.instance.defaults.headers.userid = userId;
    this.profile = profileKey;
    this.instance.defaults.baseURL = url;
  }

  public checkInit() {
    if (!this.initialized || !this.profile) {
      throw Error('Not initialized. Please run the init function first.');
    }
  }

  public getInstance() {
    return this.instance;
  }

  public getProfile() {
    if (!this.profile) {
      throw Error('Not initialized. Please run the init function first.');
    }
    return this.profile;
  }
}
const alimTalk: AlimTalk = new AlimTalk();

/**
 * @title 사용자 정보 초기화
 */
export function init(userId: string, profileKey: string, options?: { dev: boolean }) {
  alimTalk.init(userId, profileKey, options && options.dev ? BizmsgUrl.devUrl : BizmsgUrl.prodUrl);
}

/**
 * @title 메시지 전송 요청
 * @length 100
 */
export function sendMessage(data: SendMessage | SendMessage[]) {
  alimTalk.checkInit();
  if (data instanceof Array) {
    if (data.length > 100) {
      throw Error('Max length of array is 100.');
    }
    return alimTalk.getInstance().post(
      BizmsgPath.send,
      data.reduce((result: SendMessage[], message: SendMessage) => {
        result.push({
          profile: alimTalk.getProfile(),
          message_type: 'AT',
          reserveDt: '00000000000000',
          ...message,
        });
        return result;
      }, []),
    );
  }
  return alimTalk.getInstance().post(BizmsgPath.send, [
    {
      profile: alimTalk.getProfile(),
      message_type: 'AT',
      reserveDt: '00000000000000',
      ...data,
    },
  ]);
}

/**
 * @title 메시지 전송 확인
 */
export function checkMessage(data: CheckMessage) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.check, { data });
}

/**
 * @title 메시지 전송 예약 취소
 */
export function cancelReserve(data: CancelMessage) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.cancelReserve, data);
}

/**
 * @title 이미지 업로드
 */
export function uploadImage(data: UploadImage) {
  alimTalk.checkInit();
  const profileKey = data.profile ?? alimTalk.getProfile();
  const sendData = data;
  delete sendData.profile;
  return alimTalk.getInstance().post(BizmsgPath.uploadImage.replace('{profile_key}', profileKey), sendData);
}

/**
 * @title 이미지 삭제
 */
export function deleteImage(data: DeleteImage) {
  alimTalk.checkInit();
  const profileKey = data.profile ?? alimTalk.getProfile();
  const sendData = data;
  delete sendData.profile;
  return alimTalk.getInstance().post(BizmsgPath.deleteImage.replace('{profile_key}', profileKey), sendData);
}

/**
 * @title 비즈니스폼 업로드
 */
export function uploadBusinessForm(data: UploadBusinessForm) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.uploadBusinessForm, data);
}

/**
 * @title 비즈니스폼 리스트 조회
 */
export function getBusinessFormList(data: GetBusinessFormList) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getBusinessFormList, { data });
}

/**
 * @title 비즈니스폼 조회
 */
export function getBusinessForm(data: GetBusinessForm) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getBusinessForm, { data });
}

/**
 * @title 콜백 URL 생성
 */
export function createCallbackUrl(data: CreateCallbackUrl) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.createCallbackUrl, data);
}

/**
 * @title 콜백 URL 수정
 */
export function updateCallbackUrl(data: UpdateCallbackUrl) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.updateCallbackUrl, data);
}

/**
 * @title 콜백 URL 삭제
 */
export function deleteCallbackUrl(data: DeleteCallbackUrl) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.deleteCallbackUrl, data);
}

/**
 * @title 콜백 URL 리스트 조회
 */
export function getCallbackUrlList(data: GetCallbackUrlList) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getCallbackUrlList, { data });
}

/**
 * @title 콜백 URL 조회
 */
export function getCallbackUrl(data: GetCallbackUrl) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getCallbackUrl, { data });
}

/**
 * @title 계정 잔액 조회
 */
export function getBalance(data: GetBalance) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getBalance, { headers: data });
}

/**
 * @title 테스트 사용자 인증 토큰 요청
 */
export function getTestToken(data: GetTestToken) {
  alimTalk.checkInit();
  return alimTalk.getInstance().get(BizmsgPath.getTestToken, { params: data });
}

/**
 * @title 테스트 사용자 인증 승인
 */
export function confirmTestToken(data: ConfirmTestToken) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.confirmTestToken, { params: data });
}

/**
 * @title 테스트 템플릿 승인
 */
export function confirmTestTemplate(data: ConfirmTestTemplate) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.confirmTestTemplate, { senderKey: alimTalk.getProfile(), ...data });
}

/**
 * @title 테스트 템플릿 반려
 */
export function cancelTestTemplate(data: CancelTestTemplate) {
  alimTalk.checkInit();
  return alimTalk.getInstance().post(BizmsgPath.cancelTestTemplate, { senderKey: alimTalk.getProfile(), ...data });
}

/**
 * @title 에러 메시지 분석
 * @description API 결과를 입력하시면 설명이 나옵니다.
 * @example K001:NotAvailableSendMessage => 메시지를 전송할 수 없음
 */
export function bizmsgError(message: string) {
  const errorType: string = message.split(':')[0];
  const errorText = BizmsgErrorCode[<BizmsgErrorCodeType>errorType];
  if (errorType === 'K000' || errorType === 'M000' || errorType === 'R000') {
    return message;
  }
  if (!errorText) {
    throw Error(`${errorType}: 알수없는 오류입니다. 비즈엠에 문의해주세요.`);
  } else {
    throw Error(`${errorType}: ${errorText}`);
  }
}

export function createArrayMessage(phnArray: string[], message: CreateSMessage) {
  return phnArray.reduce((result: SendMessage[], phn: string) => {
    result.push({
      phn,
      profile: alimTalk.getProfile(),
      message_type: 'AT',
      reserveDt: '00000000000000',
      ...message,
    });
    return result;
  }, []);
}
export * as default from '.';
console.log(
  createArrayMessage(['01012345678', '01012345678', '01012345678', '01012345678', '01012345678'], {
    msg: 'hi',
  }),
);
