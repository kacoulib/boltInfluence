import { useGraphQL } from 'graphql-react'
import Link from 'next/link'

export default () => {
  const { loading, cacheValue = {} } = useGraphQL({
    fetchOptionsOverride (options) {
      options.url = 'https://graphql-pokemon.now.sh'
    },
    operation: {
      query: `
        {
          pokemon(name: "Pikachu") {
            name
            image
          }
        }
     `
    }
  })

  const { data } = cacheValue
  if (!data)
    return loading ? (<p>Loading…</p>) : (<p>Error!</p>);

  return (
    <div>
      <Link href="/a">
        <a>About Page</a>
      </Link>
      <img src={data.pokemon.image} alt={data.pokemon.name} />
    </div>
  )
}
