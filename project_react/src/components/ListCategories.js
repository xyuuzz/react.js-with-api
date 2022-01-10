import { useEffect, useState } from "react/cjs/react.development"
import { Container } from "./partials/Container"
import {API_URL} from '../utils/constant'
import axios from "axios"
import Category from "./Category"
import { TextError } from "./partials/TextError"

// menerima props bernama => setPickCategory
export default function ListCategories({setPickCategory})
{
    // membuat state kategori dan error
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    
    // callback fungsi akan dijalankan hanya saat component pertama kali di render
    useEffect(() => {
        // call api dengan menggunakan axios
        axios.get(`${API_URL}/categories`)
            // jika berhasil
            .then(response => {
                // isi state kategori dengan data yang diterima dari API
                setCategories(response.data)
            })
            // jika gagal
            .catch(() => {
                // isi state error dengan nilai boolean true
                setError(true)
            })
    }, [])
    
    return (
        <Container>
            <h1>Menu Kategori</h1>
            {
                error ?
                <TextError>Server Error!</TextError>
                :
                <>
                    <hr />
                    {
                        categories.map(category => (
                            <Category key={category.id} 
                                category={category}
                                setPickCategory={setPickCategory}
                            />
                        ))
                    }
                </>
            }
        </Container>
    )
}