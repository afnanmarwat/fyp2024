import React, { useState, useEffect } from 'react';

const SeekerEditModule = ({ profileData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        qualification: '',
        experience: '',
        profilePic: null,
    });

    useEffect(() => {
        if (profileData) {
            setFormData({
                ...profileData,
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profilePic: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">mobile No</label>
                <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                    type="text"
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                    type="text"
                    className="form-control"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="qualification">Qualification</label>
                <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                    type="text"
                    className="form-control"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="profilePic">Profile Picture</label>
                <input
                    type="file"
                    className="form-control"
                    id="profilePic"
                    name="profilePic"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
};

export default SeekerEditModule;
