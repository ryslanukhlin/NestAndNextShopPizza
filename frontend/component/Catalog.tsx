import React from 'react'
import { Container, Grid } from '@material-ui/core'
import style from "../style/catalog.module.scss"
import CatalogItem from './CatalogItem';
import { GetStaticProps } from 'next'
import { PizzaProps } from '../types/proptype/pizza.type';


const Catalog: React.FC<{pizza: PizzaProps[]}> = ({pizza}) => {
    return (
        <Container maxWidth="xl" >
        <Grid container spacing={4} className={style.cardWrapper}>
            {pizza.map(item => (
                <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
                    <CatalogItem pizza={item} />
                </Grid>
            ))}
        </Grid>
    </Container>
    )
}

export default Catalog