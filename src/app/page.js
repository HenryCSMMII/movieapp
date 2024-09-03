import Results from "@/components/Results";

const API_KEY = process.env.API_KEY; // Asegúrate de que esto esté configurado correctamente en tu archivo .env.local

export default async function Home({ searchParams }) {
  const genre = searchParams?.genre || 'fetchTrending';

  // Construye la URL correctamente
  const endpoint = genre === 'fetchTopRated' ? '/movie/top_rated' : '/trending/all/week';
  const url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;

  //try {
    // Realiza la solicitud a la API
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json' // No es necesario agregar 'Authorization' para API Key
      }
    });

    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response text:', errorText);
      throw new Error('Failed to fetch data');
    }

    const data = await res.json(); // Procesa la respuesta correctamente
    console.log('Fetched data results:', data.results);

    // Renderiza el componente con los datos obtenidos
    return (
      <div>
        <Results results={data.results} />
      </div>
    );
  // } catch (error) {
  //   console.error('Error fetching data:', error.message);
  //   // Puedes manejar el error y mostrar un mensaje en la UI si es necesario
  // }
}