import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';

import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

import 'antd/dist/antd.css';
import { Breadcrumb, Popover, Button, Input, Row, Col, Popconfirm, Icon, Upload, message, Drawer } from 'antd';
import { Top, BtnLeft, BtnRight, Body } from './style';

import ShareModal from './component/ShareModal';
import DownloadModal from './component/DownloadModal';
import DelModal from './component/DelModal';
import CopyToModal from './component/CopyToModal';
import MoveToModal from './component/MoveToModal';

const ButtonGroup = Button.Group;
const CheckboxTable = checkboxHOC(ReactTable);

class Home extends PureComponent{
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
		this.showBtn = this.showBtn.bind(this)
		this.showModel = this.showModel.bind(this)
	};

	renderEditable(cellInfo) {
	    return (
	        <div
		        contentEditable
		        suppressContentEditableWarning
		        onBlur={e => {
		          const data = [...this.props.tableList];
		          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
		          this.props.changeTableList(data);
		        }}
		        dangerouslySetInnerHTML={{
		          __html: this.props.tableList[cellInfo.index][cellInfo.column.id]
		        }}
	        />
	    );
	};

	toggleSelection = (key, shift, row) => {
	    let selection = [...this.props.selection];
	    const keyIndex = selection.indexOf(row._id);
	    if (keyIndex >= 0) {
	      selection = [
	        ...selection.slice(0, keyIndex),
	        ...selection.slice(keyIndex + 1)
	      ];
	    } else {
	      selection.push(row._id);
	    }
	    this.props.changeSelection(selection)
	};

    toggleAll = () => {
	    const selectAll = this.props.selectAll ? false : true;
	    const selection = [];
	    if (selectAll) {
	      const wrappedInstance = this.checkboxTable.getWrappedInstance();
	      const currentRecords = wrappedInstance.getResolvedState().sortedData;
	      currentRecords.forEach(item => {
	        selection.push(item._original._id);
	      });
	    }
	    this.props.changeCheckboxProps(selectAll, selection);
	};

    isSelected = key => {
    	return this.props.selection.includes(key);
    };

    showBtn(){
    	const {selection, showShareModal} = this.props
    	if(selection.length>0){
    		return(
				<ButtonGroup style={{"margin-right": "10px"}}>
					<Button onClick={()=>{showShareModal(selection, "share")}}>分享</Button>
					<Button onClick={()=>{showShareModal(selection, "download")}}>下载</Button>
					<Button onClick={()=>{showShareModal(selection, "del")}}>删除</Button>
					<Button onClick={()=>{showShareModal(selection, "copyTo")}}>复制到</Button>
					<Button onClick={()=>{showShareModal(selection, "moveTo")}}>移动到</Button>
					{ this.showModel(selection) }
				</ButtonGroup>
			)
    	}else{
    		return <Button type="default" icon="download" className="upload">离线下载</Button>
    	}
    }

    showModel(item){
    	const {shareItem, modalType} = this.props
    	if(Array.isArray(item)){
    		switch(modalType){
    			case "share":
    				return <ShareModal />
    			case "download":
    				return <DownloadModal />
    			case "del":
    				return <DelModal />
    			case "copyTo":
    				return <CopyToModal />
    			case "moveTo":
    				return <MoveToModal />
    		}
    	}else{
	    	if(shareItem.get("id") === item.original.id){
	    		switch(modalType){
	    			case "share":
	    				return <ShareModal />
	    			case "download":
	    				return <DownloadModal />
	    			case "del":
	    				return <DelModal />
	    			case "copyTo":
	    				return <CopyToModal />
	    			case "moveTo":
	    				return <MoveToModal />
	    		}
		    }
		}
    }

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
		const { isSelected, toggleSelection, toggleAll, showBtn, showModel, showUpload } = this
		const { path, selectAll, tableList, showShareModal, showDownloadModal } = this.props
		const columns = [{
		    Header: '文件名',
		    accessor: 'title',
            Cell: this.renderEditable
		  }, {
			    Header: '大小',
			    accessor: 'size',
			    maxWidth: 200
		    }, {
			    Header: '修改日期',
			    accessor: 'date',
			    maxWidth: 350
		    }, {
		    Header: '操作',
            width: 250,
            expander: true,
            Expander: (item) =>
                <div className="operate">
                	<i className="iconfont share" onClick={()=>{showShareModal(item.original, "share")}}>&#xe65b;</i>
                	<i className="iconfont download" onClick={()=>{showShareModal(item.original, "download")}}>&#xe64a;</i>
                	<i className="iconfont del" onClick={()=>{showShareModal(item.original, "del")}}>&#xe604;</i>
                	<i className="iconfont copy" onClick={()=>{showShareModal(item.original, "copyTo")}}>&#xe6c5;</i>
                	<i className="iconfont move" onClick={()=>{showShareModal(item.original, "moveTo")}}>&#xe60c;</i>
                	{ showModel(item) }
                </div>,
                style: {
	                cursor: "pointer",
	                fontSize: 25,
	                padding: "0"
                }
		    }]
		
		const checkboxProps = {
		      selectAll,
		      isSelected,
		      toggleSelection,
		      toggleAll,
		      selectType: "checkbox",
		      getTrProps: (s, r) => {
		      	let selected=false
		      	if(r){
		        	selected = isSelected(r.original._id);
		    	}
		        return {
		          style: {
		            backgroundColor: selected ? "lightgreen" : "inherit"
		          }
		        };
		    }
		};
		const onChange = (info) => {
		    if (info.file.status !== 'uploading') {
		    	showUpload(info.file, info.fileList, true)
		    }
		    if (info.file.status === 'done') {
		      message.success(`${info.file.name} 文件上传成功`);
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name} 文件上传失败.`);
		    }
		}
		return (
			<div style={{"clear": "both"}}>
				<Row>
					<Col xs={4} sm={4} md={4} lg={3} xl={3} style={{"border-right": "1px solid #f0f0f0"}}>
						<Tree />
					</Col>
					<Col xs={20} sm={20} md={20} lg={21} xl={21}>
						<Top>
							<BtnLeft>
								<Breadcrumb separator=" > ">
								    <Breadcrumb.Item>{path}</Breadcrumb.Item>
								</Breadcrumb>
							</BtnLeft>
							<BtnRight>
								{showBtn()}
								<Popconfirm 
									title={<Input value="新建文件夹" />} 
									icon={<Icon type="plus-circle-o" style={{ fontSize: '20px', color: "#ccc" }} />}
									cancelText="取消"
									okText="确定"
								>
								    <Button type="default" icon="folder-add" className="new">新建文件夹</Button>
								</Popconfirm>
						        <Upload 
						        	name='file'
									action='http://localhost:8080/'
									showUploadList={false}
									headers={{
									    authorization: 'authorization-text'
									}}
									onChange= {(info) => onChange(info)}
						        >
						        	<Button type="primary" icon="upload" className="upload">上传</Button>
						        </Upload>
							</BtnRight>
						</Top>
						<Body>
							<CheckboxTable
								ref={r => (this.checkboxTable = r)}
							    data={tableList}
							    columns={columns}
							    {...checkboxProps}
							    loading={false}
							    showPagination={true}
							    showPaginationTop={false}
							    showPaginationBottom={true}
							    showPageSizeOptions={true}
							    defaultPageSize={17}
							    style={{ height: "780px" }}
							    className="-highlight"
							    filterable
							/>
						</Body>
					</Col>
				</Row>
			</div>
		)
	};
}

const mapState = (state) => ({
	tableList: state.get("home").get("tableList"),
	selectAll: state.get("home").get("selectAll"),
	selection: state.get("home").get("selection"),
	path: state.get("home").get("path"),
	shareItem: state.get("home").get("shareItem"),
	modalType: state.get("home").get("modalType")
})

const mapDispatch = (dispatch) => ({
	changeTableList: (list) => {
		dispatch(actionCreator.updateTreeData(list))
	},
	changeCheckboxProps: (selectAll, selection) => {
		dispatch(actionCreator.changeCheckboxProps(selectAll, selection))
	},
	changeSelection: (selection) => {
		dispatch(actionCreator.changeSelection(selection))
	},
	showShareModal: (item, modalType) => {
		let obj = Array.isArray(item) ? {id:"1", "title":"分享所选文件", isDirectory:true, children:item} : item
    	dispatch(actionCreator.changeShareVisible(obj, true, modalType))
	}
})

export default connect(mapState, mapDispatch)(Home)