import styled from 'styled-components';

export const HomeWrapper = styled.div`
	margin: 0 auto;
    min-width: 768px;
    max-width: 1440px;
    width:1440px;
	overflow:hidden;
`;

export const HomeLeft = styled.div`
    width: 198px;
    min-height: 680px;
    max-height: 900px;
	border-right: 1px solid #f0f0f0;
	padding:20px 10px;
	float:left;
`;

export const TreeRoot = styled.div`
	div{
		color: #424e67;
		height: 38px;
    	line-height: 38px;
    	padding-left:10px;
		font-size:14px;
		cursor:pointer;
		overflow:hidden;
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
		}
		&.active{
			color:#ea6f5a;
		}
	}
`;

export const HomeRight = styled.div`
	width:1220px;
    overflow:hidden;
    float:left;
`;

export const Top = styled.div`
	padding:15px 20px;
	overflow:hidden;
`;

export const BtnLeft = styled.div`
	float:left
	padding:0 16px;
	height:34px;
	line-height:34px;
	border: 1px solid rgba(202,108,90,0.3);
	border-radius:5px;
	font-size:12px;
	margin-right:10px;
	color:#ea6f5a;
	.iconfont{
		font-weight:700;
		float:left;
	}
	&.upload{
		background:#ea6f5a;
		color:white;
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

export const BtnRight = styled.div`
	float:right;
	.iconfont{
		font-size:24px;
		margin:5px;
		color:#969696;
		font-weight: 600;
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

