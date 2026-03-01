import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
    // Strip HTML tags for preview and limit length
    const getPreview = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        const text = tmp.textContent || tmp.innerText || "";
        return text.length > 100 ? text.substring(0, 100) + '...' : text;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100 relative group">
            <div className="flex-grow pb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={note.title}>
                    {note.title}
                </h3>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">
                    {getPreview(note.content)}
                </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-400 font-medium">
                    {formatDate(note.updatedAt)}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(note)}
                        className="text-gray-400 hover:text-customPrimary transition-colors p-1"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(note._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
