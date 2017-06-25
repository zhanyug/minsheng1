<div class="bg animated" transition="zoom" transition-mode="out-in">
    <c-header title="银行卡绑定"></c-header>
    <div class="mui-content content">
        <!-- loading area -->
        <c-loading v-show="!isContentShow"></c-loading>
        <!-- modal --> 
        <div class="RegisterTwo_img" v-show="!showFlag && isContentShow">
       		<ul>
            	<li><p>注册信息</p></li>
                <li><p>身份验证</p></li>
                <li><p>开户完成</p></li>
            </ul>
            <div class="clearfix"> </div>
       		<cite>
            	<span class="line_one"></span>
                <span class="line_two"></span>
            </cite>
        </div>
		<div class="ForgotPassword_login-form" v-show="!showFlag && isContentShow">
			<form id="m-set-multi-media-form-avatar">
                <p>借记卡正面照片</p>
                <div class="RegisterFour_ps">
                    <div class="left w_45">
                        <span class="RegisterFour_photo">
                            <img id="u-file-set-multi-media-avatar-img" data-index="0" src="/static/images/07_3.png" alt="" v-on:tap="chooseImage" style="margin-bottom:72px;">
                            <!-- <input type="file" accept="image/*;capture=camera" id="u-file-set-multi-media-avatar" single>-->
                        </span>
                        <!--<p>请确认您借记卡卡号</p>-->
                    </div>
                    <!--<div class="right w_45">
                        <span class="RegisterFour_photo">
                            <img id="u-file-set-multi-media-id-card-img" data-index="1" src="/static/images/camera_01.jpg" alt="" v-on:tap="chooseImage">-->
                            <!-- <input type="file" accept="image/*;capture=camera" id="u-file-set-multi-media-id-card" single>-->
                        <!--</span>
                        <p>身份证反面照片</p>
                    </div>-->
                   <div class="clearfix"></div>
                    
                    <!--<div class="RegisterFour_ai">
                    	<ul>
                        	<li><span class="glyphicon glyphicon-ok-sign"><p>标准</p></span></li>
                            <li><span class="glyphicon glyphicon-remove-sign"><p>不完整</p></span></li>
                            <li><span class="glyphicon glyphicon-remove-sign"><p>照片模糊</p></span></li>
                            <li><span class="glyphicon glyphicon-remove-sign"><p>反光强烈</p></span></li>
                        </ul>
                         <div class="clearfix"></div>
                    </div>-->
                </div>
                
                <div class="RegisterFour_card">
				<p style="color:#333; font-size:1.2em;  text-align:center">请确认您的借记卡卡号</p>
				<ul class="ulyang_1">
                	<li  class="yangshi_1"><img style="width:7%;" src="../../../images/logo_12.png"><input type="text"></li>
           		</ul>
            	<div class="yuedu dis_flex align_cen"><a>*此账户将用于提现和还款</a></div>
                	<ul>
                        <li class="RegisterFour_s1">
                            您的姓名：<input type="text" v-model="name" placeholder="姓名" data-type="*"> 
                            <div class="clearfix"></div>
                        </li>
                        <li class="RegisterFour_s2">
                            身份证号：<input type="text" v-model="idCard" v-on:keyup="idCardAutoCapitalize" placeholder="请输入身份证号" data-type="sfz">
                            <div class="clearfix"></div>
                        </li>
                        <li class="RegisterFour_s3">
                            <span style="">身份证有效期：</span><br />
                            <!--<div class="validate-date f-fr">
                                <input type="text" class="f-fl" id="pickDateBtn" v-model="period" data-options='{"type":"date","endYear":2199}' placeholder="请输入身份证截止日期" readonly="readonly" data-type="sfz-dt" style="width: auto;">
                                <div class="mui-switch mui-switch-blue f-fr">
                                    <div class="mui-switch-handle"></div>
                                </div>
                            </div>-->
                            <span class="dis_flex justify_sp align_cen">
                            	<input type="text" value="2006.06.20" readonly>-<input type="text" value="2016.06.20" readonly>
                            	
                            </span>
                            <div class="clearfix"></div>
                        </li>
                    </ul>
                    <button type="button" v-on:tap="goNext" v-bind:class="saveBtnClass" v-html="saveBtnText"></button>
                </div>
                </label>
			</form>
            <div class="clearfix"> </div>
		</div>
        <div class="ForgotPassword_login-form" v-show="showFlag && isContentShow">
            <ul class="drawMoneyFive_a"> 
                <li><i>姓名： </i>{{ nameShow }}</li>
                <li><i>身份证号： </i>{{ idCardShow }}</li>
                <li><i>证件有效期： </i>{{ idPeriodShow | format-datetime 'yyyy-MM-dd' }}</li>
                <li><i>绑定卡信息： </i>{{ bankCardShow }}</li>
                <li><i>预留手机号： </i>{{ resMobileShow }}</li>
                <div class=" clearfix"> </div>
            </ul>
            <input type="button" value="返回" v-on:click="closeCur">   
            <div class="clearfix"> </div>
        </div>
    </div>
</div>
