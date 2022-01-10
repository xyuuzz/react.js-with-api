import styled from "styled-components";
import { Container } from "./partials/Container";
import CartMenu from "./CartMenu";
import { useState, useEffect, useRef } from "react";
import {API_URL} from "../utils/constant"
import axios from "axios";
import { TextError } from "./partials/TextError";

const SubmitButton = styled.button`
    float: right;
    background-color: white;
    border: 2px solid #aeb7b8;
    border-radius: 7px;
    font-size: 15px;
    padding: 10px;
    cursor: pointer;
    margin-top: -20px;
    
    :hover {
        background-color: #aeb7b8; 
    }
`

const Wrapper = styled.div`
    overscroll-behavior: contain ;
    height: ${props => props.height > 300 || props.height === 0 ? "400px" : `${props.height}px`};
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
    padding-right: 20px;
    margin-bottom: 40px;
`

const PriceTotal = styled.span`
    color: #8fc68;
    font-size: 15px;
`

// menerima props yang berupa state keranjang / cart.
export default function Result({keranjang, setKeranjang})
{
    const [menus, setMenus] = useState([]);
    const [err, setErr] = useState(false)
    const [priceTotal, setPriceTotal] = useState(0) 
    const [heightResult, setHeightResult] = useState(0)
    const resultComp = useRef(null)
    
    useEffect(() => {
        axios.get(`${API_URL}/keranjang`)
            .then(response => {
                setMenus(response.data);
                
                let priceTotal = 0;
                response.data.forEach(menu => {
                    priceTotal+=menu.total_harga
                })
                setPriceTotal(priceTotal)
            })
            .catch(() => {
                setErr(true)
            })
        
        setHeightResult(resultComp.current.offsetHeight)
        console.log(heightResult)
    }, [keranjang]);
    
    return (
        <Container ref={resultComp}>
            <h1>Keranjang</h1>
            <hr />
            {
                menus.length === 0 && <h3>Silahkan Pesan Makanan</h3>
            }
            {
                err && <TextError>Server Error, Mohon Coba Lagi!</TextError>
            }
            <Wrapper height={heightResult}>
                {
                    menus.map(menu => (
                        <CartMenu key={menu.id} menu={menu} setKeranjang={setKeranjang} />
                    ))
                }
            </Wrapper>
            {
                menus.length >= 1 && 
                <>
                    <PriceTotal>Total Pembayaran: <br/>
                    Rp. {new Intl.NumberFormat('de-DE').format(priceTotal)}</PriceTotal>
                    <SubmitButton>Pesan Menu</SubmitButton>
                </>
            }
        </Container>
    )
}