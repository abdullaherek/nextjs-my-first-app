import Layout from "../../components/layout";
import Head from "next/head";
import slug from "slug";


function CharacterDetail({character}) {
  return (
    <Layout>
      <Head>
        <title>Karakter Detayı</title>
      </Head>

      <div> {character.name} </div>

      <figure>
          <img src = {character.image} alt = {character.name} />
      </figure>
    </Layout>
  );
}
export async function getStaticPaths() {
  const data = await fetch("https://rickandmortyapi.com/api/character/");
  const characters = await data.json();
  return {
    paths: 
      characters.results.map((character) => {
        return {
          params: { slug: `${slug(character.name)}-${character.id}` },
        };
      }),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  // data fetch
  const id = params.slug.split("-").slice(-1)[0]

  const data = await fetch("https://rickandmortyapi.com/api/character/" + id);
  const character = await data.json();
  return {
    props: {
      character,
    },
  };
}

export default CharacterDetail;
