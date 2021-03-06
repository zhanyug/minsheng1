<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="每期还款计划详情" v-bind:ln-link="'/userRepayIndex'"></c-header>
    <div id="repay_list" class="mui-content content">
        <!-- 按期限还款 -->
        <div class="repaymentTwo_hi" v-show="isDateFlag">
            <!--tagall标题-->
            <div class="tagall">
	            <ul id="navall">
	                <li><a v-bind:class="{'selectedall': navClass=='0'}" v-on:click="toGetInfo('0')"><p>七天</p><!--<span>￥{{ seven_day_amt | format-amount 2 }}</span>--></a></li>
	                <li><a v-bind:class="{'selectedall': navClass=='1'}" v-on:click="toGetInfo('1')"><p>一个月</p><!--<span>￥{{ one_month_amt | format-amount 2 }}</span>--></a></li>
	                <li><a v-bind:class="{'selectedall': navClass=='2'}" v-on:click="toGetInfo('2')"><p>全部</p><!--<span>￥{{ all_unpaid_amt | format-amount 2}}</span>--></a></li>
	                <div class="clearfix"></div>
	            </ul>
            </div>
            <!--二级菜单-->
            <c-loading v-if="!view.isDataLoaded"></c-loading>
            <div id="menu_conall" v-if="view.isDataLoaded">
                <div class="tagall f-db">
                    <span id="{{ itemList.ps_perd_no }}#{{ itemList.loan_no }}" class="repaymentTwo_a" v-for="itemList in itemLists">
                        <span class="repaymentTwo_b">
                            <span class="repaymentTwo_dian"></span>
                        </span>
                        <div class="repay-number">借据编号 : {{ itemList.loan_no }}
                        <span class="repaymentTwo_d mui-icon mui-icon-forward" v-on:click="toInfo(itemList)"></span>
                        </div>
                        <div class="repay-detail">
                        	<div><span></span></div>
	                        <ul class="repaymentTwo_c" v-on:click="choseUl(itemList)"> 
	                        	<!--<li></li>-->
	                        	<li>还款额：<i>￥{{ itemList.ps_instm_amt | format-amount 2 }}</i></li>
	                          <li>还款日： <em>{{ itemList.ps_due_dt }}</em></li>
	                        </ul>
						</div>
                        <p class="clearfix"></p>
                    </span>

                    <span class="repaymentTwo_aa" v-bind:class="checkClass">
                        <!--span class="repaymentTwo_b">
                            <span class="repaymentTwo_dian_b"></span>               
                        </span>
                        <ul class="repaymentTwo_e">
                            <li>本金合计：<i>￥</i></li>
                            <li>仅供参考,以最终结算的金额为准</li>
                        </ul-->
                       <!-- <input v-bind:class="goRepayBtnClass" v-on:click="goRepay" type="button" value="立即还款">-->
                       	<div class="button2 order-bottom">
                       		<span>本次还款金额：￥
                       		<i>1254</i>
                       		</span>
                       		<a v-bind:class="goRepayBtnClass" v-on:click="goRepay">立即还款</a>
                       	</div>
                        <p class="clearfix"></p>
                    </span>
                </div> 
            </div>
        </div>
        <!-- 按笔还款 -->
        <div class="repaymentTwo_hi" v-show="!isDateFlag">
            <!--二级菜单-->
            <div id="menu_conall">
                <div class="tagall f-db">
                    <!-- content begin --> 
                    <span class="repaymentTwo_a" v-for="item in items" v-on:click="toggleItem(item)" v-bind:class="{'onclick_a': item.loan_no == loan_no}">
                        <span class="repaymentTwo_b">
                            <span class="repaymentTwo_dian"></span>
                        </span>
                        <ul class="repaymentTwo_c">
                            <li>提款日期： {{ item.loan_actv_dt }}</li>
                            <li>借据编号 : {{ item.loan_no }}
                                <span style="color:orange" v-if="item.lm_flag == 'Y'">(审批中)</span>
                                <span style="color:orange" v-if="item.loan_sts == 'CLSDB' || item.loan_sts == 'OFFED' || item.loan_sts == 'SETL'">({{ item.loan_sts | dict 'loanStatus' }})</span>
                            </li>
                            <li>
                                <span class="repaymentTwo_copy_a">借款金额：</span><i>￥{{ item.orig_prcp | format-amount 2 }}</i>
                        </ul>
                        <span class="mui-icon mui-icon-forward repaymentTwo_d" v-on:click="toLoanInfo(item.loan_no)"></span>
                        <p class="clearfix"></p>
                    </span>
                  <input type="button" value="立即还款" class="btn-cm" v-on:click="repay">
                    <!-- content  end -->
                </div> 
            </div>
        </div>
    </div>
</div>