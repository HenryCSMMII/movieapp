import Results from "@/components/Results";

export default async function SearchPage ({params}){
    const searchTerm = params.searchTerm;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json' // No es necesario agregar 'Authorization' para API Key
        }
      });

      const data = await res.json();
      const results = data.results;

      console.log(data)

    return(
        <div>
            {
                results && results.length === 0 ?
                (<h1 className="text-center pt-6">No results found</h1>)
                :(results && <Results results={results} />)}
        </div>
    )
}