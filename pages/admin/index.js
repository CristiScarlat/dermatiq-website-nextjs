import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';


const AdminLogin = () => {

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                }),
                headers: {
                    Accept: 'application/json',
                }
            })
            const loginResponse = await res.json();
            if(res.status === 200){
                router.push('/admin/dashboard');
            }
        }
        catch(error){
            console.log(error)
        }

    }

    return(
            <div>
            <Form className="mx-auto my-5" style={{maxWidth:"50rem"}} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                {/*</Form.Group>*/}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}


export default AdminLogin