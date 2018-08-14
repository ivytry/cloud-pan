import styled from 'styled-components';
import logopic from '../../logo.png';

export const HeaderWrapper = styled.div`
	height:56px;
	border-bottom: 1px solid #f0f0f0;
`;

export const HeaderInner = styled.div`
	height:56px;
	float:left;
`;

export const Logo = styled.a.attrs({
	"href":'/'
})`
    width:200px;
	height:56px;
	padding:0 10px;
	display:block;
	background:url(${logopic}) no-repeat 22px center;
	background-size:contain;
	float:left;
`;

export const Nav = styled.div`
	@media (max-width:1920px) and (min-width:1680px){
		width:1400px;
	}
	@media (max-width:1366px) and (min-width:1024px){
		width:900px;
	}
	.share, .more{
		&:hover{
			background:#f6f6f6;
		}
	}
`;

export const NavItem = styled.a`
    line-height: 26px;
    padding: 15px;
    color: #333;
    display:block
	margin-right: 10px;
	cursor:pointer;
	&.left{
		float:left;
	}
	&.right{
		float:right;
		color: #969696;
		padding:15px 2px;
		.iconfont{
			font-size:18px;
			font-weight:bold;
		}
	}
	&.active{
		color:#ea6f5a;
	}
	&.classify{
		position:relative;
	}
`;

export const User = styled.div`
	position:relative;
	float:right;
    line-height: 26px;
    padding: 14px;
    color: #969696;
    font-size:14px;
    span{
    	margin:0 10px 0 25px;
    	color: #dcdcdc;
    }
    .member{
    	color: #dcdcdc;
    	font-size:18px;
    	margin:0 4px;
    }
    .up{
    	font-weight:700;
    }
    img{
		width:30px;
		height:30px;
		border-radius:30px;
		border:1px solid #ccc;
		display:block;
		float:left;
		margin-right:10px;
    }
`;

export const UserMsgBox = styled.div`
	width: 240px;
	padding-bottom:12px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 1;
    .itembox{
    	margin-top:10px;
    }
    a{
    	color: #424e67;
    	line-height: 35px;
	    margin: 0;
	    padding-left: 15px;
	    font-size:12px;
	    display:block;
	    cursor:pointer;
	    &:hover{
	    	background: #f0f8fd;
	    }
    }
`;

export const Title = styled.div`
	color: #fff;
	height: 50px;
	padding: 20px 15px;
    z-index: 1;
    border-radius: 5px 5px 0 0;
    background: #438aee;
    font-size: 16px;
    line-height:44px;
    i{
    	color: #999;
    	font-size:24px;
    	margin:0 4px;
    	cursor: pointer;
    }
    img{
		width:48px;
		height:48px;
		border:1px solid #ccc;
		display:block;
		float:left;
		margin-right:12px;
    }
`;

export const SpaceBox = styled.div`
	font-size:14px;
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    display:inline-block;
    margin: 17px 15px 8px 0;
    border: 1px solid rgba(236,97,73,.7);
	float:right;
	position:absolute;
	top:0;
	right:0;
	width:180px;
	cursor:pointer;
	a{
	    height: 20px;
	    width:60px;
	    line-height: 20px;
	    border-radius: 20px;
	    display:inline-block;
	    color: #fff;
	    background-color: #ea6f5a;
	    text-align: center;
	}
`;

export const SpaceHover = styled.div`
	width: 140px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    border: 1px solid rgba(236,97,73,.7);
    border-radius:4px;
    position: absolute;
    padding:10px 20px;
    left: 0;
    top: 42px;
    z-index: 1;
`;

export const ClassifyList = styled.ul`
	width: 100px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 60px;
    z-index: 1;
    li{
    	color: #424e67;
    	line-height: 35px;
	    margin: 0;
	    padding-left: 15px;
	    font-size:14px;
	    display:block;
	    cursor:pointer;
	    &:hover{
	    	background: #f0f8fd;
	    }
    }
`;
