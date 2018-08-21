import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';

import ReactTable from 'react-table';
import Chance from "chance";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

import { HomeWrapper, HomeLeft, HomeRight, Top, BtnLeft, BtnRight, BtnGroup, Body } from './style';

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();

function getData(testData) {
  const data = testData.map(item => {
    const _id = chance.guid();
    return {
      _id,
      ...item
    };
  });
  return data;
}

class Home extends Component{
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
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
	    const keyIndex = selection.indexOf(key);
	    if (keyIndex >= 0) {
	      selection = [
	        ...selection.slice(0, keyIndex),
	        ...selection.slice(keyIndex + 1)
	      ];
	    } else {
	      selection.push(key);
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
	        selection.push(item._original.id);
	      });
	    }
	    this.props.changeCheckboxProps(selectAll, selection);
	};

    isSelected = key => {
    	return this.props.selection.includes(key);
    };

	render(){
		const {isSelected, toggleSelection, toggleAll} = this
		const {selectAll, tableList} = this.props

		const columns = [{
		    Header: '文件名',
		    accessor: 'title',
            Cell: this.renderEditable
		  }, {
		    Header: '操作',
            width: 250,
            expander: true,
            Expander: ({ isExpanded, ...rest }) =>
                <div>{isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}</div>,
                style: {
	                cursor: "pointer",
	                fontSize: 25,
	                padding: "0"
                }
		    }, {
			    Header: '大小',
			    accessor: 'size',
			    maxWidth: 200
		    }, {
			    Header: '修改日期',
			    accessor: 'date',
			    maxWidth: 350
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
		        	selected = isSelected(r.original.id);
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
						<div>
							<BtnLeft>全部文件</BtnLeft>
						</div>
						<div>
							<BtnRight className="upload"><i className="iconfont upload">&#xe609;</i>上传</BtnRight>
							<BtnRight><i className="iconfont newfolder">&#xe723;</i>新建文件夹</BtnRight>
							<BtnRight><i className="iconfont download">&#xe64a;</i>离线下载</BtnRight>
							<BtnGroup>
								<button className="share">分享</button>
								<button>下载</button>
								<button>删除</button>
								<button>复制到</button>
								<button className="move">移动到</button>
							</BtnGroup>
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
	selection: state.get("home").get("selection")
})

const mapDispatch = (dispatch) => ({
	changeTableList: (list) => {
		dispatch(actionCreator.changeTableListData(list))
	},
	changeCheckboxProps: (selectAll, selection) => {
		dispatch(actionCreator.changeCheckboxProps(selectAll, selection))
	},
	changeSelection: (selection) => {
		dispatch(actionCreator.changeSelection(selection))
	}
})

export default connect(mapState, mapDispatch)(Home)