import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import 'antd/dist/antd.css';
import { Breadcrumb, Popover, Button, Input, Row, Col, Menu, Avatar, Icon, Divider, Dropdown, List } from 'antd';
import { Logo, NavItem, SpaceBox, User, Title, ClassifyList, SpaceHover } from './style';

class Header extends PureComponent{
	showBoxUI(){
		const userConf = [
		  '个人资料',
		  '设置密码',
		  '帮助中心',
		  '退出'
		];
		return (
			<Fragment>
				<Title>
					<a href="#"><Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></a>
					<a href="#">ivytry2015</a>
				</Title>
				<List
			      size="small"
			      dataSource={userConf}
			      style={{"font-size": "12px"}}
			      renderItem={item => (<List.Item class="Item"><a href="#">{item}</a></List.Item>)}
			    />
			</Fragment>
		)
	}

	classifyUI(){
		return (
			<Menu>
				{
					this.props.classifyList.map((item)=>{
						return (
							<Menu.Item key={item.get("id")} style={{"padding":"0 20px", "left": "-10px"}}>
						      <a rel="noopener noreferrer" href="#">{item.get("name")}</a>
						    </Menu.Item>
					    )
					})
				}
			</Menu>
		)
	}

	showSpaceUI(){
		const { space } = this.props
		return (
			<Fragment>
				<p>已使用：{space.get("rest")}</p>
				<p>剩余：{space.get("rest")}</p>
				<p>总共有：{space.get("total")}</p>
			</Fragment>
		)
	}

	render(){
		return (
			<div style={{"clear": "both"}}>
				<Row style={{"height":"56px", "border-bottom": "1px solid #f0f0f0"}}>
					<Col xs={4} sm={4} md={4} lg={3} xl={3}>
						<Logo></Logo>
					</Col>
					<Col xs={16} sm={16} md={16} lg={18} xl={18}>
						<div style={{"float": "left"}}>
							<Menu
						        onClick={this.handleClick}
						        selectedKeys={"horizontal"}
						        mode="horizontal"
					        >
					        	<Menu.Item key="home" style={{"margin-top":"6px"}}>网盘</Menu.Item>
					        	<Menu.Item key="type" style={{"margin-top":"6px", "padding": "0"}}>
					        		<Dropdown overlay={this.classifyUI()}>
					        			<a href="#" style={{"padding":"0 20px"}}>分类</a>
					        		</Dropdown>
					        	</Menu.Item>
					        	<Menu.Item key="share" style={{"margin-top":"6px"}}>分享</Menu.Item>
					        	<Menu.Item key="foot" style={{"margin-top":"6px"}}>足迹</Menu.Item>
					        	<Menu.Item key="download" style={{"margin-top":"6px"}}>下载</Menu.Item>
					        	<Menu.Item key="trash" style={{"margin-top":"6px"}}>回收站</Menu.Item>
							</Menu>
						</div>
						<div style={{"float": "right", "height": "56px"}}>
							<Popover content={this.showBoxUI()}>
								<User>
									<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
									ivytry2015
								</User>
							</Popover>
							<NavItem><Divider type="vertical" /></NavItem>
							<NavItem><Icon type="bell" /></NavItem>
							<NavItem><Icon type="form" /></NavItem>
						</div>
					</Col>
					<Col xs={4} sm={4} md={4} lg={3} xl={3}>
						<SpaceBox>
							<Popover content={this.showSpaceUI()}>
								<a href="#">30%</a>
							</Popover>
						</SpaceBox>
					</Col>
				</Row>
			</div>
		)
	}

	componentDidMount(){
		this.props.initClassifyData()
		this.props.initSpaceData()
	}
}

const mapStateToProps = (state) => ({
	classifyList: state.get("header").get("classifyList"),
	space: state.get("header").get("space"),
	navList: state.get("header").get("navList"),
})

const mapDispatchProps = (dispatch) => ({
	initClassifyData: () => {
		dispatch(actionCreator.getInitClassifyData())
	},
	initSpaceData: (flag) => {
		dispatch(actionCreator.getInitSpaceData())
	},
	initNavListData: (flag) => {
		dispatch(actionCreator.getInitNavListData())
	}
})

export default connect(mapStateToProps, mapDispatchProps)(Header)