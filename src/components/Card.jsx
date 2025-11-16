import React from "react";


const Card = ({ creator, onView, onEdit }) => {
    return (
        <div className="card"> 
            {creator.image_url &&(
                <img src={creator.image_url} 
                alt={creator.name} 
                className="card-image" 
                />
            )}
            <div className="card-content">
                <h2 className="card-title">{creator.name}</h2>
                <p className="card-description">{creator.description}</p>
                <a
                    href="{creator.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-url"
                >
                    Visit Website
                </a>
                <div className="card-actions">
                    {onView && (
                        <button 
                            className="card-button view-button"
                            onClick={() => onView(creator)}
                        >
                            View
                        </button>
                    )}
                    {onEdit && (
                        <button 
                            className="card-button edit-button"
                            onClick={() => onEdit(creator)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>  
        </div>
    
    );
};

export default Card;