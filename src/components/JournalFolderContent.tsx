import React from 'react';
import './Component.css';

interface JournalFolderContentProps {
    onClose: () => void;
}

const JournalFolderContent: React.FC<JournalFolderContentProps> = ({ onClose }) => {
    return (
        <div className="journal-content">
            <button className="close-button" onClick={onClose}>×</button>
            <h2>Journal</h2>
            <p>This is your journal content.</p>
        </div>
    );
};

export default JournalFolderContent; 