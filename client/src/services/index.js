import axios from 'axios';
import { requestInterceptor, responseInterceptor } from './axiosInterceptors';

const commonAxios = axios.create();

requestInterceptor();
responseInterceptor();

// GITHUB SERVICE
export const fetchGithubData = async ({ setUserData, user }) => {
  const res = await commonAxios.get(`https://api.github.com/users/${user}`);
  setUserData({
    avatar: res.data.avatar_url,
    name: res.data.name,
    user: res.data.login,
    url: res.data.html_url,
  });
};

// USER SERVICES
export const loginUser = async ({ userData, setError }) => {
  const res = await commonAxios
    .post(`${process.env.REACT_APP_API_URL}/api/users/login`, userData)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.status === 403) {
        setError(true);
      }
    });

  return res;
};

export const sendUserData = async ({ userData, setError }) => {
  const res = await axios
    .post(`${process.env.REACT_APP_API_URL}/api/users/signup`, userData)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      if (err.response.status === 403) {
        switch (err.response.data[0]) {
          case 'email':
            setError({
              firstName: '',
              lastName: '',
              password: '',
              username: '',
              email: 'Email already in use.',
            });
            break;
          case 'username':
            setError({
              firstName: '',
              lastName: '',
              password: '',
              username: 'Username already in use.',
              email: '',
            });
            break;
          default:
            break;
        }
      } else if (err.response.status === 400) {
        switch (err.response.data.split('. ')[1].replace('.', '')) {
          case 'firstName':
            setError({
              firstName: 'Only letters and spaces are allowed.',
              lastName: '',
              password: '',
              username: '',
              email: '',
            });
            break;
          case 'lastName':
            setError({
              firstName: '',
              lastName: 'Only letters and spaces are allowed.',
              password: '',
              username: '',
              email: '',
            });
            break;
          case 'password':
            setError({
              firstName: '',
              lastName: '',
              password: 'Password must have {8} to {16} characters.',
              username: '',
              email: '',
            });
            break;
          default:
            break;
        }
      }
    });

  return res;
};

export const fetchUserData = async ({ setUserData, username }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users?username=${username}`
  );

  setUserData({
    firstName: res.data[0].firstName,
    lastName: res.data[0].lastName,
    email: res.data[0].email,
    username: res.data[0].username,
    id: res.data[0]._id,
  });
};

export const fetchUserDataById = async ({ setUserData, id }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users?_id=${id}`
  );

  setUserData({
    firstName: res.data[0].firstName,
    lastName: res.data[0].lastName,
    email: res.data[0].email,
    username: res.data[0].username,
  });
};

export const updateUserData = async ({ userData, setError, id }) => {
  const res = await axios
    .put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, userData)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      if (err.response.status === 403) {
        switch (err.response.data[0]) {
          case 'email':
            setError({
              firstName: '',
              lastName: '',
              password: '',
              username: '',
              email: 'Email already in use.',
            });
            break;
          case 'username':
            setError({
              firstName: '',
              lastName: '',
              password: '',
              username: 'Username already in use.',
              email: '',
            });
            break;
          default:
            break;
        }
      } else if (err.response.status === 400) {
        switch (err.response.data.split('. ')[1].replace('.', '')) {
          case 'firstName':
            setError({
              firstName: 'Only letters and spaces are allowed.',
              lastName: '',
              password: '',
              username: '',
              email: '',
            });
            break;
          case 'lastName':
            setError({
              firstName: '',
              lastName: 'Only letters and spaces are allowed.',
              password: '',
              username: '',
              email: '',
            });
            break;
          case 'password':
            setError({
              firstName: '',
              lastName: '',
              password: 'Password must have {8} to {16} characters.',
              username: '',
              email: '',
            });
            break;
          default:
            break;
        }
      }
    });
  return res;
};

export const deleteUserData = async ({ id }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/users/${id}`
  );
  return res.data;
};

// MATCH PETS SERVICES
export const sendMatchPetData = async ({ matchPetData }) => {
  const res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/match-pets`,
    data: matchPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());
};

export const fetchMatchPetsData = async ({ setMatchPets }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/match-pets`
  );
  setMatchPets(res.data.reverse());
};

export const fetchMatchPetData = async ({ savedData, id }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/match-pets/${id}`
  );
  savedData(res.data);
};

