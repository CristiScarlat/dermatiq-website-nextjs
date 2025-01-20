import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Admin = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log({
            username: formData.get('username'),
            password: formData.get('password')
        })
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
            console.log(loginResponse);
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

                {/*<Form.Group className="mb-3" controlId="formBasicEmail">*/}
                {/*    <Form.Label>Email address</Form.Label>*/}
                {/*    <Form.Control type="email" placeholder="Enter email" />*/}
                {/*    <Form.Text className="text-muted">*/}
                {/*        {`We'll never share your email with anyone else.`}*/}
                {/*    </Form.Text>*/}
                {/*</Form.Group>*/}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Admin