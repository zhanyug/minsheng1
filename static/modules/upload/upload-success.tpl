<body class="bg" transition="zoom" transition-mode="out-in">
	<c-header title="上传影像采集" v-bind:no-ln-link="true" v-bind:no-rn-link="true"></c-header>
    <div class="mui-content content">
		<div class="noticeOne_img aimg2">
	        <div class="noticeTwo_wir"> 
				<ul> 
					<li>您提供的影像资料已上传成功，可以选择继续上传或关闭。</li>
				</ul>
				<div class="clear"> </div>
			</div>
	        <input type="button" value="退出" v-on:click="closeWxView">
	        <div class="clearfix"> </div>
		</div>
	</div>
</div>