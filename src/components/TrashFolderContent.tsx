import React, { useState } from 'react';

interface TrashFolderContentProps {
  onClose: () => void;
}

interface TrashItem {
  id: number;
  text: string;
  deletedAt: Date;
}

const TrashFolderContent: React.FC<TrashFolderContentProps> = ({ onClose }) => {
  const [trashItems, setTrashItems] = useState<TrashItem[]>([
    { id: 1, text: "This is where deleted items go", deletedAt: new Date() },
    { id: 2, text: "You can restore or permanently delete items here", deletedAt: new Date() }
  ]);

  const restoreItem = (id: number) => {
    setTrashItems(trashItems.filter(item => item.id !== id));
    // Here you would typically also restore the item to its original location
  };

  const deletePermanently = (id: number) => {
    setTrashItems(trashItems.filter(item => item.id !== id));
  };

  const emptyTrash = () => {
    setTrashItems([]);
  };

  return (
    <div className="folder-window">
      <strong className="folder-header">
        <h2>Trash</h2>
        <button className="close-button" onClick={onClose}>X</button>
      </strong>
      <div className="trash-content">
        {trashItems.length > 0 ? (
          <>
            <div className="trash-actions">
              <button 
                className="empty-trash-button" 
                onClick={emptyTrash}
              >
                Empty Trash
              </button>
            </div>
            <ul className="trash-list">
              {trashItems.map(item => (
                <li key={item.id} className="trash-item">
                  <span className="trash-item-text">{item.text}</span>
                  <span className="trash-item-date">
                    {item.deletedAt.toLocaleDateString()}
                  </span>
                  <div className="trash-item-actions">
                    <button 
                      className="restore-button"
                      onClick={() => restoreItem(item.id)}
                    >
                      Restore
                    </button>
                    <button 
                      className="delete-permanently-button"
                      onClick={() => deletePermanently(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="empty-trash-message">
            Trash is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashFolderContent; 