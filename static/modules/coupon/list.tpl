<header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" href="#loanApplyQueryPopover"></a>
    <h1 class="mui-title">优惠券</h1>
</header>
<div class="mui-content">
    <div id="slider" class="mui-slider mui-fullscreen">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll" style="width:100%">
                <a style="width:50%" class="mui-control-item mui-active" data-type="1" href="#m-loan-apply-all">可用</a>
                <a style="width:50%" class="mui-control-item" data-type="2" href="#m-loan-apply-handling">历史</a>
            </div>
        </div>
        <div class="mui-slider-group" style="margin-top:1rem">
            <div id="m-all" class="mui-slider-item mui-control-content mui-active" style="border-top:none;">
                <div id="scroll-wrapper1" class="mui-scroll-wrapper">
                    <div id="scroll-current-coupon-list" class="mui-scroll couponfour_hi">
                        <template v-for="item in items">
                            <!--二级菜单-->
                            <div class="clearfix"></div>
                            <!-- coupon begin -->
                            <div class="couponfour_word">
                                <div class="couponfour_top"></div>
                                <div class="couponfour_text">
                                    <div class="couponsix_text_left">
                                        <ul>
                                            <li>利息卷</li>
                                            <li>
                                                <div class="circle" style="left:0">
                                                    <div class="pie_left">
                                                        <div class="left"></div>
                                                    </div>
                                                    <div class="pie_right">
                                                        <div class="right"></div>
                                                    </div>
                                                    <div class="mask"><span>70</span>%</div>
                                                </div>
                                             </li>
                                            <li>立即领取</li>
                                        </ul>
                                    </div>
                                    <div class="couponsix_text_right">
                                        <ul>
                                            <li>100.00<sup>%</sup><i>(三个月)</i></li>
                                            <li><span>金额:</span>￥1000~10000  可用</li>
                                            <li><span>期限:</span>1~6个月  可用</li>
                                            <li><span>最高抵扣:</span>1000元</li>
                                            <li><span>有效期:</span>2016.10.01~2016.10.31</li>
                                        </ul>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="couponfour_text_bo" v-on:click="isShowMoreInfo">
                                        <span>适用范围</span>
                                        <span class="glyphicon glyphicon-triangle-bottom"></span>
                                        <div class="clearfix"></div>
                                        <ul>
                                            <li><span>适用产品:</span>全品类</li>
                                            <li><span>适用场景:</span>全场景(借据、提款、还款)</li>
                                            <li><span>适用渠道:</span>全渠道(微信、银联、合作商户)</li>
                                            <li><span>商户名称:</span>京东商城</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="couponfour_bottom"></div>
                            </div>
                            <!-- coupon end -->
                        </template>
                    </div>
                </div>
            </div>
            <div id="m-all-handling" class="mui-slider-item mui-control-content" style="border-top:none;">
                <div id="scroll-wrapper2" class="mui-scroll-wrapper">
                    <div id="scroll-history-coupon-list" class="mui-scroll">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>