import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { Modal, Upload, Drawer, message } from 'antd';
import 'antd/dist/antd.css';

class PostModal extends PureComponent{
	showUpload(file, fileList, visible){
    	return (
    		<Drawer
	          title="上传列表"
	          placement="right"
	          closable={false}
	          visible={visible}
	        >
	            <p>{fileList}</p>
	        </Drawer>
    	)
    }

	render(){
		const { modalVisible, handleOk, handleCancel } = this.props
		const onChange = (info) => {
		    if (info.file.status !== 'uploading') {
		    	this.showUpload(info.file, info.fileList, true)
		    }
		    if (info.file.status === 'done') {
		      message.success(`${info.file.name} 文件上传成功`);
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name} 文件上传失败.`);
		    }
		}
		return (
			<Modal
	          title="更换头像"
	          visible={modalVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleOk}
	          onCancel={()=>{handleCancel()}}
	          width={248}
	        >
	            <Upload 
		        	name='file'
					action='http://localhost:8080/'
					showUploadList={false}
					headers={{
					    authorization: 'authorization-text'
					}}
					onChange= {(info) => onChange(info)}
		        >
		        	<img 
		        		src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
		        		style={{width: 200, height: 200, cursor: "pointer"}}
		        	/>
		        </Upload>
	        </Modal>
        )
	}
}

const mapState = (state) => ({
	shareItem: state.get("home").get("shareItem"),
	modalVisible: state.get("header").get("modalVisible"),
})

const mapDispatch = (dispatch) => ({
	handleOk: () => {
	    dispatch(actionCreator.changeModalVisible(false))
	},
	handleCancel: () => {
	    dispatch(actionCreator.changeModalVisible(false))
	}
})

export default connect(mapState, mapDispatch)(PostModal)