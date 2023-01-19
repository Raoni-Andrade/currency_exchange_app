const getCurrencies = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const requestJson = await request.json();
  const currenciesList = Object.keys(requestJson);
  console.log('JSON LIST: ', requestJson);
  return ({ currenciesList, requestJson });
};

export default getCurrencies;
