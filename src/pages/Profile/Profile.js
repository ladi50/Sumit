import { useContext, useState } from "react";
import Store from "../../store/context";
import Title from "../../components/Title/Title";
import "./Profile.css";

const Profile = () => {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        completedMeetings: 0,
        payment: 0
    });

    const { loginUser, loggedIn, user } = useContext(Store);

    const changeValue = e => {
        const { value, id } = e.target;

        setData(prevState => (
            {
                ...prevState,
                [id]: value
            }
        ));
    };

    const login = (e) => {
        e.preventDefault();
        loginUser(data);
    };

    if (!loggedIn) return (
        <form className={"form"} onSubmit={e => login(e)} method={"post"}>
            <Title title={"Sign In"} />

            <label htmlFor="name">Name</label>
            <input type="text" id={"name"} value={data.name} onChange={e => changeValue(e)} />

            <label htmlFor="phone">Phone</label>
            <input type="tel" id={"phone"} value={data.phone} onChange={e => changeValue(e)} />

            <label htmlFor="email">Email</label>
            <input type="text" id={"email"} value={data.email} onChange={e => changeValue(e)} />

            <button>Submit</button>
        </form>
    );

    return (
        <div className={"user"}>
            <Title title={user.name} />
            <p>{user.phone}</p>
            <p>Total Meetings Completed: {user.completedMeetings}</p>
            <p>Total Payment: {user.payment}</p>
        </div>
    )
};

export default Profile;