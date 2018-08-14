import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import {
	HeaderWrapper,
	HeaderInner,
	Logo,
	Nav,
	NavItem,
	SpaceBox,
	User,
	UserMsgBox,
	Title,
	ClassifyList,
	SpaceHover
} from './style';

class Header extends Component{
	isShowBoxUI(){
		if(this.props.showBox){
			return (
				<UserMsgBox>
					<Title>
						<img src="//upload.jianshu.io/collections/images/540903/1f2936a662509e7d64528466be5546f4_r.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180" alt=""/> 
						ivytry2015 
						<i className="iconfont member">&#xe692;</i> 
					</Title>
					<div className="itembox">
						<a>个人资料</a>
						<a>设置密码</a>
						<a>帮助中心</a>
						<a>退出</a>
					</div>
				</UserMsgBox>
			)
		}
	}
	isShowClassifyUI(){
		const { showClassify, classifyList } = this.props
		if(showClassify){
			return (
				<ClassifyList>
					{
						classifyList.map((item)=>{
							return <li key={item.get("id")}>{item.get("name")}</li>
						})
					}
				</ClassifyList>
			)
		}
	}
	isShowSpaceUI(){
		const { showSpace, space } = this.props
		if(showSpace){
			return (
				<SpaceHover>
					<p>剩余：{space.get("rest")}</p> 
					<p>已使用：{space.get("rest")}</p> 
					<p>总共有：{space.get("total")}</p>
				</SpaceHover>
			)
		}
	}
	render(){
		const { showBox, handleShowBox, handleShowClassify, handleShowSpace } = this.props
		return (
			<HeaderWrapper>
				<Logo></Logo>
				<HeaderInner>
					<Nav>
						<NavItem className="left active" href="/">网盘</NavItem>
						<NavItem 
							className="left classify"
							onMouseEnter={() => {handleShowClassify(true)}} 
							onMouseLeave={() => {handleShowClassify(false)}}
						>
							分类
							{ this.isShowClassifyUI() }
						</NavItem>
						<NavItem className="left share">分享</NavItem>
						<NavItem className="left share">足迹</NavItem>
						<NavItem className="left share">下载</NavItem>
						<NavItem className="left share">回收站</NavItem>
						<NavItem className="right"><i className="iconfont">&#xe600;</i></NavItem>
						<NavItem className="right"><i className="iconfont">&#xe667;</i></NavItem>
						<User 
							onMouseEnter={() => {handleShowBox(true)}} 
							onMouseLeave={() => {handleShowBox(false)}}
						>
							<img src="//upload.jianshu.io/collections/images/540903/1f2936a662509e7d64528466be5546f4_r.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180" alt=""/> 
							ivytry2015 
							<i className="iconfont member">&#xe692;</i> 
							<i className="iconfont up" dangerouslySetInnerHTML={{ __html: showBox ? '&#xe60d;' : '&#xe60a;' }}></i>
							<span>|</span>
							{ this.isShowBoxUI() }
						</User>
					</Nav>
					<SpaceBox
						onMouseEnter={() => {handleShowSpace(true)}} 
						onMouseLeave={() => {handleShowSpace(false)}}
					>
						<a className="full">30%</a>
						{ this.isShowSpaceUI() }
					</SpaceBox>
				</HeaderInner>
			</HeaderWrapper>
		)
	}
	componentDidMount(){
		this.props.initClassifyData()
		this.props.initSpaceData()
	}
}

const mapStateToProps = (state) => ({
	showBox: state.get("header").get("showbox"),
	showClassify: state.get("header").get("showClassify"),
	showSpace: state.get("header").get("showSpace"),
	classifyList: state.get("header").get("classifyList"),
	space: state.get("header").get("space")
})

const mapDispatchProps = (dispatch) => ({
	handleShowBox: (flag) => {
		dispatch(actionCreator.isShowBox(flag))
	},
	handleShowClassify: (flag) => {
		dispatch(actionCreator.isShowClassify(flag))
	},
	initClassifyData: () => {
		dispatch(actionCreator.getInitClassifyData())
	},
	handleShowSpace: (flag) => {
		dispatch(actionCreator.isShowSpace(flag))
	},
	initSpaceData: (flag) => {
		dispatch(actionCreator.getInitSpaceData())
	}
})

export default connect(mapStateToProps, mapDispatchProps)(Header)