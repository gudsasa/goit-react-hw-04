import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const getImages = async (query, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      page: currentPage,
      per_page: 16,
      client_id: "L3oNBkxGmmmx6KxYA22nKxS9s3chFacv8PWv1laI7g4",
      orientation: "landscape",
    },
  });

  console.log(response.data);
  return response.data;
};
