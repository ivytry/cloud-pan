import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal, Radio, Input, Select, Icon } from 'antd';
import 'antd/dist/antd.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const success = (msg) => {
  message.success(msg);
};

class ShareModal extends PureComponent{
    shareModelInner(){
    	const { okSuccess, shareForm, shareExpiry, handleChangeExpiry } = this.props
    	const radioStyle = {
	      display: 'block',
	      height: '30px',
	      lineHeight: '30px',
	    };
    	if(!okSuccess){
    		return (
    			<Fragment>
	    			<RadioGroup onChange={shareForm} value={shareForm}>
			        	<Radio style={radioStyle} value={1}>加密 仅限拥有密码者可查看，更加隐私安全</Radio>
			        	<Radio style={radioStyle} value={2}>公开 任何人可查看或下载</Radio>
			        </RadioGroup>
			        <Select defaultValue={shareExpiry} style={{ width: 120 }} onChange={handleChangeExpiry}>
				      	<Option value="0">永久有效</Option>
				      	<Option value="7">7天</Option>
				      	<Option value="1">1天</Option>
				    </Select>
			    </Fragment>
			)
		}else{
    		return (
    			<Fragment>
	    			<Icon type="check-circle" /> 成功创建私密链接
	    			<Input addonAfter="链接1天后失效" defaultValue="https://pan.baidu.com/s/1CRBZoSnEM54CT0oGzgF54w" />
	    			提取密码 <Input defaultValue="e2y7" /> 可以将链接发送给你的QQ等好友
			    </Fragment>
    		)
		}
    }

    handleCopy(){
		success("已复制到剪切板")
    }

	render(){
		const { okSuccess, shareItem, shareVisible, handleOk, handleCancel } = this.props
		return (
			<Modal
	          title={"分享文件(夹): "+shareItem.get("title")}
	          visible={shareVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText={okSuccess ? "复制链接及密码" : "创建链接"}
	          onOk={okSuccess ? this.handleCopy : handleOk}
	          onCancel={()=>{handleCancel(shareItem)}}
	        >
	        	{this.shareModelInner()}
	        </Modal>
        )
	}
}

const mapState = (state) => ({
	shareItem: state.get("home").get("shareItem"),
	shareVisible: state.get("home").get("shareVisible"),
	shareForm: state.get("home").get("shareForm"),
	shareExpiry: state.get("home").get("shareExpiry"),
	okSuccess: state.get("home").get("okSuccess")
})

const mapDispatch = (dispatch) => ({
	handleOk: () => {
	    dispatch(actionCreator.changeOkSuccess(true))
	    success("创建成功")
	},
	handleCancel: (item) => {
	    dispatch(actionCreator.changeShareVisible(item, false, ""))
	},
	shareForm: (e) => {
		dispatch(actionCreator.getShareForm(e.target.value))
	},
	handleChangeExpiry: (value) => {
		dispatch(actionCreator.changeExpiry(value))
	}
})

export default connect(mapState, mapDispatch)(ShareModal)