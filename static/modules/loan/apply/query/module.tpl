<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="申请查询" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content" style="background-color:#eaeaea;height: 100vh;">
        <!-- modal -->
        <div class="applicationStatusThree_a">
        	<ul class="applicationStatusThree_b">
            	<li><a href="javascript:void(0)" v-bind:class="{'blue': data.app_sts == ''}" v-on:click="onTap('')">全部</a></li>
                <li><a href="javascript:void(0)" v-bind:class="{'blue': data.app_sts == '1'}" v-on:click="onTap('1')">处理中</a></li>
                <li><a href="javascript:void(0)" v-bind:class="{'blue': data.app_sts == '2'}" v-on:click="onTap('2')">已完成</a></li>
                <a class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#loanApplyQueryPopover"></a>
                <div class="clearfix"></div>
            </ul>
        </div>
        <div class="applicationStatusThree_c" id="scroll">
        	<dl class="applicationStatusThree_d" v-for="item in showItems" v-on:click="onClick(item)">
            	<dt>
                	<p>{{ item.apply_dt | subStr 0 4}}<br>{{ item.apply_dt | subStr 5}}</p>
                    <cite><i v-bind:class="{'orange': item.out_sts != 99}"></i>{{ item.out_sts | dict 'applyStatus' }}</cite>
                </dt>
                <dd>
                	<div class="applicationStatusThree_e">
                	<p>{{ item.appl_type | dict 'applType' }}</p>
                    <cite v-if="item.appl_type != 'XFDK'">申请金额（元）:<i>{{ item.apply_amt | format-amount 2 }}</i></cite>
                    </div>
                </dd>
                <div class="clearfix"></div>
            </dl>
        </div>
	</div> 
    <!-- //modal --> 
</div>
<!--右上角弹出菜单-->
<div id="loanApplyQueryPopover" class="mui-popover" style="width:122px">
    <div class="mui-popover-arrow"></div>
    <div class="mui-scroll-wrapper" style="height:168px; margin-top: 51px">
        <div class="mui-scroll">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-bind:class="{'blue': data.appl_type == ''}" v-on:click="onMenu('')">全部订单</li>
                <li class="mui-table-view-cell" v-bind:class="{'blue': data.appl_type == 'XFDK'}" v-on:click="onMenu('XFDK')" >贷款申请</li>
                <li class="mui-table-view-cell" v-bind:class="{'blue': data.appl_type == 'FKSQ'}" v-on:click="onMenu('FKSQ')" >提款申请</li>
                <li class="mui-table-view-cell" v-bind:class="{'blue': data.appl_type == 'ZDHK'}" v-on:click="onMenu('ZDHK')" >还款申请</li>
            </ul>
        </div>
    </div>
</div>