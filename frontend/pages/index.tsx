import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const Index = () => {
    const state = useSelector(state => state.number)

    return (
        <Button>{state}</Button>
    )
}

export default Index