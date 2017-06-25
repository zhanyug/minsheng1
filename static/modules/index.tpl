<div class="bg animated" transition="fade" transition-mode="in-out">
	<div class="content">
		<c-header title="个人中心"></c-header>
		<!-- banner -->
		<!--登录之后-->
		
		<div class="load-banner f-cb" id="load-banner" v-if="isLogin"> 
			<div class="load-logo"><img v-bind:src="'static/images/' + (userGender == '1'? 'user_load_man.jpg' : 'user_load_woman.jpg')"></div>
            <div class="load-text"><a v-on:click="loginOut">张兰的</a></div>
		</div>
		<!--登录之前-->
		<!--<div class="banner about-banner f-cb" id="about-banner" v-else> 
			<div class="banner-logo"><img src="static/images/01_14.png"></div>
            <div class="banner-text">
            	<a v-on:click="toRedirectPages" data-path="/user/login">登录</a> / 
            	<a v-on:click="toRedirectPage" data-path="/user/register">注册</a>
            </div>
		</div>-->
		<div class="load-list">
			
			<ul>
            	<li class="load_a_logo1"><a v-link="{ path: '/loan/apply/query' }">
            		<img src="../images/01_1.png">
            		<p>申请查询</p>
            	</a></li>
                <li class="load_a_logo2"><a v-link="{ path: '/user/loan/query' }">
                	<img src="../images/01_2.png">
                	<p>贷款查询</p>
                </a></li>
                <li class="load_a_logo3"><a v-link="{ path: '/user/loanType'} ">
                	<img src="../images/01_3.png">
                	<p>我要提款</p>
                </a></li>
                <li class="load_a_logo4"><a v-link="{ path: '/userRepayIndex'} ">
                	<img src="../images/01_4.png">
                	<p>我要还款</p>
                </a></li>
            </ul>
             
		</div>
			<div class="load-space">
				<ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
		
		
		<!-- //banner -->  
        <div class="user_category" id="user_load" class="animated" transition="zoom" transition-mode="out-in">
        	<ul>
            	<li><a v-link="{ path: '/user/m-verified', query: { auth: 2} }">
            		<div class="load-img"><img src="../images/01_5.png"></div><span>实名认证</span></a></li>
                <!-- <li><a v-link="{ path: '/user/client-info/set-multi-media', query: { auth: 1} }"><img src="static/images/user_category_06.jpg"><span>图像声纹采集</span></a></li> -->
                <li><a v-link="{  path: '/user/modify-password' }"><div class="load-img1"><img src="../images/01_6.png"></div><span>修改登录密码</span></a></li>
				<li><a v-link="{ path: '/user/client-info/set-trade-password' }"><div class="load-img2"><img src="../images/01_7.png"></div><span>修改交易密码</span></a></li>
                <li><a v-link="{ path: '/user/client-info/set-trade-password', query: { auth: 1} }"><div class="load-img3"><img src="../images/01_8.png"></div><span>修改基础信息</span></a></li>
                <li><a v-link="{ path: '/user/client-info/set-multi-media', query: { auth: 2} }"><div class="load-img4"><img src="../images/01_9.png"></div><span>图像声纹采集</span></a></li>
                 <li><a v-link="{ path: '/loan/apply' }"><div class="load-img5"><img src="../images/01_10.png"></div><span>我的资料</span></a></li>
				<li><a v-link="{ path: '/user/modify-password' }"><div class="load-img6"><img src="../images/01_11.png"></div><span>循环信用类<br>贷款申请</span></a></li>
                <li><a v-link="{ path: '/user/client-info/set-trade-password', query: { auth: 1} }"><div class="load-img7"><img src="../images/01_12.png"></div><span>绑定多张<br>银行卡</span></a></li>
                <li><a v-link="{ path: '/user/login-out' }">
                	<div class="load-img8">
                		<img src="../images/01_13.png"/>
                		
                	</div>
                	<span>退出登录<br />
                		<br />
                	</span>
                </a></li>
                
            </ul>
            <div class="clearfix"> </div>
        </div>
    </div>
</div>
