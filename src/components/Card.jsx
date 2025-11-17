import React from "react";

const Card = ({ creator, onView, onEdit }) => {
    return (
        <article className="creator-card" style={{maxWidth:'880px', margin: '0 auto', borderRadius: "1rem"}}> 
            {creator.imageURL &&(
                <img src={creator.imageURL} 
                alt={creator.name} 
                style={{
                    width: '100%',
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                    maxHeight: '400px',
                    marginBottom: '1rem'
                }} 
                />
            )}
            <div className="card-content">
                <h2 className="card-title">{creator.name}</h2>
                <p className="card-description">{creator.description}</p>
                <a
                    href={creator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    className="primary"
                >
                    Visit Website
                </a>
                <div style={{display: 'flex', justifyContent:'center', gap: '0.5rem', marginTop: '1rem'}}>
                    {onView && (
                        <button 
                            className="secondary"
                            onClick={() => onView(creator)}
                        >
                            View
                        </button>
                    )}
                    {onEdit && (
                        <button 
                            className="secondary"
                            onClick={() => onEdit(creator)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>  
        </article>
    
    );
};

export default Card;