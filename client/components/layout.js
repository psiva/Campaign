import React from 'react';
import Header from '../components/header'
import {Container} from 'semantic-ui-react';
import Head from 'next/head';

export default (props) => {
    return(
        
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
            </Head>
            <Header />
            {props.children}
        </Container>

    );
};