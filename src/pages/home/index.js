import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Tree from './component/Tree';
import {
	HomeWrapper,
	HomeLeft,
	HomeRight,
	Top,
	BtnLeft,
	BtnRight,
	SearchWrapper
} from './style';

class Home extends Component{
	render(){
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
						<div>

						</div>
					</Top>
				</HomeRight>
			</HomeWrapper>
		)
	}
}

export default connect(null, null)(Home)