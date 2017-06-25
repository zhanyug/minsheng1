<div class="bg">
    <div class="content">
    	<c-header title="登录"></c-header>
        <div class="header_entry">
        	<div class="logo-img">
        		<img src="../../../images/logo_1.jpg" alt="" />
        	</div>
            <div class="login-form">
                <form action="#" method="post" id="m-form-login">
                    <div class="styled-input">
                        <span><img src="../../../images/logo_4.png" alt="" /></span>
                        <input type="text" placeholder="请输入手机号" v-model="mobile">
                    </div>
                    <div class="styled-input">
                        <span><img src="../../../images/logo_6.png" alt="" /></span>
                        <input type="password" placeholder="请输入登录密码" v-model="password" data-type="*{1,60}" v-on:keyup.enter="login"> 
                    </div> 
                    <!--<div class="wthree-text">
                        <ul>
                            <li><a v-on:click="toRedirectPage">忘记密码？</a></li>
                        </ul>
                        <div class="clear"> </div>
                    </div>-->
                    <input type="button" value="登&nbsp;&nbsp;录" v-on:click="login">
                    	<div class="login-bottom">
                    		<p><a v-on:click="toRegPage">新用户注册&nbsp;&nbsp;</a>|<a v-on:click="toRedirectPage">&nbsp;忘记密码？</a></p>
                    	</div>
                   <!-- <input type="button" value="注册" v-on:click="toRegPage" class="whitebutton">-->
                </form>
                <div id="codeDiv" class="f-dn">
                    <div class="mui-input-row">
                        <label style="width: 30%; ">验证码</label>
                        <input style="width: 45%;" id="chk" type="text" style="" class="mui-input" v-model="code" placeholder="请输入验证码" data-type="vc">
                        <canvas style="width: 25%;" class="main-canvass" id="myCanvas" v-on:click="changeCanvas"></canvas> 
                    </div>
                </div>
            </div>	
        </div> 
    </div>
    <!--a v-on:click="toRegPage" class="login-form_rass">没有账号？马上注册</a-->
</div>