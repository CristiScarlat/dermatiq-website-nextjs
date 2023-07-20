import {getSession, signOut, useSession} from 'next-auth/react';
import {Button} from "react-bootstrap";

const Admin = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({req: context.req});

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};

export default Admin;