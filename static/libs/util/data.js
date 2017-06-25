/*
 * store data dictionary
 */
module.exports = {
	sex:[{
		id: '01',
		text: '男'
	}, {
		id: '02',
		text: '女'
	}],
	loanUseType:[{
		value: '3C',
		text: '3C产品'
	}, {
		value: 'DEC',
		text: '家装'
	}, {
		value: 'EDU',
		text: '教育'
	}, {
		value: 'MAR',
		text: '婚庆'
	}, {
		value: 'NXP',
		text: '耐用消费品'
	}, {
		value: 'TRA',
		text: '旅游'
	}, {
		value: 'OTH',
		text: '其他'
	}],
	defaultFlag:[{
		id: '0',
		text: '默认为绑定卡'
	}, {
		id: '1',
		text: ''
	}],
	applyStatus: [{
		id: '00',
		text: '申请待提交'
	}, {
		id: '01',
		text: '初审中'
	}, {
		id: '10',
		text: '合同待签订'
	}, {
		id: '20',
		text: '审批中'
	}, {
		id: '88',
		text: '待银行处理'
	}, {
		id: '99',
		text: '结束'
	}, {
		id: 'A1',
		text: '提款成功'
	}, {
		id: 'A2',
		text: '提款失败'
	}, {
		id: 'A3',
		text: '还款成功'
	}, {
		id: 'A4',
		text: '还款失败'
	}],
	mtd_cdeDa: [{
		id: '01',
		text: '等额本息'
	}, {
		id: '02',
		text: '等额本金'
	}, {
		id: '03',
		text: '利随本清'
	}, {
		id: '04',
		text: '按期还息到期还本'
	}],
	fee_typData: [{
		id: '01',
		text: '账户管理费'
	}, {
		id: '02',
		text: '滞纳金'
	}, {
		id: '03',
		text: '违约金'
	}, {
		id: '06',
		text: '手续费'
	}, {
		id: '09',
		text: ' 其他'
	}, {
		id: '99',
		text: ' 暂无数据'
	}],
	ps_stsDa: [{
		id: '1',
		text: '正常'
	}, {
		id: '2',
		text: '逾期未结清'
	}, {
		id: '3',
		text: '曾逾期已结清'
	}, {
		id: '4',
		text: '结清'
	}],
	settl_typeDa: [{
		id: 'BAT',
		text: '系统自动到期扣款'
	}, {
		id: 'ACTKF',
		text: '扣款型主动支付'
	}, {
		id: 'ACTDD',
		text: '订单型主动支付'
	}, {
		id: 'NORMAL',
		text: ' 还款中'
	}, {
		id: 'SETL',
		text: '  已结清'
	}],
	applType: [{
		id: 'XFDK',
		text: '贷款申请'
	}, {
		id: 'FKSQ',
		text: '提款申请'
	}, {
		id: 'ZDHK',
		text: '还款申请'
	}],
	chargeoff_ind: [
	{id: '01', text: '一次性放款'},
	{id: '02', text: '多次不循环放款'},
	{id: '03', text: '多次循环放款'}],
	loanStatus: [{
		id: 'NORM',
		text: '正常'
	}, {
		id: 'DELQ',
		text: '拖欠'
	}, {
		id: 'OVER',
		text: '逾期'
	}, {
		id: 'CLSDB',
		text: '关闭'
	}, {
		id: 'OFFED',
		text: '核销'
	}, {
		id: 'ACTV',
		text: '已发放'
	}, {
		id: 'SETL',
		text: '已结清'
	}],
	apply_tnr_typ: [{
		id: '3',
		text: '3个月'
	}, {
		id: '6',
		text: '6个月'
	}, {
		id: '12',
		text: '12个月'
	}, {
		id: '15', 
		text: '15个月'
	}, {
		id: '18', 
		text: '18个月'
	}, {
		id: '24',
		text: '24个月'
	}, {
		id: '36',
		text: '36个月'
	}, {
		id: 'D',
		text: '按天'
	}, {
		id: 'M',
		text: '按其他月'
	}],
	id_typ: [{
		value: '20',
		text: '身份证'
	}, {
		value: '22',
		text: '护照'
	}, {
		value: '25',
		text: '港澳居民来往内地通行证'
	}, {
		value: '26', 
		text: '台湾居民来往大陆通行证'
	}, {
		value: '2X', 
		text: '其他证件'
	}],
	indiv_edu: [{
		value: '00',
		text: '研究生及以上'
	}, {
		value: '10',
		text: '本科'
	}, {
		value: '20',
		text: '大专'
	}, {
		value: '30', 
		text: '高中'
	}, {
		value: '40', 
		text: '初中及以下'
	}, {
		value: '50', 
		text: '中专'
	}],
	indiv_degree: [{
		value: '0',
		text: '其他'
	}, {
		value: '1',
		text: '名誉博士'
	}, {
		value: '2',
		text: '博士'
	}, {
		value: '3', 
		text: '硕士'
	}, {
		value: '4', 
		text: '学士'
	}, {
		value: '9', 
		text: '未知'
	}],
	position_opt: [{
		value: '10',
		text: '受薪人士'
	}, {
		value: '20',
		text: '自雇人士'
	}, {
		value: '40',
		text: '学生'
	}, {
		value: '50', 
		text: '其他'
	}],
	indiv_indtry: [
	{value: 'A', text: '农、林、牧、渔业'},
	{value: 'B', text: '采掘业'},
	{value: 'C', text: '制造业'},
	{value: 'D', text: '电力、燃气及水的生产和供应业'},
	{value: 'E', text: '建筑业'},
	{value: 'F', text: '交通运输、仓储和邮政业'},
	{value: 'G', text: '信息传输、计算机服务和软件业'},
	{value: 'H', text: '批发和零售业'},
	{value: 'I', text: '住宿和餐饮业'},
	{value: 'J', text: '金融业'},
	{value: 'K', text: '房地产业'},
	{value: 'L', text: '租赁和商务服务业'},
	{value: 'M', text: '科学研究、技术服务业和地质勘察业'},
	{value: 'N', text: '水利、环境和公共设施管理业'},
	{value: 'O', text: '居民服务和其他服务业'},
	{value: 'P', text: '教育'},
	{value: 'Q', text: '卫生、社会保障和社会福利业'},
	{value: 'R', text: '文化、体育和娱乐业'},
	{value: 'S', text: '公共管理和社会组织'},
	{value: 'T', text: '国际组织'},
	{value: 'Z', text: '未知'}
	],
	indiv_emp_typ: [
	{value: '0', text: '国家机关、党群组织、企业、事业单位负责人'},
	{value: '1', text: '专业技术人员'},
	{value: '3', text: '办事人员和有关人员'},
	{value: '4', text: '商业、服务业人员'},
	{value: '5', text: '农、林、牧、渔、水利业生产人员'},
	{value: '6', text: '生产、运输设备操作人员及有关人员'},
	{value: 'X', text: '军人'},
	{value: 'Y', text: '不便分类的其他从业人员'},
	{value: 'Z', text: '未知'}
	],
	indiv_position: [
	{value: '1', text: '高级领导'},
	{value: '2', text: '中级领导'},
	{value: '3', text: '一般员工'},
	{value: '4', text: '其他'},
	{value: '9', text: '未知'}
	],
	live_info: [
	{value: '10', text: '自购现无贷款'},
	{value: '20', text: '自购现有贷款'},
	{value: '30', text: '与父母同住'},
	{value: '40', text: '宅基地房'},
	{value: '50', text: '租房'},
	{value: '60', text: '军产房'},
	{value: '70', text: '小产权'},
	{value: '99', text: '其他'}
	],
	indiv_marital: [{
		value: '10',
		text: '未婚'
	}, {
		value: '20',
		text: '已婚'
	}, {
		value: '90',
		text: '其他'
	}]
};

