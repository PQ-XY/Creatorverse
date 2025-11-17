import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
    const {name} = useParams();
    const navigate = useNavigate(); 
    const[formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        imageURL: ''
    });

    const [originalName, setOriginalName] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchCreator();
    }, [name]);
    
    const fetchCreator = async () => { 
        try {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('name', name)
                .single();
            
            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    url: data.url || '',
                    imageURL: data.imageURL || ''
                });
                setOriginalName(data.name);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

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
                if (formData.name !== originalName) {
                    const {error:deleteError} = await supabase
                        .from('creators')
                        .delete()
                        .eq('name', originalName);
                    
                    if (deleteError) {
                        throw deleteError;
                    }

                    const {error:insertError} = await supabase
                        .from('creators')
                        .insert([
                            {
                                name: formData.name,
                                url: formData.url,
                                description: formData.description,
                                imageURL: formData.imageURL || null
                            }
                        ]);
                    
                    if (insertError) {
                        throw insertError;
                    }
                    navigate(`/creators/${formData.name}`);
                } else {
                    const {error:updateError} = await supabase
                        .from('creators')
                        .update({
                            description: formData.description,
                            url: formData.url,
                            imageURL: formData.imageURL || null
                        })
                        .eq('name', originalName);

                    if (updateError) {
                        throw updateError;
                    }
                    navigate(`/creators/${originalName}`);
                }

            } catch (error) {
                console.error('Error updating creator:', error);
                alert('An error occurred while updating the creator.');
            } finally {
                setSubmitting(false);
            }

    };  

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this creator?')) {
            return;
        }
        setDeleting(true);
        try {
            const {error} = await supabase
                .from('creators')
                .delete()
                .eq('name', originalName);
            
            if (error) {
                console.error('Error deleting creator:', error);
                alert('An error occurred while deleting the creator.');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the creator.');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-creator">
                <p>Loading creator data...</p>
            </div>
        );
    }
  
  return (
    <main className="container">

        <button onClick ={()=> navigate('/')} className='primary btn-back'>back</button>
        <h1>Edit Creator</h1>
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageURL">Image URL:</label>
                <input 
                    type="url"
                    id="imageURL"
                    name="imageURL"
                    value={formData.imageURL || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-save" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update Creator'}
                </button>
                <button type='button' onClick={() => navigate(-1)} className='btn-cancel' disabled={submitting}>
                    cancel
                </button>
                <button type="button" className="btn-delete" onClick={handleDelete} disabled={deleting}>
                    {deleting ? 'Deleting...' : 'Delete Creator'}
                </button>
            </div>
        </form>
    </main>
  )
}

export default EditCreator
