import {useEffect, useState, useRef, useContext} from "react";
import Table from 'react-bootstrap/Table';
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import Spinner from "../../components/Spinner.jsx";
import SimpleModal from "../../components/SimpleModal.jsx";
import { Form } from "react-bootstrap";
import {Ctx} from "../../context/context.js";
import {useRouter} from "next/navigation";


const AdminDashboardUsers = ({onEditUserClick, className}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const {state, dispatch} = useContext(Ctx);
    const router = useRouter();

    const modalAddUserFormRef = useRef();

    async function fetchUsers() {
        try{
            setLoading(true);
            const res = await fetch('/api/users');
            if(res.status === 401){
                router.push('/admin');
                return
            }
            const data = await res.json();
            setUsers(data.users);
            setLoading(false);
        }
        catch(error){
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchUsers();
    }, [])

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const saveUser = async (user) => {
        try{
            setLoading(true);
            const res = await fetch('/api/users', {
                method: "POST",
                body: JSON.stringify({user: user})
            });
            await fetchUsers()
            setLoading(false);
        }
        catch(error){
            console.log(error)
            setLoading(false);
        }
    }

    const deleteUser = async (id) => {
        try{
            setLoading(true);
            const res = await fetch('/api/users', {
                method: "DELETE",
                body: JSON.stringify({userId: id})
            });
            const data = await res.json();
            console.log(data);
            setLoading(false);
        }
        catch(error){
            console.log(error)
            setLoading(false);
        }
    }

    const handleSaveUser = () => {
        const formData = new FormData(modalAddUserFormRef.current);
        const userData = {};
        let invalid = false;
        for (const pair of formData.entries()) {
            if(!pair[1])invalid = true;
            userData[pair[0]] = pair[1];
        }
        if(invalid){
            dispatch({
                type: "SET_TOAST",
                toast: {
                    showToast: true,
                    type: "danger",
                    headerText: "Error.",
                    bodyText: `Please fill out all the fields in the form.`,
                },
            });
            return
        }
        setModalOpen(false);
        if(!userData?.role)userData.role = "user";
        else if(userData?.role === "on")userData.role = "admin";
        console.log(userData);
        saveUser(userData);
    }

    const handleDeleteUser = (selectedUser) => {
        if(confirm(`Sunteți sigur că doriți să stergeți ${selectedUser.fullName} din baza de date?`)){
            deleteUser(selectedUser.id)
                .then(res => {
                    const newUsers = users.filter(user => user.id !== selectedUser.id);
                    setUsers(newUsers);
                })
                .catch(err => {console.log(err)})
        }
    }

    const handleResetPassword = async (row) => {
        const newTemporaryPassword = prompt(`Tastați o parolă temporară pentru utilizatorul ${row.fullName}.`);
        if(newTemporaryPassword && newTemporaryPassword !== ""){
            try{
                await fetch(`/api/users/${row.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({password: newTemporaryPassword}),
                })
                alert(`Parola a fost resetata cu succes, parola temporara este ${newTemporaryPassword}.`)
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <>
        <div className="w-100">
            <div className="d-flex justify-content-end align-items-center border border-white rounded p-3">
                <button className="rounded-circle bg-primary text-white border-0 fw-bold"
                        style={{width: 30, height: 30}}
                        onClick={handleOpenModal}
                        title="adaugă un utilizator">
                    +
                </button>
            </div>
            <div className="overflow-auto border border-white rounded">
                {loading ? <Spinner/> : <Table striped bordered hover className="dashboard-table">
                    <thead>
                    <tr>
                        <th></th>
                        {users?.length > 0 && Object.keys(users[0]).filter(key => key !== "id").map(col => <th key={col}>{col}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                        {users?.length > 0 && users.map(row => (
                            <tr key={row.id}>
                                <td className="d-flex align-items-center justify-content-between">
                                    <button className="border-0 bg-transparent"
                                            onClick={() => handleResetPassword(row)}>
                                        <MdOutlineLockReset color="darkgreen" size="1.5rem"/>
                                    </button>
                                    <button className="border-0 bg-transparent"
                                            onClick={() => handleDeleteUser(row)}>
                                        <FaTrashAlt color="darkred"/>
                                    </button>
                                </td>
                                {Object.keys(row).filter(key => key !== "id").map(cel => <td key={cel}>{row[cel]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>}
            </div>
        </div>
        <SimpleModal
            show={modalOpen}
            onHide={() => setModalOpen(false)}
            onYesClick={handleSaveUser}
            title="Adaugă un utilizator nou"
            yesBtnLabel="Salvează"
            cancelBtnLabel="Închide">
            <Form ref={modalAddUserFormRef}>
                <Form.Group className="mb-3">
                    <Form.Label>Nume Utilizator</Form.Label>
                    <Form.Control placeholder="Nume utilizator" name="username"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Adresa Email</Form.Label>
                    <Form.Control type="email" placeholder="Adresa email" name="email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Parolă temporară</Form.Label>
                    <Form.Control type="password" placeholder="Parolă temporară" name="password"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nume și Prenume</Form.Label>
                    <Form.Control placeholder="Nume și Prenume" name="fullName"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control placeholder="Telefon" name="phone"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Funcție</Form.Label>
                    <Form.Control placeholder="Funcție" disabled/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Are drepturi de administrator?" name="role"/>
                </Form.Group>
            </Form>
        </SimpleModal>
        </>
    )
}


export default AdminDashboardUsers;