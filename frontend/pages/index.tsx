import React from 'react'
import Catalog from '../component/Catalog'
import { GetStaticProps } from 'next'
import { TPizza } from '../types/pizza.type'
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Index: React.FC<{pizza: TPizza[]}> = ({pizza}) => {
    return (
        <Catalog pizza={pizza} />
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const res  = await fetch(publicRuntimeConfig.backendUri + '/product')
    const pizza = await res.json()

    return {
        props: { pizza }
    }
}

export default Index