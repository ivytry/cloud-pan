import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { toJS } from 'immutable';

import { message, Modal, Radio, Input, Select, Icon } from 'antd';
import 'antd/dist/antd.css';

class ShareModal extends PureComponent{
    shareModelInner(){
    	const { shareItem } = this.props
    	const radioStyle = {
	      display: 'block',
	      height: '30px',
	      lineHeight: '30px',
	    };
		return (
			<Fragment>
    			下载文件夹多个文件
    			{shareItem.get("children")}
		    </Fragment>
		)
    }

	render(){
		const { shareItem, shareVisible, handleOk, handleCancel } = this.props
		let item = shareItem.toJS()
		if(item.isDirectory){
			return (
				<Modal
		          title="下载"
		          visible={shareVisible}
		          cancelText="取消"
		          centered={true}
		          maskClosable={true}
		          okText="确定"
		          onOk={handleOk}
		          onCancel={()=>{handleCancel(shareItem)}}
		        >
		        	{this.shareModelInner()}
		        </Modal>
	        )
	    }else{
	    	window.open("https://codeload.github.com/douban/douban-client/legacy.zip/master", "_parent");
	    	return null
	    }
	}
}

const mapState = (state) => ({
	shareItem: state.get("home").get("shareItem"),
	shareVisible: state.get("home").get("shareVisible"),
})

const mapDispatch = (dispatch) => {
	return {
		handleOk: () => {
		    dispatch(actionCreator.changeOkSuccess(true))
		},
		handleCancel: (item) => {
		    dispatch(actionCreator.changeShareVisible(item, false))
		}
	}
}

export default connect(mapState, mapDispatch)(ShareModal)