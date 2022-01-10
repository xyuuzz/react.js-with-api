import styled from 'styled-components';

const Nav = styled.nav`
    width: 100%;
    background-color: white;
    height: 80px;
    box-shadow: 5px 0 7px 3px black;
`;

const Wrapper = styled.div`
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: space-between;
`;

const LeftNav = styled.h1`
    color: blue;
    font-size: 30px;
`;
const RightNav = styled.ul`
    list-style: none;
    display: inline;
`;
const Li = styled.li`
    color: gray;
    display: inline-block;
    padding-right: 30px;
    cursor: pointer;
    font-size: 20px;
    margin-top: 10px;
    
    ::before {
        border-bottom: 3px solid black;
        border-left: 0;    
        -webkit-transform-origin: 0% 100%;
    }    
    ::after {
        display:block;
        content: '';
        border-bottom: solid 3px #019fb6;  
        transform: scaleX(0);  
        transition: transform 250ms ease-in-out;
        transform-origin:0% 50%;
    }
    :hover:after { 
        transform: scaleX(1); 
    }
    :hover {
        color: black;
    }
`

export default function Navbar()
{
    return (
        <Nav>
            <Wrapper>
                <LeftNav>Website Kasir</LeftNav>
                <RightNav>
                    <Li>Maulana</Li>
                    <Li>Maulana</Li>
                    <Li>Maulana</Li>
                    <Li>Maulana</Li>
                </RightNav>
            </Wrapper>
        </Nav>
    );
}