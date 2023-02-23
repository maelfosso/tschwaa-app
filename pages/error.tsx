import { NextPage } from "next"

function Error({ statusCode }: { statusCode: number }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }: NextPage) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

// export async function getServerSideProps() {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const errorCode = res.ok ? false : res.status
//   const json = await res.json()

//   return {
//     props: { errorCode, stars: json.stargazers_count },
//   }
// }

// export default function Page({ errorCode, stars }: {errorCode: number, stars: string}) {
//   if (errorCode) {
//     return <Error statusCode={errorCode} />
//   }

//   return <div>Next stars: {stars}</div>
// }


export default Error