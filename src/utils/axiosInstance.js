import axios from 'axios';
import toast from 'react-hot-toast';

const instance = axios.create({
  // Add your Axios configuration here (baseURL, headers, etc.)
});

instance.interceptors.response.use(
  (response) => {
    // If the request was successful, return the response
    return response;
  },
  (error) => {
    // Handle error globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast.error(`${error.response.data.message}`,{
        position: "bottom-center",
        style: {
          maxWidth: "fit-content"
        }
      })
    } else if (error.request) {
      // The request was made but no response was received
      toast.error(`No response from the server. Please try again.`,{
        position: "bottom-center",
        style: {
          maxWidth: "fit-content"
        }
      })
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error(`Something went wrong :(`,{
        position: "bottom-center",
        style: {
          maxWidth: "fit-content"
        }
      })
    }

    // Return a rejected promise to stop the promise chain
    return Promise.reject(error);
  }
);

export default instance;