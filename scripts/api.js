const fetchApiGET = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return [];
  }
};

const fetchApiPOST = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    return [];
  }
};

export { fetchApiGET, fetchApiPOST };
