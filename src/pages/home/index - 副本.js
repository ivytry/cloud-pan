import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';
import ReactTable, { ReactTableDefaults } from 'react-table';
import "react-table/react-table.css";
import { HomeWrapper, HomeLeft, HomeRight, Top, BtnLeft, BtnRight, SearchWrapper, Body } from './style';

class Home extends Component{
	render(){
		const data = this.props.tableList

		const columns = [{
		    "Header": '文件名',
		    accessor: 'title' 
		  }, {
		    Header: '大小',
		    accessor: 'size'
		  }, {
		    Header: '修改日期',
		    accessor: 'date'
		  }]

		return (
			<HomeWrapper>
				<HomeLeft>
					<Tree />
				</HomeLeft>
				<HomeRight>
					<Top>
						<div>
							<BtnLeft className="upload"><i className="iconfont upload">&#xe609;</i>上传</BtnLeft>
							<BtnLeft><i className="iconfont newfolder">&#xe723;</i>新建文件夹</BtnLeft>
							<BtnLeft><i className="iconfont download">&#xe64a;</i>离线下载</BtnLeft>
							<BtnRight><i className="iconfont download">&#xe62e;</i></BtnRight>
							<BtnRight><i className="iconfont download">&#xe647;</i></BtnRight>
							<SearchWrapper>
								<input placeholder="搜索文件" />
								<i className="iconfont search">&#xe6cc;</i>
								<i className="iconfont del">&#xe647;</i>
							</SearchWrapper>
						</div>
					</Top>
					<Body>
						<ReactTable
						    data={data}
						    columns={columns}
						    loading={false}
						    showPagination={false}
						    showPaginationTop={true}
						    showPaginationBottom={true}
						    showPageSizeOptions={true}
						    defaultPageSize={22}
						    style={{ height: "780px" }}
						    className="-highlight"
						/>
					</Body>
				</HomeRight>
			</HomeWrapper>
		)
	}
	componentDidMount(){
		
	}
}

const mapState = (state) => ({
	tableList: state.get("home").get("tableList")
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(Home)