export const updateMatchPetData = async ({ matchPetData, id }) => {
  const res = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/match-pets/${id}`,
    data: matchPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());

  return res.data;
};

export const deleteMatchPetData = async ({ id }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/match-pets/${id}`
  );
  return res.data;
};

// LOST PET SERVICES
export const sendLostPetData = async ({ lostPetData }) => {
  const res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/lost-pets`,
    data: lostPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());
};

export const fetchLostPetsData = async ({ setLostPets, setLoading }) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lost-pets`);
  setLostPets(res.data.reverse());
  setLoading(false);
};

export const fetchFilterLostPetsData = async ({ query, setLostPets }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/lost-pets?${query}`
  );
  setLostPets(res.data.reverse());
};

export const fetchLostPetData = async ({ savedData, id }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/lost-pets/${id}`
  );
  savedData(res.data);
};

export const updateLostPetData = async ({ lostPetData, id }) => {
  const res = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/lost-pets/${id}`,
    data: lostPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());

  return res.data;
};

export const deleteLostPetData = async ({ id }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/lost-pets/${id}`
  );
  return res.data;
};

export const fetchLostPetByQuery = async ({ query }) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/lost-pets?${query}`);
};

// FOUND PET SERVICES
export const sendFoundPetData = async ({ foundPetData }) => {
  const res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/found-pets`,
    data: foundPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());
};

export const fetchFoundPetsData = async ({ setFoundPets, setLoading }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/found-pets`
  );
  setFoundPets(res.data.reverse());
  setLoading(false);
};

export const fetchFilterFoundPetsData = async ({ query, setFoundPets }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/found-pets?${query}`
  );
  setFoundPets(res.data.reverse());
};

export const fetchFoundPetData = async ({ savedData, id }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/found-pets/${id}`
  );
  savedData(res.data);
};

export const updateFoundPetData = async ({ foundPetData, id }) => {
  const res = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/found-pets/${id}`,
    data: foundPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());

  return res.data;
};

export const deleteFoundPetData = async ({ id }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/found-pets/${id}`
  );
  return res.data;
};

// ADOPTION PET SERVICES
export const sendAdoptionPetData = async ({ adoptionPetData }) => {
  const res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/adoption-pets`,
    data: adoptionPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());
};

export const fetchAdoptionPetsData = async ({
  setAdoptionPets,
  setLoading,
}) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/adoption-pets`
  );
  setAdoptionPets(res.data.reverse());
  setLoading(false);
};

export const fetchFilterAdoptionPetsData = async ({
  query,
  setAdoptionPets,
}) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/adoption-pets?${query}`
  );
  setAdoptionPets(res.data.reverse());
};

export const fetchAdoptionPetData = async ({ savedData, id }) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/adoption-pets/${id}`
  );
  savedData(res.data);
};

export const updateAdoptionPetData = async ({ adoptionPetData, id }) => {
  const res = await axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/api/adoption-pets/${id}`,
    data: adoptionPetData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).finally(() => window.location.reload());

  return res.data;
};

export const deleteAdoptionPetData = async ({ id }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/adoption-pets/${id}`
  );
  return res.data;
};

// TABLE DATA SERVICE
export const fetchAllPetDataByUsername = async ({ setData, username }) => {
  const endpoints = [
    `${process.env.REACT_APP_API_URL}/api/match-pets?username=${username}`,
    `${process.env.REACT_APP_API_URL}/api/lost-pets?username=${username}`,
    `${process.env.REACT_APP_API_URL}/api/found-pets?username=${username}`,
    `${process.env.REACT_APP_API_URL}/api/adoption-pets?username=${username}`,
  ];

  const res = await Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint))
  );

  const sectionSelect = (data) => {
    if (data.petName === undefined) return 'Found';
    if (data.testimony) return 'Match';
    if (data.filter.dewormed !== undefined) return 'Adoption';
    return 'Lost';
  };

  const data = res.map((res) => res.data).flat();

  const rowData = data.map((info) => {
    return {
      id: info._id,
      section: sectionSelect(info),
      petName: info.petName || '-',
      specie: info?.filter?.specie || '-',
      breed: info?.filter?.breed || '-',
      date: info.date || '-',
    };
  });

  setData(rowData);
};
