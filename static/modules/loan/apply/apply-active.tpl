<div class="bg" transition="zoom" transition-mode="out-in">
    <c-header title="额度激活" v-bind:ln-link="'/user/index'"></c-header>
    <div class="mui-content content">
        <div class="noticeOne_img aimg2">
            <p>提交成功</p>
            <div class="noticeTwo_wir"> 
                <ul> 
                    <li>
                        您的激活申请已经受理,请耐心等候审批结果,如信息有异常,我们的工作人员将与您联系,请您保持申请贷款的手机号码畅通。
                    </li>
                </ul>
                <div class="clear"> </div>
            </div> 
            <input type="button" value="申请进度" v-on:click="applyProgress">	
            <div class="clearfix"> </div>
        </div>
    </div> 
</div>