import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {

    const{name} = useParams();
    const navigate = useNavigate();
    const[creator, setCreator] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCreator();}, [name]);
    
    const fetchCreator = async () => {
        try {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('name', name)
                .single();
            
            if (error) {
                console.error('Error fetching creator:', error);
                setCreator(null);
            } else {
                setCreator(data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="view-creator">
                <p>Loading creator...</p>
            </div>
        );
    }
    if (!creator) {
        return (
            <div className="view-creator">
                <button onClick ={()=> navigate('/')} className='btn-back'>back</button>
                <p>Creator not found.</p>
            </div>
        );
    }

  return (
    <div className="view-creator">
        <button onClick ={()=> navigate('/')} className='btn-back'>back</button>
        <div className='creator-detail'>
            {creator.image_url &&(
                <img 
                    src={creator.image_url} 
                    alt={creator.name} 
                    className="creator-image" 
                />
            )}
            <h2 className="creator-name">{creator.name}</h2>
            <p className="creator-description">{creator.description}</p>
            <a
                href="{creator.url}"
                target="_blank"
                rel="noopener noreferrer"
                className="creator-url"
            >
                Visit Website
            </a>
            <div className='creator-actions'>
                <button 
                    className='btn-edit'
                    onClick ={() => navigate(`/creator/${creator.name}/edit`)}
                >
                    Edit Creator
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ViewCreator
