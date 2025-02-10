import { useEffect, useState } from "react";
import {Button, Form} from "react-bootstrap";

const AdminAccountSettings = ({user}) => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetch(`/api/users/${user.id}`)
        .then(res => {
            res.json()
                .then(data => setUserData(data))
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToUpdate = {};
        const formData = new FormData(e.target);
        for (const pair of formData.entries()) {
            dataToUpdate[pair[0]] = pair[1];
        }
        if(dataToUpdate?.oldPassword === dataToUpdate?.newPassword){
            alert("Parola nouă trebuie să fie diferită de cea veche.");
            return;
        }
        if(dataToUpdate?.oldPassword)delete dataToUpdate.oldPassword;
        try{
            fetch(`/api/users/${user.id}`, {
                method: "PATCH",
                body: JSON.stringify(dataToUpdate),
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Contul tău</h1>
            <hr/>
            <h4>Datele tale</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nume Utilizator</Form.Label>
                    <Form.Control defaultValue={userData.username} name="username"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Adresa Email</Form.Label>
                    <Form.Control type="email" defaultValue={userData.email} name="email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nume și Prenume</Form.Label>
                    <Form.Control defaultValue={userData.fullname} name="fullName"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control defaultValue={userData.phone} name="phone"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Funcție</Form.Label>
                    <Form.Control defaultValue={userData.companyRole} disabled/>
                </Form.Group>
                <Button variant="primary" type="submit">Salvează</Button>
            </Form>
            <hr/>
            <h4>Schimbă parola</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Parola veche</Form.Label>
                    <Form.Control type="password" placeholder="Parola veche" name="oldPassword"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Parola nouă</Form.Label>
                    <Form.Control type="password" placeholder="Parola nouă" name="password"/>
                </Form.Group>
                <Button variant="primary" type="submit">Salvează</Button>
            </Form>
        </div>
    )
}

export default AdminAccountSettings;