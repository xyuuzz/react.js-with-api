import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../utils/constant";
import swal from 'sweetalert';
import axios from "axios";
import { useState } from "react";
import { TextError } from "./partials/TextError";

const Card = styled.div`
    border: 2px solid black;
    width: 100%;
    height: max-content;
    border-radius: 5px;
`

const CardImage = styled.img`
    width: 100%;
    height: 100px;
    border-radius-top-left: 5px;
    border-radius-top-right: 5px;
`
const ProductName = styled.p`
    font-size: 14px;
    font-weight: bold;
`;

const ProductDetail = styled.div`
    border: 2px solid #e841e0;
    margin: 3px;
    padding: 5px;
    border-radius: 7px;
`

const FlexJustifyCenter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: auto;
`
const ProductPrice = styled.p`
    font-size: 12px;
    color: gray;
    margin-top: 15px;
`

const IsReady = styled.span`
    color: green;
    text-align: center;
    display: block;
`

const AddCart = styled(FontAwesomeIcon)`
    color: black;
    padding: 5px;
    font-size: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
        
    :active {
        color: white;
        background-color: blue;
    }
`

const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${props => props.width}%;
    margin: auto;
    margin-left: 6px;
`

const Jumlah = styled.input`
    width: 30px;
    height: 20px;
    border: 2px solid orange;
    border-radius: 5px;
    margin-right: 2px;
    margin-left: 2px;
    text-align: center;
`

const Button = styled.button`
    width: 20px;
    height: 20px;
    background-color: orange;
    border: none;
    border-radius: 5px;
    margin-top: 2px;
    cursor: pointer;
    text-align: center;
`

export default function Menu( {menu, setKeranjang} )
{    
    // buat state bernama count dan error
    const [count, setCount] = useState(1)
    const [error, setError] = useState(false)

    // buat fungsi addCart yang menerima parameter menu berupa objek yang nanti akan dipanggil ketika user meng-klik tombol cart
    const addCart = () => {
        // data yang akan dikirimkan ke API yang memiliki method post 
        const data = {
            jumlah: count,
            total_harga: menu.harga * count,
            produk: menu
        }
        
          // call API dengan method post dan kirimkan nilai yang dimiliki variabel data.
          axios.post(`${API_URL}/keranjang`, data)
            // jika berhasil
            .then(response => {
                // isi state keranjang dengan response dari API
                setKeranjang(response);
                // buat alert untuk user dengan sweetalert
                swal({
                    title: "Berhasil!!",
                    text: `Sukses Menambahkan ${data.produk.nama} ke dalam keranjang`,
                    icon: "success",
                    button: false,
                    timer: 1500
                  })
                // isi state count dengan nilai 1
                setCount(1)
            })
            // jika gagal
            .catch(e => {
                setError(true)
            });
    };
    
    return (
        <>
        {
            error ?
            <TextError>Server Error!</TextError>
            :
            <Card>
            <CardImage src={`/img/${menu.gambar}`} />
            <ProductDetail>
                <IsReady>{menu.is_ready ? "Stok masih ada" : "Stok habis"}</IsReady>
                <FlexJustifyCenter>
                    <ProductName>{menu.nama}</ProductName>
                    <ProductPrice>Rp. {new Intl.NumberFormat('de-DE').format(menu.harga)}</ProductPrice>
                </FlexJustifyCenter>
                <FlexBetween width="90">
                    <FlexBetween width="30">
                        {/* ketika tombol dibawah diklik, tambahkan nilai state count bernilai 1*/}
                        <Button onClick={setCount.bind(this, count >= 1 ? count+1 : count)} > + </Button>
                        <Jumlah type="number" value={count} disabled />
                        {/* ketika tombol dibawah diklik, kurangi nilai state count bernilai 1 */}
                        <Button onClick={setCount.bind(this, count > 1 ? count-1 : count)} > - </Button>
                    </FlexBetween>
                    {/* ketika tombol dibawah diklik, panggil fungsi addCard */}
                    <AddCart onClick={addCart.bind(this)} icon={faCartPlus} />
                </FlexBetween>
            </ProductDetail>
        </Card>
        }
        </>
    )
}