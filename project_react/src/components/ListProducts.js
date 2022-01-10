import { Container } from "./partials/Container";
import { useEffect, useState } from 'react';
import axios from "axios";
import {API_URL} from "../utils/constant";
import styled from "styled-components";
import Menu from "./Menu";

const TextError = styled.p`
    color: red;
    font-size: 20px;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 50px;
    align-items: center;
    justify-content: center;
`

// menerima props bernama pickCategory dan setKeranjang
export default function ListProducts( {pickCategory, setKeranjang} )
{
    // buat state menu dan produk error
    const [menus, setMenus] = useState([])
    const [productError, setProductError] = useState(false)
    
    // ketika component pertama kali di render dan nilai dari state pickCategory berubah, maka jalankan callback function yang dimiliki oleh hook useEffect
    useEffect(() => {
        // call API dengan axios 
        axios.get(`${API_URL}/products?category.nama=${pickCategory}`)
              // jika berhasil 
              .then(response => {
                // isi state menu dengan data yang diterima dari API
                setMenus(response.data);
              })
              // jika gagal   
              .catch(e => {
                // isi state productError dengan nilai boolean true
                setProductError(true)   
              })
    }, [pickCategory]);
    
    return (
        <Container>
            <h1>Produk yang tersedia</h1>
            <hr />
            {
                productError ? 
                <TextError>Server Error!</TextError> 
                :
                <Wrapper>
                    {
                        menus.map(menu => (
                            <Menu key={menu.id} menu={menu} setKeranjang={setKeranjang} />
                        ))
                    }
                </Wrapper>
            }
        </Container>
    )
}