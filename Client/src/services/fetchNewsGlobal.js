const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let fetchNewsGlobal = async (search, page) => {
  try {
    let url = `${BASE_URL}/api/news?search=${search}`;

    if (page) {
      url += `&page=${page}`;
    }

    let newsData = await fetch(url);
    let data = await newsData.json();

    return data;
  } catch (error) {
    console.error("Error fetching news;", error);
  }
};

export { fetchNewsGlobal };
