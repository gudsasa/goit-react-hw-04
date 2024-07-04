import axios from 'axios';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export default async function FetchImage(img, currentPage) {
  const response = await axios.get('/search/photos', {
    params: {
      client_id: 'JB-j9TEU1bRkcm15slIO2JI8TqL5-MjHzde3VnQXA8k',
      query: img,
      page: currentPage,
      per_page: 12,
    },
  });

  return response.data.results;
}
