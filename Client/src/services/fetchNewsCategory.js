const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNewsCategory = async (category, page) => {
  try {
    let url = `${BASE_URL}/api/news/category?category=${category}`;

    if (page) {
      url += `&page=${page}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
