import { useState } from "react";

const Register = () => {
    const initData = {
        email: '',
        password: '',
        password2: '',
        full_name: ''
    };

    const [data, setData] = useState(initData)

    const dataChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const register = async () => {
        console.log(data);
        try {
            let res = await fetch(
                `/api/v1/auth/create-account`, 
                {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(res.ok) {
                alert('User created!');
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <label>
                <span>Email</span><br/>
                <input type="email" name="email" value={data.email} onChange={dataChange} /><br />
            </label><br />
            <label>
                <span>Password</span><br />
                <input type="password" name="password" value={data.password} onChange={dataChange} /><br />
            </label><br />
            <label>
                <span>Retype password</span><br />
                <input type="password" name="password2" value={data.password2} onChange={dataChange} /><br />
            </label><br />
            <label>
                <span>Full Name</span><br />
                <input type="text" name="full_name" value={data.full_name} onChange={dataChange} /><br />
            </label><br />
            <button onClick={register}>Register</button>
        </div>
    )
};

export default Register;