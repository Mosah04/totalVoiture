const { REACT_APP_BACKEND_URL } = process.env;

export const createAnnonce = async (token, data) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/annonces`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) {
      console.log(response.status);
      //   throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createAnnonce:", error.message);
    // throw error;
  }
};

const getAnnonces = async (id = undefined) => {
  const requestURL = !id
    ? `${REACT_APP_BACKEND_URL}/annonces`
    : `${REACT_APP_BACKEND_URL}/annonces/${id}`;
  try {
    const response = await fetch(requestURL, {
      method: "GET",
    });
    if (!response.ok) {
      console.log(response.status);
      //   throw new Error(`HTTP error! status: ${response.status}`);
    }
    const annonces = await response.json();
    return annonces;
  } catch (error) {
    console.error("Error in createAnnonce:", error.message);
    // throw error;
  }
};
export const annoncesLoader = async () => {
  const annonces = await getAnnonces();
  console.log("ANNONCES", annonces);
  return { annonces };
};
export const annoncesLoaderWithId = async ({ params: { annonceId } }) => {
  const annonce = await getAnnonces(annonceId);
  console.log("ANNONCESID", annonce);
  return { annonce };
};
