import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

const ShowCreators = () => {

    const[creators, setCreators] = useState([])
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCreators();}, []);
        
    const fetchCreators = async () => {
        try {
            const {data, error} = await supabase.from('creators').select('*').order('name', {ascending: true});

            if (error) {
                console.error('Error fetching creators:', error)
            } else {
                setCreators(data || [] );
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }  
    };
    
    const handleView = (creator) => {
        navigate(`/creators/${creator.name}`);
    };
    
    const handleEdit = (creator) => {
        navigate(`/creator/${creator.name}/edit`);
    };

    if (loading) {
        return (
            <div className="show-creators">
                <p>Loading creators...</p>
            </div>
        );
    }

  return (
    <div className = "show-creators">
        <div>
            <h1>Creatorverse</h1>
            <button onClick={() => navigate('/creator/add')}
                className="btn-add">
                Add New Creator
            </button>
        </div>
        <div className="creators-grid">
            {creators.length ===0 ? (
                <p className='empty-state'>No creators found. Add creator!</p>
            ):(
                creators.map((creator) => (
                    <Card 
                        key={creator.name}
                        creator={creator}
                        onView={handleView}
                        onEdit={handleEdit}
                    />
                ))
            )}
        </div>
      
    </div>
  )
}

export default ShowCreators
