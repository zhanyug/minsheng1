<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="图像声纹采集" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
        <c-loading v-show="view.isLoading"></c-loading>
        <div class="m-loading-area" v-show="!view.isLoading">
            <!-- modal -->
            <div class="RegisterTwo_img" v-show="showProgress">
          		<ul>
              	    <li><span class="glyphicon glyphicon-usd"></span><p>交易密码</p></li>
                    <li><span class="glyphicon glyphicon-film"></span><p>多媒体</p></li>
                    <li><span class="glyphicon glyphicon-edit"></span><p>基础信息</p></li>  
                </ul>
                <div class="clearfix"> </div>
          		<cite>
              	    <span class="line_one"></span>
                    <span class="line_two"></span>
                </cite>
            </div>
        	<div class="ForgotPassword_login-form">
        		<form id="m-set-multi-media-form-avatar">
                    <div class="RegisterFour_ps">
                      	<div class="left w_45">
                        	<span class="RegisterFour_photo">
                        	    <img id="u-file-set-multi-media-avatar-img" src="static/images/camera_01.jpg" alt="" data-index="0" v-on:click="chooseImage">
                                <!-- <input type="file" accept="image/*;capture=camera" id="u-file-set-multi-media-avatar" single>-->
                            </span>
                            <p>本人实时头像</p>
                        </div>
                      	<div class="right w_45">
                            <span class="informationTwo_write1">
                                <span class="informationTwo_bg"></span>
                            </span>
                            <p>照片样式</p>
                      	</div>
                        <div class="clearfix"></div>
                        <div class="left w_45">
                          	<span class="RegisterFour_photo">
                          	    <img id="u-file-set-multi-media-id-card-img" src="static/images/camera_01.jpg" alt="" data-index="1" v-on:click="chooseImage">
                                <!-- <input type="file" accept="image/*;capture=camera" id="u-file-set-multi-media-id-card" single>-->
                            </span>
                            <p>本人手持身份证</p>
                        </div>
                    	<div class="right w_45">
                            <span class="informationTwo_write2">
                                <span class="informationTwo_bg"></span>
                            </span>
                            <p>照片样式</p>
                    	</div>
                        <div class="clearfix"></div>
                        <div class="left w_45">
                            <button type="button" style="margin-top: 0;padding: 0.5rem;margin-bottom: 0.5rem;" v-on:click="startRecord" v-html="voiceRecordBtnText">开始录音</button>
                            <button type="button" style="margin-top: 0;padding: 0.5rem;" v-on:click="playRecord" v-html="playRecordBtnText"><i class="fa fa-play"></i> 播放录音</button>
                            <p>音频认证</p>
                        </div>
                    	<div class="right w_45 informationTwo_write3">
                            <p class="blue">"中原消费金融服务全面介绍投资理财丰富多样"</p>
                            <p>点击左侧录音按钮，用普通话阅读以上蓝色文字，直至录音完毕</p>
                    	</div>
                        <div class="clearfix"></div>
                    </div>
          			<button class="up_20" type="button" v-bind:class="saveBtnClass" v-on:click="saveMultiMedia" v-html="saveBtnText"></button>
          		</form>
                <div class="clearfix"> </div>
          	</div>
        </div>
	</div> 
</div>
