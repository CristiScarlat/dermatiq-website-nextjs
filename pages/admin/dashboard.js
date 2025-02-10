import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";
import { Button } from "react-bootstrap";
import Sidebar from "../../components/admin/sidebar";
import AdminDashboardUsers from "../../components/admin/adminDashboardUsers";
import AdminAccountSettings from "../../components/admin/adminAccountSettings";

const sidebarItems = [
    {id: 1, label: 'Utilizatori', role: 'admin'},
    {id:2, label: 'Programări', role: 'user'},
    {id:3, label: 'Pacienți', role: 'user'},
    {id:4, label: 'Contul tău', role: 'user'}
];

const Dashboard = ({user}) => {
    const [selectedView, setSelectedView] = useState(sidebarItems[0]);

    const router = useRouter();

    const handleLogout = async () => {
        try{
            const res = await fetch('/api/auth/logout');
            if(res.status === 200){
                router.push('/admin');
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const handleSelectView = (selected) => {
        setSelectedView(selected);
    }

    const getItemsByRole = () => {
        if(user.role === 'user'){
            return sidebarItems.filter((item) => item.role === 'user');
        }
        return sidebarItems;
    }

    return (
        <div>
            <div aria-roledescription="header" className="d-flex justify-content-end align-items-center gap-3 p-3 w-100 border-bottom border-secondary">
                {user?.username && <span>{`Bine ai venit ${user.username}`}</span>}
                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </div>
            <div aria-roledescription="main" style={{minHeight: '70vh'}}>
                <h1 className="text-center text-secondary my-3">Dashboard</h1>
                <div className="d-flex justify-content-start align-items-start gap-2 flex-lg-row flex-column px-2">
                    <Sidebar
                        className="mt-1"
                        items={getItemsByRole()}
                        onClick={handleSelectView}
                        selectedItem={selectedView}/>
                    {(selectedView.id === 1 && user.role === 'admin') && <AdminDashboardUsers />}
                    {(selectedView.id === 4) && <AdminAccountSettings user={user}/>}
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const token = context.req.cookies?.token;
    if(token){
        const decoded = jwtDecode(token);
        console.log(decoded.exp < Date.now() / 1000)
        return {
            props: { user: decoded }, // Invalid token
        }
    }
    return {
                props: { }, // Invalid token
            }
}

export default Dashboard;