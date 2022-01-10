import styled from "styled-components";
import { Container } from "./partials/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";


const Icon = (props => {
    if (props.nama === "Makanan") return <IconTag icon={faUtensils} />
    if (props.nama === "Minuman") return <IconTag icon={faCoffee} />
    if (props.nama === "Cemilan") return <IconTag icon={faCheese} />
})

const IconTag = styled(FontAwesomeIcon)`
    margin-right: 10px;
`

const Group = styled(Container)`
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid black;
    cursor: pointer;
`

const Item = styled.p`
    font-weight: bold;
    font-size: 15px;
`

const CheckBox = styled.input`
    margin-top: 22px;
`;

export default function Category({category, setPickCategory})
{
    return (
        <Group onClick={setPickCategory.bind(this, category.nama)} >
            <Item>
                <Icon nama={category.nama}/>
                {category.nama}
            </Item> 
        </Group>
    )
}