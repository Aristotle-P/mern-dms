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
    const { id } = jwtDecode(accessToken);
    try {
      const userRes = await axios.get(`http://localhost:5000/user/${id}`);
      const bonusRes = await axios.get(`http://localhost:5000/bonuses/${id}`);
      const currentMonth = new Date().getMonth();
      const latestBonus = bonusRes.data[bonusRes.data.length - 1];
      try {
        if (latestBonus && latestBonus.month === currentMonth) {
          setUser({
            accessToken: accessToken,
            name: userRes.data.name,
            id: userRes.data._id,
            currentBonus: latestBonus,
            admin: userRes.data.admin,
          });
        } else {
          const newRes = await axios.post(`http://localhost:5000/bonuses`, {
            showroomEntries: false,
            googleReviews: false,
            surveys: false,
            financeDeals: 0,
            warranties: 0,
            maintenance: 0,
            insurance: 0,
            salesperson: id
          })
          setUser({
            accessToken: accessToken,
            name: userRes.data.name,
            id: userRes.data._id,
            currentBonus: newRes.data,
            admin: userRes.data.admin,
          });
        }
      } catch (err) {
        console.log(err);
      }
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
