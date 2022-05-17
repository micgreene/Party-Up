import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';


const SignUp = () => {
    const axios = require('axios').default;
    const intialValues = { first_name: '', last_name: '', email: '', username: '', password: '', dob: '', about_me: '' };

    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    

    const submit = () => {
        // change this to our deployed db later, make sure it is an .env variable
        axios.post('https://627fe5a41020d8520577cdd2.mockapi.io/p_up/users', formValues)
            .then((res => {
                // let data = res.data;
            }))

        navigate('/signup')
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        checkDuplicateEmail();
        if (Object.keys(formErrors).length > 0) {
            setIsSubmitting(false);
        }
    };

    const checkDuplicateEmail = () => {
        console.log('CHECKED FOR EMAIL' + formValues.email)
        try {

            // change this to our deployed db later, make sure it is an .env variable  
            axios.get('https://627fe5a41020d8520577cdd2.mockapi.io/p_up/users/?email=' + formValues.email)
                .then(res => {
                    console.log('CHECKED FOR EMAIL')
                    if (res.data) {
                        setIsSubmitting(false);
                        alert('THIS EMAIL IS CURRENTLY IN USE WITH A DIFFERENT ACCOUNT!')
                    }
                })
        } catch {
            alert('You must give a valid email to continue')
        }
    }

    const validate = (values) => {
        let errors = {};
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "EMAIL - Cannot be blank";
        } else if (!emailregex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.username) {
            errors.username = "USERNAME - Cannot be blank";
        }
        if (!values.password) {
            errors.password = "PASSWORD - Cannot be blank";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        }
        if (!values.confirm) {
            errors.confirm = "PASSWORD - Cannot be blank";
        } else if (values.confirm !== values.password) {
            errors.confirm = "PASSWORDS MUST MATCH!"
        }
        if (!values.dob) {
            errors.dob = "DATE OF BIRTH - Cannot be blank";
        }

        return errors

    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    return (
        <div>
            {/* <h1>Got an account? Sign In!</h1> */}
            <Form onSubmit={handleSubmit} noValidate>
                <div>
                    <Form.Label htmlFor="first_name">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formValues.first_name}
                        onChange={handleChange}
                    />
                    {formErrors.first_name && <span>{formErrors.first_name}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="last_name">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formValues.last_name}
                        onChange={handleChange}
                    />
                    {formErrors.last_name && <span>{formErrors.last_name}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <span>{formErrors.email}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    {formErrors.username && <span>{formErrors.username}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    {formErrors.password && <span>{formErrors.password}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="confirm">Confirm your password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirm"
                        id="confirm"
                        onChange={handleChange}
                    />
                    {formErrors.confirm && <span>{formErrors.confirm}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="dob">What is your Birthday?</Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        id="dob"
                        value={formValues.dob}
                        onChange={handleChange}
                    />
                    {formErrors.dob && <span>{formErrors.dob}</span>}
                </div>
                <div>
                    <Form.Label htmlFor="about_me">What would you like to tell us about yourself?</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="about_me"
                        id="about_me"
                        value={formValues.about_me}
                        onChange={handleChange}
                    />
                    {formErrors.about_me && <span>{formErrors.about_me}</span>}
                </div>
                <button type="submit">Sign Up!</button>
            </Form>
        </div>
    );
}

export default SignUp
