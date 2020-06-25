import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const refreshToken = async (setUser) => {
  const res = await axios.post(
    'http://localhost:5000/refresh-token',
    {},
    {
      withCredentials: true,
    }
  );
  const { accessToken } = res.data;
  if (accessToken) {
    console.log(accessToken);
    const { id } = jwtDecode(accessToken);
    try {
      const userRes = await axios.get(`http://localhost:5000/user/${id}`);
      console.log(userRes);
      setUser({
        accessToken: accessToken,
        name: userRes.data.name,
        id: userRes.data._id,
        admin: userRes.data.admin,
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export const checkToken = (user, setUser) => {
  const token = user.accessToken;

  if (!token) {
    return refreshToken(setUser);
  }

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return refreshToken(setUser);
    } else {
      return false;
    }
  } catch (err) {
    console.log('jwt could not be decoded');
    return console.error(err);
  }
};
