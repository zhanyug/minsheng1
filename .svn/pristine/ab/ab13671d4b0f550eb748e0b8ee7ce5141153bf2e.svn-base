<div class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="上传影像采集" v-bind:no-ln-link="true" v-bind:no-rn-link="true"></c-header>
    <div class="mui-content content">
	<c-loading v-show="view.isLoading"></c-loading>
	<div class="ForgotPassword_login-form" v-show="!view.isLoading">
		<div v-for="file in files">
			<p class="f-tac">上传附件{{$index+1}}</p>
	    	<div class="RegisterThree_photo cms-multi-media upload-img">
	        	<img src="static/images/camera_01.jpg" alt="" v-on:click="chooseImage" id="{{ file.filePrint }}" style="width:100%;">
	        	<span class="glyphicon glyphicon-remove-sign closefpdl" v-show="files.length != 1" v-on:click="delFile" data-print="{{ file.filePrint }}"></span>	
	        </div>
        </div>
        <div class="RegisterThree_photo cms-multi-media" v-show="files.length < 5">
        	<img src="static/images/camera_02.jpg" v-on:click="addFile">
        </div>
        <div class="clearfix"> </div>
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block block-indent mui-btn-radius radius-mid" v-bind:class="saveBtnClass" v-on:click="saveMultiMedia" v-html="saveBtnText">提交</button>
        <div class="clearfix"> </div>
	</div>
</div>