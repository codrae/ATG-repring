// eslint-disable-next-line no-unused-vars
import React from "react";
import '../styles/Footer.css';

const Footer = () => {
    return (
            <div id="footer">
                <div className="width1230">
                    <div className="foot_top">
                        <a >회사소개</a><a >이용약관</a><a
                         className="privacy">개인정보처리방침</a><a href="https://mail.atg.co.kr/" target="_blank">사내메일</a>
                    </div>
                    <div className="foot_address">
                        <h2>ATG</h2>
                        <address>
                            <strong>(주)에이티지(ATG.Co., Ltd)</strong><span className="comNum">사업자등록번호 : 144-81-16437</span><span
                            className="ceo">대표이사 : 임강민</span><span className="email">E-mail : info@atg.co.kr</span><br/><span
                            className="address">경기 성남시 분당구 정자일로 100 (정자동, 미켈란쉐르빌) 이동 506~510호</span><span
                            className="tel">Tel : 031-609-0421</span><span className="fax">Fax : 031-624-0421</span>
                            <p>Copyright © ATG.Co.,Ltd Inc. All Right Reserved.
                            </p>
                        </address>
                    </div>
                </div>
            </div>
    )
}

export default Footer;