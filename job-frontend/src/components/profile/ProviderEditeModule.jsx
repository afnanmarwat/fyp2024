import React, { useState, useEffect } from 'react';

const ProviderEditeModule = ({ profileData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        company: '',
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
            {profileData.company && (
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
            )}
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
                <label htmlFor="bio">Bio</label>
                <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    value={formData.bio}
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

export default ProviderEditeModule;
