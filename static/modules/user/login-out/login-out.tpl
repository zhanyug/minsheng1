<div class="bg animated" transition="fade" transition-mode="in-out">
	<c-header title="个人中心"></c-header>
	<div class="content">
		<!-- banner -->
		<!--<div class="load-banner f-cb" id="load-banner" v-if="isLogin"> 
			<div class="load-logo"><img v-bind:src="'static/images/' + (userGender == '1'? 'user_load_man.jpg' : 'user_load_woman.jpg')"></div>
            <div class="load-text"><a v-on:click="loginOut">退出</a></div>
		</div>-->
		<div class="banner about-banner f-cb" id="about-banner" v-else> 
			<div class="banner-logo"><img src="static/images/01_14.png"></div>
            <div class="banner-text">
            	<a v-on:click="toRedirectPages" data-path="/user/login">登录</a> / 
            	<a v-on:click="toRedirectPage" data-path="/user/register">注册</a>
            </div>
		</div>
		<div class="load-list">
			
			<ul>
            	<li class="load_a_logo1"><a v-link="{ path: '/loan/apply/query' }">
            		<img src="../../../images/01_1.png">
            		<p>申请查询</p>
            	</a></li>
                <li class="load_a_logo2"><a v-link="{ path: '/user/loan/query' }">
                	<img src="../../../images/01_2.png">
                	<p>贷款查询</p>
                </a></li>
                <li class="load_a_logo3"><a v-link="{ path: '/user/loanType'} ">
                	<img src="../../../images/01_3.png">
                	<p>我要提款</p>
                </a></li>
                <li class="load_a_logo4"><a v-link="{ path: '/userRepayIndex'} ">
                	<img src="../../../images/01_4.png">
                	<p>我要还款</p>
                </a></li>
            </ul>
             
		</div>
		
		<!--<div class="load-list">
			<ul>
            	<li class="load_a_logo1">
            		<a v-link="{ path: '/loan/apply/query' }">申请查询</a>
            	</li>
                <li class="load_a_logo2">
                	<a v-link="{ path: '/user/loan/query' }">贷款查询</a>
                </li>
                <li class="load_a_logo3">
                	<a v-link="{ path: '/user/loanType'} ">我要提款</a>
                </li>
                <li class="load_a_logo4">
                	<a v-link="{ path: '/userRepayIndex'} ">我要还款</a>
                </li>
           </ul>
		</div>-->
		<div class="load-space">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<!--<div class="banner about-banner f-cb" id="about-banner" v-else> 
			<div class="banner-logo"><img src="static/images/logo_user.jpg"></div>
            <div class="banner-text"><a v-on:click="toRedirectPage" data-path="/user/login">登录</a> / <a v-on:click="toRedirectPage" data-path="/user/register">注册</a></div>
		</div>-->
		<!-- //banner -->  
<!--        <div class="user_category" id="user_load" class="animated" transition="zoom" transition-mode="out-in">-->
<div class="wode_7">
            <ul>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8" v-link="{ path: '/user/m-verified', query: { auth: 1} }">
                        <img src="../../../images/logo_5.png">
                        <i>实名认证</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_6.png">
                        <i>修改登录密码</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_7.png">
                        <i>修改交易密码</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen nobor">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_8.png">
                        <i>修改基础信息</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
            </ul>
            <ul>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_9.png">
                        <i>图像声纹采集</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_10.png">
                        <i>还款卡号变更</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen nobor">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_11.png">
                        <i>循环信用类贷款申请</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
            </ul>
            <ul>
                <li class="dis_flex justify_sp align_cen">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_12.png">
                        <i>我的资料</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
                <li class="dis_flex justify_sp align_cen nobor">
                    <a class="dis_flex align_cen wode_8">
                        <img src="../../../images/logo_13.png">
                        <i>退出登录</i>
                    </a>
                    <a class="glyphicon glyphicon-menu-right wode_9"></a>
                </li>
            </ul>
        </div>
            <!--<div class="clearfix"></div>
        </div>-->
    </div>
</div>
