import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';
import ReactTable, { ReactTableDefaults } from 'react-table';
import "react-table/react-table.css";
import { HomeWrapper, HomeLeft, HomeRight, Top, BtnLeft, BtnRight, SearchWrapper, Body } from './style';

class Home extends Component{
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
	}
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
	}
	render(){
		const data = this.props.tableList

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
						</div>
					</Top>
					<Body>
						<ReactTable
						    data={data}
						    columns={columns}
						    loading={false}
						    showPagination={true}
						    showPaginationTop={false}
						    showPaginationBottom={true}
						    showPageSizeOptions={true}
						    defaultPageSize={22}
						    style={{ height: "780px" }}
						    className="-highlight"
						    filterable
						/>
					</Body>
				</HomeRight>
			</HomeWrapper>
		)
	}
}

const mapState = (state) => ({
	tableList: state.get("home").get("tableList")
})

const mapDispatch = (dispatch) => ({
	changeTableList: (list) => {
		dispatch(actionCreator.changeTableListData(list))
	}
})

export default connect(mapState, mapDispatch)(Home)