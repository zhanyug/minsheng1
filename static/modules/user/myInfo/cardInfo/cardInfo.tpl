<header class="mui-bar mui-bar-nav">
	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	<h1 class="mui-title">借记卡信息</h1>
</header>
<div>
	<ul class="div-ul-all">
		<li v-for="item in items" class="div-ui-li-all">
			<ul class="div-ul-li-ul">
				<li class="div-ul-li-bottom">
					{{ item.userName }}
					<label style="float: right;">{{item.defaultFlag | dict 'defaultFlag'}}</label>
				</li>
				<li class="div-ul-li-bottom">
					{{ item.resMobile }}
				</li>
				<li class="div-ul-li-bottom">
					{{ item.bankCard }}
				</li>
			</ul>
		</li>
	</ul>
</div>
