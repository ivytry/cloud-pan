import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';

import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

import { Breadcrumb } from 'antd';
import { HomeWrapper, HomeLeft, HomeRight, Top, BtnLeft, BtnRight, BtnGroup, Body } from './style';

const CheckboxTable = checkboxHOC(ReactTable);

class Home extends Component{
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
		this.showBtn = this.showBtn.bind(this)
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
    	if(this.props.selection.length>0){
    		return(
				<BtnGroup>
					<button className="share">分享</button>
					<button>下载</button>
					<button>删除</button>
					<button>复制到</button>
					<button className="move">移动到</button>
				</BtnGroup>
			)
    	}else{
    		return <BtnRight><i className="iconfont download">&#xe64a;</i>离线下载</BtnRight>
    	}
    }

	render(){
		const {isSelected, toggleSelection, toggleAll, showBtn} = this
		const {path, selectAll, tableList, handleShare} = this.props

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
                	<i className="iconfont share" onClick={()=>{handleShare(item)}}>&#xe65b;</i>
                	<i className="iconfont download">&#xe64a;</i>
                	<i className="iconfont del">&#xe604;</i>
                	<i className="iconfont copy">&#xe6c5;</i>
                	<i className="iconfont move">&#xe60c;</i>
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
			<HomeWrapper>
				<HomeLeft>
					<Tree />
				</HomeLeft>
				<HomeRight>
					<Top>
						<BtnLeft>
							<Breadcrumb separator=" > ">
							    <Breadcrumb.Item>{path}</Breadcrumb.Item>
							</Breadcrumb>
						</BtnLeft>
						<div>
							<BtnRight className="upload"><i className="iconfont upload">&#xe609;</i>上传</BtnRight>
							<BtnRight><i className="iconfont newfolder">&#xe723;</i>新建文件夹</BtnRight>
							{showBtn()}
						</div>
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
						    defaultPageSize={20}
						    style={{ height: "780px" }}
						    className="-highlight"
						    filterable
						/>
					</Body>
				</HomeRight>
			</HomeWrapper>
		)
	};
}

const mapState = (state) => ({
	tableList: state.get("home").get("tableList"),
	selectAll: state.get("home").get("selectAll"),
	selection: state.get("home").get("selection"),
	path: state.get("home").get("path")
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
	handleShare: (item) => {
		console.log(item.original)
	}
})

export default connect(mapState, mapDispatch)(Home)