import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form, Button } from "react-bootstrap";
import styles from "../../styles/Admin.module.css";
export default function Index() {
  const { data, status } = useSession();
  const router = useRouter();
  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn('credentials', {
      redirect: false,
      username: e.target[0].value,
      password: e.target[1].value,
    })
      .then((response) => {
        console.log(response);
        router.replace('/admin/admin');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return(
    <div>
      <Form className={styles.loginFormWrapper} onSubmit={handleSignIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({req: context.req});

  if (session) {
    return {
      redirect: {
        destination: '/admin/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};