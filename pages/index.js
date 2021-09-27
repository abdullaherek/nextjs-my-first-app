import Layout from "../components/layout";
import Link from "next/link";
import slug from "slug";

function HomePage({ characters }) {
  return (
    <Layout>
      <h1>Hoş geldin!</h1>
      <ul>
        {characters.results.map((character) => (
          <li key={character.id}>
            <Link
              href="/character/[slug]"
              as={`/character/${slug(character.name)}-${character.id}`}
            >
              <a>{character.name}</a>
            </Link>{" "}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  // data fetch
  const data = await fetch("https://rickandmortyapi.com/api/character/");
  const characters = await data.json();
  return {
    props: {
      characters,
    },
  };
}

export default HomePage;
