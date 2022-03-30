import { useEffect, useState, Fragment } from 'react';
// ROUTER
import { useNavigate } from 'react-router-dom';
// MATERIAL UI
import {
  Box,
  Pagination,
  Typography,
  CssBaseline,
} from '@mui/material';
// COMPONENTS
import CardsPet from '../../components/CardsPets/CardsPets';
import Filter from '../../components/Filters/Filters';
import CardsPetsSkeleton from '../../components/CardsPets/util/CardsPetsSkeleton';
import AddPet from '../../components/AddPet/AddPet';
import Progress from '../../components/Progress/Progress';
// SERVICES
import {
  fetchAdoptionPetsData,
  fetchFilterAdoptionPetsData,
} from '../../services';
// STYLES
import styles from './styles';

const AdoptionPets = () => {
  const [adoptionPets, setAdoptionPets] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [adoptionPetsGroups, setAdoptionPetsGroups] = useState([[1]]);
  const navigate = useNavigate();
  const skeletonCount = new Array(9 - (adoptionPets.length % 9)).fill(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAdoptionPetsData({ setAdoptionPets, setLoading });
  }, []);

  useEffect(() => {
    const reg = /filter./g;
    navigate(
      `/adoption-pets/${page}?${query.replace(reg, '').toLocaleLowerCase()}`
    );
  }, [page, query]);

  useEffect(() => {
    fetchFilterAdoptionPetsData({ query, setAdoptionPets });
    setPage(1);
    setMaxPage(adoptionPets.length);
  }, [query]);

  useEffect(() => {
    const splitArrayIntoSubArrays = () => {
      let subArray = [];
      let i = 0;

      while (i < adoptionPets.length) {
        subArray.push(adoptionPets.slice(i, (i += 9)));
      }

      return subArray;
    };

    const subArray = splitArrayIntoSubArrays();

    setAdoptionPetsGroups(subArray);
    setMaxPage(subArray.length);
  }, [adoptionPets]);

  const handleChange = (value) => {
    setPage(value);
  };

  const handleOnFilter = (value) => {
    setQuery(value);
  };

  return (
    <Box sx={styles.page}>
      <CssBaseline />
      <Box sx={styles.box_title}>
        <h1 style={styles.title}>ADOPTION</h1>
        <div style={styles.addPet}>
          <AddPet option={'*AddAdoption'} />
        </div>
      </Box>
      <Filter buttonFilter={handleOnFilter} page='adoption-pets' />
      <Pagination
        page={page}
        count={maxPage}
        color='secondary'
        onChange={(event, value) => {
          handleChange(value);
        }}
        sx={styles.pagination}
      />
      <Box sx={styles.container}>
        {loading ? (
          <Progress />
        ) : adoptionPets.length !== 0 && adoptionPetsGroups.length > 0 ? (
          adoptionPetsGroups[page - 1].map((item, index) => {
            if (page === maxPage && index === 8 - skeletonCount.length) {
              if (skeletonCount.length === 8) {
                skeletonCount[0] = true;
              }

              return (
                <Fragment key={index}>
                  <CardsPet
                    key={index}
                    title={item.petName}
                    description={item.description}
                    date={item.date}
                    button={'More Details'}
                    img_src={item.imageURL}
                    filter={item.filter}
                    addressRoad={item.addressRoad}
                    addressNumber={item.addressNumber}
                    phone={item.phone}
                    position={item.latLng}
                    page='adoption-pets'
                  />
                  {skeletonCount.map((content, subIndex) => {
                    return (
                      <CardsPetsSkeleton
                        key={`${page}${subIndex}`}
                        flexVariant={content}
                      />
                    );
                  })}
                </Fragment>
              );
            }

            return (
              <Fragment key={index}>
                <CardsPet
                  key={index}
                  title={item.petName}
                  description={item.description}
                  date={item.date}
                  button={'More Details'}
                  img_src={item.imageURL}
                  filter={item.filter}
                  addressRoad={item.addressRoad}
                  addressNumber={item.addressNumber}
                  phone={item.phone}
                  position={item.latLng}
                  page='adoption-pets'
                />
              </Fragment>
            );
          })
        ) : (
          <Box sx={styles.box_notFound}>
            <Typography variant='h1' sx={styles.typography}>
              Pets Not Found
            </Typography>
            <img
              src='https://cdn-icons-png.flaticon.com/512/21/21656.png'
              width='250px'
              height='250px'
              alt='No-Results'
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdoptionPets;
