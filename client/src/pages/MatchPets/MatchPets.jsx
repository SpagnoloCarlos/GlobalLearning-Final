import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import MatchPet from '../../components/MatchPet/MatchPet';
import MatchPetSkeleton from '../../components/MatchPet/utils/MatchPetSkeleton';

//DELETE THIS
// const matchPets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const matchPets = [
  {
    username: 'Ryan',
    image: 'https://i.ytimg.com/vi/RKBcs9tNWg8/maxresdefault.jpg',
    petName: 'Woody',
    testimony:
      'Texto de relleno super genérico. OH NO! no me lean! Soy la vergüenza de todos los textos! :C',
  },
  {
    username: 'Sarah',
    image:
      'https://www.rover.com/blog/wp-content/uploads/2015/06/iStock_000038751970Large.jpg',
    petName: 'Manchas',
    testimony:
      'Texto de relleno super genérico. OH NO! no me lean! Soy la vergüenza de todos los textos! :C',
  },
  {
    username: 'Scott',
    image:
      'https://todayheadline.co/wp-content/uploads/2021/06/stolen_service_dog_reunion_featured.png',
    petName: 'Firulais',
    testimony:
      'Texto de relleno super genérico. OH NO! no me lean! Soy la vergüenza de todos los textos! :C',
  },
  {
    username: 'Jake',
    image:
      'https://149366112.v2.pressablecdn.com/wp-content/uploads/2014/12/8135908730_0be6547c25_k.jpg',
    petName: 'Pantufla',
    testimony:
      'Texto de relleno super genérico. OH NO! no me lean! Soy la vergüenza de todos los textos! :C',
  },
  {
    username: 'Ryan',
    image: 'https://i.ytimg.com/vi/RKBcs9tNWg8/maxresdefault.jpg',
    petName: 'Woody',
    testimony:
      'Texto de relleno super genérico. OH NO! no me lean! Soy la vergüenza de todos los textos! :C',
  },
];

const Opinions = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [matchPetsGroups, setMatchPetsGroups] = useState([[1]]);
  const skeletonCount = new Array(4 - matchPets.length % 4).fill(false);
  const navigate = useNavigate();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    navigate(`/match-pet/${page}`);
    console.log(skeletonCount)
  }, [page]);

  useEffect(() => {
    const splitArrayIntoSubArrays = () => {
      let subArray = [];
      let i = 0;

      while (i < matchPets.length) {
        subArray.push(matchPets.slice(i, (i += 4)));
      }

      return subArray;
    };

    const subArray = splitArrayIntoSubArrays();

    setMatchPetsGroups(subArray);
    setMaxPage(subArray.length);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {matchPetsGroups &&
          matchPetsGroups[page - 1].map((item, index) => {
            if (page === maxPage && index === 3 - skeletonCount.length) {
              if(skeletonCount.length === 3){
                skeletonCount[0] = true;
              }

              return (
              <>
                <MatchPet testimonyData={item}
                  flexVariant={index === 0 || index === 1}/>
                {
                  skeletonCount.map((content) => {
                    return <MatchPetSkeleton flexVariant={content}/>
                  })                  
                }
              </>)
            }

            return (
              <>
                <MatchPet
                  testimonyData={item}
                  flexVariant={index === 0 || index === 1}
                />
              </>
            );
          })}
      </Box>
      <Pagination
        count={maxPage}
        onChange={handleChange}
        color={'primary'}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default Opinions;


// 3 2 1 0
// V F F   F F   F
// 