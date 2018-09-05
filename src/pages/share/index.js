import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';

import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

import 'antd/dist/antd.css';
import { Breadcrumb, Button, Row, Col, Icon, Drawer } from 'antd';
import { Top, BtnLeft, BtnRight, Body } from './style';

import ShareModal from './component/ShareModal';
import DownloadModal from './component/DownloadModal';
import DelModal from './component/DelModal';
import CopyToModal from './component/CopyToModal';
import MoveToModal from './component/MoveToModal';

const CheckboxTable = checkboxHOC(ReactTable);

class Home extends PureComponent{
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
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
    			default:
    				return
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
	    			default:
	    				return
	    		}
		    }
		}
    }

	render(){
		const { isSelected, toggleSelection, toggleAll, showModel, showUpload } = this
		const { path, selectAll, tableList, showShareModal } = this.props
		const columns = [{
		    Header: '文件名',
		    accessor: 'title'
		  },{
			    Header: '下载',
			    accessor: 'download',
			    maxWidth: 200
		    }, {
			    Header: '分享日期',
			    accessor: 'date',
			    maxWidth: 350
		    }, {
		    Header: '操作',
            width: 250,
            expander: true,
            Expander: (item) =>
                <div className="operate">
                	<Icon type="link" theme="outlined" onClick={()=>{showShareModal(item.original, "copyTo")}} />
                	<Icon className="del" type="disconnect" theme="outlined" onClick={()=>{showShareModal(item.original, "del")}} />
                	<Icon type="download" theme="outlined" onClick={()=>{showShareModal(item.original, "download")}} />
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

		return (
			<div style={{"clear": "both"}}>
				<Row>
					<Col xs={4} sm={4} md={4} lg={3} xl={3} style={{"borderRight": "1px solid #f0f0f0"}}>
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
						        <Button type="default" icon="download" className="upload">下载</Button>
						        <Button type="primary" icon="disconnect" className="upload">取消分享</Button>
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
	tableList: state.get("share").get("tableList"),
	selectAll: state.get("share").get("selectAll"),
	selection: state.get("share").get("selection"),
	path: state.get("share").get("path"),
	shareItem: state.get("share").get("shareItem"),
	modalType: state.get("share").get("modalType")
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