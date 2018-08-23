import styled from 'styled-components';

export const HomeWrapper = styled.div`
	margin: 0 auto;
    min-width: 1366px;
	overflow:hidden;
`;

export const HomeLeft = styled.div`
	width:200px
	border-right: 1px solid #f0f0f0;
	padding:20px 0 20px 10px;
	float:left;
`;

export const TreeRoot = styled.div`
	.treeSearchInput{
		width:125px;
		background:#f1f1f1;
		height:25px;
		line-height:25px;
		border-radius:15px;
		border:none;
		padding:0 50px 0 15px;
	}
	.expandbtn{
		padding:5px 15px;
		margin-right:20px;
		font-size:12px;
		border:none;
		border-radius:5px;
	}
	.nodebox{
		@media (max-width:1920px) and (min-width:1680px){
			height:738px;
			overflow:auto;
		}
		@media (max-width:1366px) and (min-width:1024px){
			height:710px;
			overflow:auto;
		}
		padding-left:10px;
	}
	.all{
		color: #424e67;
		height: 38px;
    	line-height: 38px;
		font-size:14px;
		cursor:pointer;
		overflow:hidden;
		position:relative;
		&:hover{
			background: #f6f6f6;
		}
		&.child{
			padding-left:48px;
		}
		.iconfont{
			font-size:18px;
			display:inline-block;
			float:left;
			margin:2px 10px 0 10px;
			&.expand{
				position:absolute;
				top:7px;
				right:10px;
				width:20px;
				height:20px;
				border-radius:10px;
				line-height:22px;
				color:#999;
				&:hover{
					background:#ececec;
					color:#333;
				}
			}
		}
		&.active{
			color:#ea6f5a;
		}
	}
`;

export const HomeRight = styled.div`
	@media (max-width:1920px) and (min-width:1680px){
		width:1682px;
	}
	@media (max-width:1366px) and (min-width:1024px){
		width:1140px;
	}
    overflow:hidden;
    float:left;
`;

export const Top = styled.div`
	padding:15px 20px;
	overflow:hidden;
`;

export const BtnLeft = styled.div`
	float:left;
	margin-top:18px;
	font-size:12px;
	color:#666;
`;

export const BtnRight = styled.div`
	float:right;
	padding:0 16px;
	height:34px;
	line-height:34px;
	border: 1px solid rgba(202,108,90,0.3);
	border-radius:5px;
	font-size:12px;
	margin-left:10px;
	color:#ea6f5a;
	.iconfont{
		font-weight:700;
		float:left;
	}
	&.upload{
		background:#ea6f5a;
		color:white;
		margin-right:-18px;
	}
	.upload{
		font-size:1px;
		margin-right:12px;
	}
	.download{
		margin-right:5px;
		font-size:20px;
	}
	.newfolder{
		font-size:15px;
		margin-right:6px;
	}
`;

export const BtnGroup = styled.div`
	float:right;
	button{
		padding:0 16px;
		height:36px;
		line-height:36px;
		border: 1px solid rgba(202,108,90,0.3);
		font-size:12px;
		margin-left:-1px;
		color:#ea6f5a;
		background:#fff;
		&.share{
			border-top-left-radius:5px;
			border-bottom-left-radius:5px;
		}
		&.move{
			border-top-right-radius:5px;
			border-bottom-right-radius:5px;
		}
	}
`;

export const SearchWrapper = styled.div`
	float:right;
	margin-right:15px;
	position:relative;
	color:#969696;
	input{
		width:200px;
		background:#f6f6f6;
		height:30px;
		line-height:30px;
		border-radius:15px;
		border:none;
		padding:0 50px 0 15px;
	}
	i{
		position:absolute;
		top:6px;
		right:10px;
	}
	.search{
		font-weight:bold;
	}
	.del{
		right:30px;
	}
`;

export const Body = styled.div`
	padding-left:20px;
	.operate{
		.iconfont{
			margin-right:15px;
			&.download{
				font-size:20px;
				color:#333;
			}
			&.del,&.copy,&.move{
				color:#666;
			}
			&.copy{
				color:#888;
			}
		}
	}
`;