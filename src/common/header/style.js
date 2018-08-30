import styled from 'styled-components';
import logopic from '../../logo.png';

export const Logo = styled.a.attrs({
	"href":'/'
})`
    width:200px;
	height:56px;
	padding:0 10px;
	display:block;
	background:url(${logopic}) no-repeat 22px center;
	background-size:contain;
`;

export const NavItem = styled.a`
    line-height: 58px;
    padding: 0 10px;
    color: #666;
`;

export const User = styled.div`
	display:inline-block;
    line-height: 56px;
    padding: 0 10px;
    color: #969696;
    font-size:14px;
    img{
		width:30px;
		height:30px;
		border-radius:30px;
		border:1px solid #ccc;
		display:block;
		float:left;
    }
    span{
    	margin-right:8px;
    }
`;

export const Title = styled.div`
	padding: 0 30px 10px 0;
    font-size: 16px;
    line-height:44px;
    img{
		width:48px;
		height:48px;
		border:1px solid #ccc;
		border-radius:48px;
		display:block;
		float:left;
		margin:8px 12px 0 0;
    }
    span{
    	color:#999;
    	cursor:pointer;
    }
`;

export const SpaceBox = styled.div`
    height: 20px;
    line-height: 20px;
    border-radius: 20px;
    display:inline-block;
    margin: 17px 15px 8px 0;
    border: 1px solid rgba(236,97,73,.7);
	width:180px;
	cursor:pointer;
	float:right;
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
	width: 180px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.2);
    border: 1px solid rgba(236,97,73,.7);
    border-radius:4px;
    padding:10px 20px;
    z-index: 999;
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
