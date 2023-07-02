import axios from 'axios';

const checkSessionStatus = async (setIsLoggedIn: any) => {
    try {
      const response = await axios.get('/api/checkSession');
      setIsLoggedIn(response.data.status === "success"? true: false);
    } catch (error) {
      // Handle error
    }
  };

export default checkSessionStatus;