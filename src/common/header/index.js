import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import 'antd/dist/antd.css';
import { Popover, Row, Col, Menu, Avatar, Icon, Divider, Dropdown, List, Badge, Drawer, Progress } from 'antd';
import { Logo, NavItem, SpaceBox, User, Title } from './style';

import PostModal from './component/PostModal';
import PwdModal from './component/PwdModal';
import HelpModal from './component/HelpModal';
import ExitModal from './component/ExitModal';
import FormModal from './component/FormModal';

class Header extends PureComponent{
	constructor(){
		super()
		this.showModal = this.showModal.bind(this)
	}

	showModal(){
		switch(this.props.modalType){
			case "post":
				return <PostModal />
			case "pwd":
				return <PwdModal />
			case "help":
				return <HelpModal />
			case "exit":
				return <ExitModal />
			case "form":
				return <FormModal />
			default:
				return
		}
	}

	showBoxUI(){
		const { handleChangeMsg } = this.props
		return (
			<Fragment>
				<Title>
					<span onClick={() => {handleChangeMsg("post")}}>
						<Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					</span>
					<span>ivytry2015</span>
				</Title>
				<List size="small" style={{"fontSize": "12px"}}>
			    	<List.Item className="Item" onClick={() => {handleChangeMsg("pwd")}}><a href="#">设置密码</a></List.Item>
			    	<List.Item className="Item" onClick={() => {handleChangeMsg("help")}}><a href="#">帮助中心</a></List.Item>
			    	<List.Item className="Item" onClick={() => {handleChangeMsg("exit")}}><a href="#">退出</a></List.Item>
			    </List>
			</Fragment>
		)
	}

	classifyUI(){
		return (
			<Menu selectedKeys="">
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

	showDrawerUI(){
		const { changeInformVisible, drawerType, informVisible } = this.props
		switch(drawerType){
			case "inform":
				return (
					<Drawer
			          title="通知消息"
			          placement="right"
			          onClose={() => changeInformVisible(false)}
			          visible={informVisible}
			        >
			          <p>第一条通知</p>
			          <p>第二条通知</p>
			          <p>第三条通知</p>
			        </Drawer>
				)
			case "form":
				return (
					<Drawer
			          title="存储容量"
			          placement="right"
			          onClose={() => changeInformVisible(false)}
			          visible={informVisible}
			        >
			        	<p>总量</p>
			            <Progress strokeColor="red" type="circle" percent={75} style={{paddingLeft: "40px", marginBottom: "20px"}} />
			        	<p>文档</p>
					    <Progress type="circle" percent={13} style={{paddingLeft: "40px", marginBottom: "20px"}} />
			        	<p>图片</p>
					    <Progress type="circle" percent={70} style={{paddingLeft: "40px", marginBottom: "20px"}} />
			        	<p>音频</p>
					    <Progress type="circle" percent={22} style={{paddingLeft: "40px", marginBottom: "20px"}} />
			        	<p>视频</p>
					    <Progress type="circle" percent={13} style={{paddingLeft: "40px", marginBottom: "20px"}} />
			        </Drawer>
				)
			default:
				return
		}
	}

	render(){
		const { navList, informVisible, changeInformVisible, handleChangeMsg } = this.props
		return (
			<div style={{"clear": "both"}}>
				<Row style={{"height":"56px", "borderBottom": "1px solid #f0f0f0"}}>
					<Col xs={4} sm={4} md={4} lg={3} xl={3}>
						<Logo></Logo>
					</Col>
					<Col xs={16} sm={16} md={16} lg={18} xl={18}>
						<div style={{"float": "left"}}>
							<Menu
						        selectedKeys={["0"]}
						        mode="horizontal"
					        >
					        	{
					        		navList.map((item) => {
					        			const id = item.get("id")
					        			if(id === 1){
					        				return (
					        					<Menu.Item key="type" style={{"marginTop":"6px", "padding": "0"}}>
									        		<Dropdown overlay={this.classifyUI()}>
									        			<a href="#" style={{"padding":"0 20px"}}>分类</a>
									        		</Dropdown>
									        	</Menu.Item>
										    )
					        			}else{
					        				return <Menu.Item key={id} style={{"marginTop":"6px"}}>{item.get("name")}</Menu.Item>
					        			}
					        		})
					        	}
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
							<NavItem onClick={() => {changeInformVisible(true, "inform")}}><Badge dot><Icon type="bell" /></Badge></NavItem>
							<NavItem onClick={() => {handleChangeMsg("form")}}><Icon type="form" /></NavItem>
							{ this.showModal() }
						</div>
					</Col>
					<Col xs={4} sm={4} md={4} lg={3} xl={3}>
						<SpaceBox onClick={() => {changeInformVisible(true, "form")}}>
							<Popover content={this.showSpaceUI()}>
								<a href="#">30%</a>
							</Popover>
						</SpaceBox>
					</Col>
					{this.showDrawerUI()}
				</Row>
			</div>
		)
	}

	componentDidMount(){
		const {initClassifyData, initSpaceData, initNavListData } = this.props
		initClassifyData()
		initSpaceData()
		initNavListData()
	}
}

const mapStateToProps = (state) => ({
	classifyList: state.get("header").get("classifyList"),
	space: state.get("header").get("space"),
	navList: state.get("header").get("navList"),
	modalType: state.get("header").get("modalType"),
	informVisible: state.get("header").get("informVisible"),
	drawerType: state.get("header").get("drawerType"),
})

const mapDispatchProps = (dispatch) => ({
	initClassifyData: () => {
		dispatch(actionCreator.getInitClassifyData())
	},
	initSpaceData: () => {
		dispatch(actionCreator.getInitSpaceData())
	},
	initNavListData: () => {
		dispatch(actionCreator.getInitNavListData())
	},
	handleChangeMsg: (modalType) => {
		dispatch(actionCreator.changeUserMsg(modalType, true))
	},
	changeInformVisible: (visible, drawerType) => {
		dispatch(actionCreator.changeInformVisible(visible, drawerType))
	}
})

export default connect(mapStateToProps, mapDispatchProps)(Header)