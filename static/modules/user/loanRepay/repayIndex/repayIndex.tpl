<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="我要还款" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
    	<div class="noticeOne_img repaymentOne_hi">
            <div id="menu">
                <!--repaymentOne_tag标题-->
                <ul id="nav">
                    <li><a v-bind:class="dateClass" v-on:click="changeTaps(1)">按期还款</a></li>
                    <li ><a v-bind:class="dataClass" v-on:click="changeTaps(2)">按笔还款</a></li>
                </ul>
                <div class="clearfix"></div>
                <!--二级菜单-->
                <div id="menu_con">
                    <div  id="div_001" v-bind:style="dateStyle">
                        <span id="JKDiv_0" class="repaymentOne_tagtop" >
                        	<ul>
                            	<li><b></b></li>
                            	<li>七天还款</li>
                                <li>{{ seven_day_amt | format-amount 2 }}</li>
                                <li>总贷款{{ all_loan_amt | format-amount 2 }}元</li>
                            </ul>	
                        </span>
                        <span id="JKDiv_1" style="display:none" class="repaymentOne_tagtop">
                        	<ul>
                            	<li><b></b></li>
                            	<li>一个月还款</li>
                                <li>{{ one_month_amt | format-amount 2 }}</li>
                                <li>总贷款{{ all_loan_amt | format-amount 2 }}元</li>
                            </ul>
                        </span>
                        <span id="JKDiv_2" style="display:none" class="repaymentOne_tagtop">
                        	<ul>
                            	<li><b></b></li>
                            	<li>全部还款</li>
                                <li>{{ all_unpaid_amt | format-amount 2}}</li>
                                <li>总贷款{{ all_loan_amt | format-amount 2 }}元</li>
                            </ul>
                        </span>
                        <p class="clearfix"></p>
                        <p class="repaymentOne_table"><cite v-on:click="ChangeDiv(0,'JKDiv_',2)" ><i style=" background-color:#e4a94f; color:#fff;">七天</i></cite>
                        <cite v-on:click="ChangeDiv(1,'JKDiv_',2)" ><i>一个月</i></cite>
                        <cite v-on:click="ChangeDiv(2,'JKDiv_',2)" ><i>全部</i></cite></p>
                        <input type="button" value="立即还款" v-on:click="toDateRepay">
                    </div> 
                    <div class="repaymentOne_tag" id="div_002" v-bind:style="dataStyle">
                        <a><canvas id="myCanvas" >{{ replay_progress_scale }}</canvas></a>
                        <ul>
                            <li><p>{{ all_replay_num | format-amount 2 }}</p><span>总借款笔数</span></li>
                            <li><p>{{ all_loan_amt | format-amount 2 }}</p><span>总借款金额</span></li>
                            <li><p>{{ all_loan_os_prcp | format-amount 2}}</p><span>未还本金</span></li>
                        </ul>
                       <input type="button" value="立即还款" v-on:click="toDataRepay">
                    </div>
                </div>                        	
            </div> 
    	</div> 
    </div>
</div>
