import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constant";
import swal from "sweetalert";
import { useState } from "react";

const Menu = styled.div`
    border: 2px solid black;
    width: 100%;
    height: 70px;
    border-radius: 15px;
    position: relative;
    margin-bottom: 20px;
`

const MenuImage = styled.img`
    width: 20%;
    height: 100%;
    
    // top left, top right, bottom right, bottom left
    border-radius: 15px 0px 0px 15px;
    
    border-right: 3px solid blue;
`

const InfoMenu = styled.p`
    font-weight: bold;
    position: absolute;
    top: -10px;
    left: 90px;
    font-size: 20px;
`

const Price = styled.span`
    position: absolute;
    top: 37px;
    left: 90px;
    font-size: 15px;
    color: gray;
`

const FlexBetween = styled.div`
    width: 10%;
    height: 100%;
    position: absolute;
    top: 0; 
    right: 0;
    display: flex;
    flex-direction: column;
    margin: auto;
`

const Option = styled(FontAwesomeIcon)`
    color: ${props => props.color || "red"};
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
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

const Jumlah = styled.input`
    width: 30px;
    height: 20px;
    border: 2px solid orange;
    border-radius: 5px;
    margin-right: 2px;
    margin-left: 2px;
    text-align: center;
`

const Wrapper = styled.div`
    margin-top: -35px;
    margin-left: 90px;
`


// menerima state menu dan setKeranjang
export default function CartMenu({menu, setKeranjang})
{
    // membuat state yang dibutuhkan di component
    const [editView, setEditView] = useState(false);
    const [count, setCount] = useState(0)

    const deleteCartProduct = () => {
        // call api dengan method delete 
        axios.delete(`${API_URL}/keranjang/${menu.id}`)
            // jika berhasil
            .then(response => {
                // ubah state keranjang menjadi data yang diterima dari API
                setKeranjang(response.data)
                // lalu munculkan sweetalert dengan jeda waktu 1.2 detik
                swal({
                    title: "Berhasil!",
                    text: "Berhasil menghapus item yang ada di keranjang!",
                    icon: "success",
                    button: false,
                    timer: 1200
                });
            })
            // jika gagal
            .catch(err => {
                // ya error lah, masa mau dilanjut
                console.log(err)
            })
    }
    
    const editProduct = () => {
        // jika state editView bernilai true 
        if(editView)
        {
            // buat var data berupa obj untuk membungkus data jumlah dan total harga yang dimiliki oleh barang yang diedit oleh si user
            const data = {
                jumlah: count,
                total_harga: menu.produk.harga * count
            }
            
            // lalu call api yang memiliki method patch pada keranjang / card
            axios.patch(`${API_URL}/keranjang/${menu.id}`, data)
                // jika berhasil
                .then(response => {
                    // ubah state keranjang menjadi data yang diterima oleh API
                    setKeranjang(response.data)
                    
                    // lalu tampilkan sweet alert dengan jeda waktu 1.2 detik
                    swal({
                        title: "Berhasil!",
                        text: `Berhasil mengedit jumlah item ${menu.produk.nama}!`,
                        icon: "success",
                        button: false,
                        timer: 1200
                    })
                    
                    // ubah state editView menjadi false dan ubah state count menjadi 0 juga
                    setEditView(false)
                    setCount(0)
                })
                // jika gagal
                .catch(e => {
                    // ya udah gagal, mau apa lagi
                    console.log(e)
                })
        }
        // jika state editView tidak bernilai true alias false
        else
        {
            setCount(count === 0 ? menu.jumlah : 0)
            setEditView(editView ? false : true)
        }
    }
    
    return (
        <Menu>
            {/* tampilkan image dengan source dari gambar produk yg dimiliki oleh obj menu */}
            <MenuImage src={`/img/${menu.produk.gambar}`} />
            {
                editView ?
                <>
                    <InfoMenu>{menu.produk.nama}</InfoMenu>
                    
                    <Wrapper>
                        <Button onClick={setCount.bind(this, count >= 1 ? count+1 : count)} > + </Button>
                        <Jumlah type="number" value={count} disabled />
                        <Button onClick={setCount.bind(this, count > 1 ? count-1 : count)} > - </Button>
                    </Wrapper>
                </>
                :
                <>
                    <InfoMenu>{menu.produk.nama} x {menu.jumlah}</InfoMenu>
                    <Price>Rp. {menu.total_harga}</Price>
                </>
            }
            <FlexBetween>
                <Option onClick={editProduct.bind(this)} 
                    icon={editView ? faCheck : faPen} 
                    color={editView ? "green" : "blue"} 
                />
                <Option 
                    onClick={deleteCartProduct.bind(this)} 
                    icon={faTrash} 
                />
            </FlexBetween>
        </Menu>
    )
}