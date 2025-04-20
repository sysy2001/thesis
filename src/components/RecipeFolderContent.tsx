import React from 'react';
import './Component.css';

interface RecipeFolderContentProps {
    onClose: () => void;
}

const RecipeFolderContent: React.FC<RecipeFolderContentProps> = ({ onClose }) => {
    return (
        <>
            <div className="folder-window open">
                <strong className="folder-header">
                    <h2>Recipe</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </strong>
            </div>
        </>
    );
};

export default RecipeFolderContent; 