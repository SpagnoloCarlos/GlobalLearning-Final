import React from 'react';
import CardsPet from '../../components/CardsPets/CardsPets';
import { Box, Container } from '@mui/material';
import './FoundPets.css';

const FoundPets = () => {
  return (
    <>
      <Box><h1>FOUND PETS</h1></Box>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <CardsPet
          title={'Firulais'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://www.vitake.net/wp-content/uploads/2015/04/ny6-300x300.jpg'
          }
        />
        <CardsPet
          title={'Toto'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://www.vitake.net/wp-content/uploads/2015/04/ny8-300x300.jpg'
          }
        />
        <CardsPet
          title={'Homer'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://www.vitake.net/wp-content/uploads/2015/04/ny3-300x300.jpg'
          }
        />
        <CardsPet
          title={'Michi'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://smylepets.com/wp-content/uploads/2021/04/dragon-li-gato-300x300.jpg'
          }
        />
        <CardsPet
          title={'Negrita'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://lealcan.com/wp-content/uploads/2021/12/PerroConMiedoAPetardosOFuegosArtificiales-300x300.jpg'
          }
        />
        <CardsPet
          title={'Tom'}
          description={'Encontrado el dia 22-02-2022'}
          button={'Más Detalles'}
          img_src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREtlldYkYu2uL4lBd3R9EPmeH_mRvl3UrSRJV7K5uwniw2A7DOaruTtDHlwRDqLEL0o3Q&usqp=CAU'
          }
        />
      </Container>
    </>
  );
};

export default FoundPets;
