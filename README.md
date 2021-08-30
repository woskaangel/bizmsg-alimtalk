# Bizmsg-alimtalk

---

- [비즈엠 이용 가이드](https://www.bizmsg.kr/collected_statics/assets_landing/doc/bizm_guide.pdf)
- [API 연동 가이드](https://www.bizmsg.kr/collected_statics/assets_landing/doc/bizm.pdf)
- [API 결과 코드](https://alimtalk-api.bizmsg.kr/codeList.html)
- [알림톡 템플릿 검수 가이드](https://www.bizmsg.kr/collected_statics/assets_landing/doc/alimtalk_template_guide.pdf)
- [이미지 알림톡 사용 가이드](https://www.bizmsg.kr/collected_statics/assets_landing/doc/alimtalk_template_image_guide.zip)

# Installing

---

Using npm:

```bash
$ npm i bizmsg-alimtalk
```

Using yarn:

```bash
$ yarn add bizmsg-alimtalk
```

# Usage

---

### Production

- **typescript**

  ```ts
  import bizmsg from 'bizmsg-alimtalk';

  const bootstrap = async () => {
    bizmsg.init('YOUR_USER_ID', 'YOUR_PROFILE_KEY');
  };
  bootstrap();

  (async () => {
    try {
      const response = bizmsg.sendMessage({
        msg: '[카카오뮤직] 회원가입 안내\n홍길동님, 카카오뮤직 회원이 되신 것을 환영합니다.\n\n▶신규 가입 회원 혜택\n1개월 무료 스트리밍 서비스 제공\n카카오톡 이모티콘 증정',
        phn: '821012345678',
        tmplId: 'alimtalktest_001',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
  ```

- **common.js**

  ```js
  const bizmsg = require('bizmsg-alimtalk');

  const bootstrap = async () => {
    bizmsg.init('YOUR_USER_ID', 'YOUR_PROFILE_KEY');
  };
  bootstrap();

  (async () => {
    try {
      const response = bizmsg.sendMessage({
        msg: '[카카오뮤직] 회원가입 안내\n홍길동님, 카카오뮤직 회원이 되신 것을 환영합니다.\n\n▶신규 가입 회원 혜택\n1개월 무료 스트리밍 서비스 제공\n카카오톡 이모티콘 증정',
        phn: '821012345678',
        tmplId: 'alimtalktest_001',
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
  ```

### Test

- **typescript**

  ```ts
  import bizmsg from 'bizmsg-alimtalk';

  const bootstrap = async () => {
    bizmsg.init('PREPAY_USER', '89823b83f2182b1e229c2e95e21cf5e6301eed98', { dev: true });
    bizmsg.getTestToken({ phoneNumber: '821012345678' });
    bizmsg.confirmTestToken({ phoneNumber: '821012345678', token: '123456' });
  };
  bootstrap();

  (async () => {
    try {
      bizmsg.confirmTestTemplate({ templateCode: 'alimtalktest_001' }); // optional

      const response = await bizmsg.sendMessage({
        msg: '[카카오뮤직] 회원가입 안내\n홍길동님, 카카오뮤직 회원이 되신 것을 환영합니다.\n\n▶신규 가입 회원 혜택\n1개월 무료 스트리밍 서비스 제공\n카카오톡 이모티콘 증정',
        phn: '821012345678',
        tmplId: 'alimtalktest_001',
      });
      console.log(response.data);

      bizmsg.cancelTestTemplate({ templateCode: 'alimtalktest_001' }); // optional
    } catch (error) {
      console.log(error);
    }
  })();
  ```

- **common.js**

  ```js
  const bizmsg = require('bizmsg-alimtalk');

  const bootstrap = async () => {
    bizmsg.init('PREPAY_USER', '89823b83f2182b1e229c2e95e21cf5e6301eed98', { dev: true });
    bizmsg.getTestToken({ phoneNumber: '821012345678' });
    bizmsg.confirmTestToken({ phoneNumber: '821012345678', token: '123456' });
  };
  bootstrap();

  (async () => {
    try {
      bizmsg.confirmTestTemplate({ templateCode: 'alimtalktest_001' }); // optional

      const response = await bizmsg.sendMessage({
        msg: '[카카오뮤직] 회원가입 안내\n홍길동님, 카카오뮤직 회원이 되신 것을 환영합니다.\n\n▶신규 가입 회원 혜택\n1개월 무료 스트리밍 서비스 제공\n카카오톡 이모티콘 증정',
        phn: '821012345678',
        tmplId: 'alimtalktest_001',
      });
      console.log(response.data);

      bizmsg.cancelTestTemplate({ templateCode: 'alimtalktest_001' }); // optional
    } catch (error) {
      console.log(error);
    }
  })();
  ```
