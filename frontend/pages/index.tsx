import React from 'react'
import Catalog from '../component/Catalog'
import { GetStaticProps } from 'next'
import { TPizza } from '../types/pizza.type'


const Index: React.FC<{pizza: TPizza[]}> = ({pizza}) => {
    return (
        <Catalog pizza={pizza} />
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const res  = await fetch("http://localhost:8000/product")
    const pizza = await res.json()

    return {
        props: { pizza }
    }
}

export default Index