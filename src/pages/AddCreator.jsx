import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        imageURL: ''
    });
    
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);    
        try {
            const {error} = await supabase
                .from('creators')
                .insert([
                    {
                        name: formData.name,
                        url: formData.url,
                        description: formData.description,
                        imageURL: formData.imageURL || null
                    }
                ]);
            
            if (error) {
                console.error('Error adding creator:', error);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the creator.');
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <div>
        <button onClick ={()=> navigate('/')} className='btn-back'>back</button>
        <h1>Edit New Creator</h1>
        <form onSubmit={handleSubmit} className="creator-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                />
            </div>
            <div className="form-group">
                <label htmlFor="url">Website URL:</label>
                <input 
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com"
                    disabled={submitting}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder='Tell me about this creator...'
                    disabled={submitting}
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageURL">Image URL:</label>
                <input 
                    type="url"
                    id="imageURL"
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    disabled={submitting}
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-save" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Creator'}
                </button>
                <button type="button" onClick={()=> navigate('/')} className="btn-cancel" disabled={submitting}>
                    cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddCreator
