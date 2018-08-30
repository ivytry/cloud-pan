import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import 'antd/dist/antd.css';
import { Popover, Row, Col, Menu, Avatar, Icon, Divider, Dropdown, List } from 'antd';
import { Logo, NavItem, SpaceBox, User, Title } from './style';

import PostModal from './component/PostModal';

class Header extends PureComponent{
	constructor(){
		super()
		this.showModal = this.showModal.bind(this)
	}

	showModal(){
		switch(this.props.modalType){
			case "post":
				return <PostModal />
			default:
				return
		}
	}

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
					<span onClick={() => {this.props.handleChangeMsg("post")}}>
						<Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					</span>
					<span>ivytry2015</span>
				</Title>
				<List
			      size="small"
			      dataSource={userConf}
			      style={{"fontSize": "12px"}}
			      renderItem={(item, index) => (<List.Item className="Item" key={index}><a href="#">{item}</a></List.Item>)}
			    />
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

	render(){
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
					        		this.props.navList.map((item) => {
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
							<NavItem><Icon type="bell" /></NavItem>
							<NavItem><Icon type="form" /></NavItem>
							{ this.showModal() }
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
		this.props.initNavListData()
	}
}

const mapStateToProps = (state) => ({
	classifyList: state.get("header").get("classifyList"),
	space: state.get("header").get("space"),
	navList: state.get("header").get("navList"),
	modalType: state.get("header").get("modalType"),
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
	},
	handleChangeMsg: (modalType) => {
		dispatch(actionCreator.changeUserMsg(modalType))
	}
})

export default connect(mapStateToProps, mapDispatchProps)(Header)