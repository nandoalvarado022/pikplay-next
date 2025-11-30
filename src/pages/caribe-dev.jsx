export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/landing-store-lead',
      permanent: false,
    },
  }
}

export default function CaribeDev() {
  return null
}
