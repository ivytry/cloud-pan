import styled from 'styled-components';

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

export const Top = styled.div`
	padding:15px 20px;
	overflow:hidden;
`;

export const BtnLeft = styled.div`
	float:left;
	margin-top:18px;
	font-size:12px;
	color:#666;
	cursor: pointer;
`;

export const BtnRight = styled.div`
	float:right;
	Button{
		margin-left:10px;
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