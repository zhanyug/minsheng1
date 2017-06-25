<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="贷款申请进度轨迹" v-bind:ln-link="'/loan/apply/query'"></c-header>
    <div class="mui-content content">
        <!-- modal -->
        <div class="m-loading" v-show="!isProgressShow">
            <span class="mui-icon mui-icon-spinner spin"></span> 加载中…
        </div>
        <div v-show="isProgressShow" class="animated" transition="fadeUp" transition-mode="out-in">
            <div class="ForgotPassword_login-form" v-show="loanFlag">
               <!-- <p style="font-size:1.2em">您的贷款申请{{ endTitle }}</p>-->
                <div class="ApplicationStatusOne_hh1">
                    <ul>
                        <span class="ApplicationStatusOne_hh2" v-bind:style="spanStyle">start</span>
                        <li v-for="step in progressSteps" v-bind:class="{ 'ASOne__blue': step.operate_time != null && step.operate_time != '' }" v-bind:style="liStyle">
                            <b>&nbsp;{{ step.operate_time }}</b>
                            <i>{{ $index + 1 }}</i>
                            <cite>
                                <p>{{ step.out_sts_desc }}</p>
                                <a v-if="step.showSign == 'Y'" v-on:click="sign">立即签订</a></cite>
                        </li>
                        <div class="clearfix"></div>
                        <div id="AppSOP" class="AppSOP">
                            <p v-for="step in progressSteps" v-bind:class="{ 'AppSOP_blue': step.operate_time != null && step.operate_time != '' }" v-bind:style="pStyle"></p>
                            <p v-bind:class="endClass" v-bind:style="pStyle"></p>
                        </div>
                        <span class="ApplicationStatusOne_hh3" v-bind:style="spanStyle">end</span>
                    </ul>
                </div>
                                <div class="button1_1"><input class="button1" type="button" value="提&nbsp;&nbsp;交"></div>
                <div class="clearfix"></div>
            </div>
            <div class="ForgotPassword_login-form" v-show="!loanFlag">
                <p style="font-size:1.2em">您的{{applTypeText}}{{ endTitle }}</p>
                <div class="ApplicationStatusTwo_hh1">
                    <ul>
                        <span class="ApplicationStatusOne_hh2" v-bind:style="spanStyle">start</span>
                        <li v-for="step in progressSteps" v-bind:class="{ 'ASOne__blue': step.operate_time != null && step.operate_time != '' }" v-bind:style="liStyle">
                            <b>&nbsp;{{ step.operate_time }}</b>
                            <i>{{ $index + 1 }}</i>
                            <cite>
                                <p>{{ step.out_sts_desc }}</p>
                            </cite>
                        </li>
                        <div class="clearfix"></div>
                        <span class="ApplicationStatusOne_hh3" v-bind:style="spanStyle">end</span>
                    </ul>
					<div id="AppSTP" class="AppSOP">
                            <p v-for="step in progressSteps" v-bind:class="{ 'AppSOP_blue': step.operate_time != null && step.operate_time != '' }" v-bind:style="pStyle"></p>
                            <p v-bind:class="endClass" v-bind:style="pStyle"></p>
                        </div>
                </div>
 
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
    <!-- //modal -->
</div>