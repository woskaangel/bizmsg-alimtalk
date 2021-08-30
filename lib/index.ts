import axios, { AxiosInstance } from 'axios';

import { BizmsgErrorCode, BizmsgPath, BizmsgUrl } from './@types/enum';
import {
  CancelMessage,
  CancelTestTemplate,
  CheckMessage,
  ConfirmTestTemplate,
  ConfirmTestToken,
  CreateCallbackUrl,
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

  private initialized = false;

  private checkInit() {
    if (!this.initialized) {
      throw Error('Not initialized. Please run the init function first.');
    }
  }

  /**
   * @title 사용자 정보 초기화
   */
  public init(userId: string, options?: { dev: boolean }) {
    this.initialized = true;
    this.instance.defaults.headers.userid = userId;
    this.instance.defaults.baseURL = options && options.dev ? BizmsgUrl.devUrl : BizmsgUrl.prodUrl;
  }

  /**
   * @title 메시지 전송 요청
   * @length 100
   */
  public sendMessage(data: SendMessage | SendMessage[]) {
    this.checkInit();
    if (data instanceof Array) {
      if (data.length > 100) {
        throw Error('Max length of array is 100.');
      }
      return this.instance.post(
        BizmsgPath.send,
        data.reduce((result: SendMessage[], message: SendMessage) => {
          result.push({
            message_type: 'AT',
            reserveDt: '00000000000000',
            ...message,
          });
          return result;
        }, []),
      );
    }
    return this.instance.post(BizmsgPath.send, [
      {
        message_type: 'AT',
        reserveDt: '00000000000000',
        ...data,
      },
    ]);
  }

  /**
   * @title 메시지 전송 확인
   */
  public checkMessage(data: CheckMessage) {
    this.checkInit();
    return this.instance.get(BizmsgPath.check, { data });
  }

  /**
   * @title 메시지 전송 예약 취소
   */
  public cancelReserve(data: CancelMessage) {
    this.checkInit();
    return this.instance.post(BizmsgPath.cancelReserve, data);
  }

  /**
   * @title 이미지 업로드
   */
  public uploadImage(profileKey: string, data: UploadImage) {
    this.checkInit();
    return this.instance.post(BizmsgPath.uploadImage.replace('{profile_key}', profileKey), data);
  }

  /**
   * @title 이미지 삭제
   */
  public deleteImage(profileKey: string, data: DeleteImage) {
    this.checkInit();
    return this.instance.post(BizmsgPath.deleteImage.replace('{profile_key}', profileKey), data);
  }

  /**
   * @title 비즈니스폼 업로드
   */
  public uploadBusinessForm(data: UploadBusinessForm) {
    this.checkInit();
    return this.instance.post(BizmsgPath.uploadBusinessForm, data);
  }

  /**
   * @title 비즈니스폼 리스트 조회
   */
  public getBusinessFormList(data: GetBusinessFormList) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getBusinessFormList, { data });
  }

  /**
   * @title 비즈니스폼 조회
   */
  public getBusinessForm(data: GetBusinessForm) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getBusinessForm, { data });
  }

  /**
   * @title 콜백 URL 생성
   */
  public createCallbackUrl(data: CreateCallbackUrl) {
    this.checkInit();
    return this.instance.post(BizmsgPath.createCallbackUrl, data);
  }

  /**
   * @title 콜백 URL 수정
   */
  public updateCallbackUrl(data: UpdateCallbackUrl) {
    this.checkInit();
    return this.instance.post(BizmsgPath.updateCallbackUrl, data);
  }

  /**
   * @title 콜백 URL 삭제
   */
  public deleteCallbackUrl(data: DeleteCallbackUrl) {
    this.checkInit();
    return this.instance.post(BizmsgPath.deleteCallbackUrl, data);
  }

  /**
   * @title 콜백 URL 리스트 조회
   */
  public getCallbackUrlList(data: GetCallbackUrlList) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getCallbackUrlList, { data });
  }

  /**
   * @title 콜백 URL 조회
   */
  public getCallbackUrl(data: GetCallbackUrl) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getCallbackUrl, { data });
  }

  /**
   * @title 계정 잔액 조회
   */
  public getBalance(data: GetBalance) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getBalance, { headers: data });
  }

  /**
   * @title 테스트 사용자 인증 토큰 요청
   */
  public getTestToken(data: GetTestToken) {
    this.checkInit();
    return this.instance.get(BizmsgPath.getTestToken, { params: data });
  }

  /**
   * @title 테스트 사용자 인증 승인
   */
  public confirmTestToken(data: ConfirmTestToken) {
    this.checkInit();
    return this.instance.post(BizmsgPath.confirmTestToken, { params: data });
  }

  /**
   * @title 테스트 템플릿 승인
   */
  public confirmTestTemplate(data: ConfirmTestTemplate) {
    this.checkInit();
    return this.instance.post(BizmsgPath.confirmTestTemplate, data);
  }

  /**
   * @title 테스트 템플릿 반려
   */
  public cancelTestTemplate(data: CancelTestTemplate) {
    this.checkInit();
    return this.instance.post(BizmsgPath.cancelTestTemplate, data);
  }

  /**
   * @title 에러 메시지 분석
   * @description API 결과를 입력하시면 설명이 나옵니다.
   * @example K001:NotAvailableSendMessage => 메시지를 전송할 수 없음
   */
  public bizmsgError(message: string) {
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
}
const alimTalk = new AlimTalk();
export = alimTalk;
