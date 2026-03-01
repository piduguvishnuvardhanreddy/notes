import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Bold, Italic, Underline, List } from 'lucide-react';

const NoteEditor = ({ note, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            if (editorRef.current) {
                editorRef.current.innerHTML = note.content;
            }
        }
    }, [note]);

    const execCommand = useCallback((command, value = null) => {
        editorRef.current?.focus();
        document.execCommand(command, false, value);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = editorRef.current?.innerHTML || '';
        if (!title.trim() || !content.trim() || content === '<br>') return;

        onSave({
            _id: note?._id,
            title,
            content
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {note ? 'Edit Note' : 'Create Note'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 flex-grow overflow-y-auto">
                    <form id="note-form" onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
                        <input
                            type="text"
                            placeholder="Note Title"
                            className="w-full text-xl font-semibold px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        {/* Toolbar */}
                        <div className="flex items-center space-x-1 border border-gray-300 rounded-t-lg p-2 bg-gray-50">
                            <button type="button" onClick={() => execCommand('bold')}
                                className="p-2 hover:bg-gray-200 rounded transition cursor-pointer" title="Bold">
                                <Bold size={18} />
                            </button>
                            <button type="button" onClick={() => execCommand('italic')}
                                className="p-2 hover:bg-gray-200 rounded transition cursor-pointer" title="Italic">
                                <Italic size={18} />
                            </button>
                            <button type="button" onClick={() => execCommand('underline')}
                                className="p-2 hover:bg-gray-200 rounded transition cursor-pointer" title="Underline">
                                <Underline size={18} />
                            </button>
                            <div className="w-px h-6 bg-gray-300 mx-1"></div>
                            <button type="button" onClick={() => execCommand('insertUnorderedList')}
                                className="p-2 hover:bg-gray-200 rounded transition cursor-pointer" title="Bullet List">
                                <List size={18} />
                            </button>
                        </div>

                        {/* Editable Area */}
                        <div
                            ref={editorRef}
                            contentEditable
                            className="w-full min-h-[200px] px-4 py-3 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-customPrimary text-base leading-relaxed"
                            style={{ whiteSpace: 'pre-wrap' }}
                            data-placeholder="Write your note here..."
                            suppressContentEditableWarning={true}
                        ></div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="note-form"
                        className="px-6 py-2 bg-customPrimary hover:bg-indigo-600 text-white rounded-lg font-bold transition shadow-md cursor-pointer"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
