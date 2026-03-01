import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { X } from 'lucide-react';

const NoteEditor = ({ note, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onSave({
            _id: note?._id,
            title,
            content
        });
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ]
    };

    const formats = [
        'bold', 'italic', 'underline',
        'list', 'bullet'
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {note ? 'Edit Note' : 'Create Note'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-5 flex-grow overflow-y-auto">
                    <form id="note-form" onSubmit={handleSubmit} className="flex flex-col h-full space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Note Title"
                                className="w-full text-xl font-semibold px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-grow pb-10">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                className="h-full rounded-b-lg"
                                placeholder="Write your note here..."
                            />
                        </div>
                    </form>
                </div>

                <div className="p-5 border-t bg-gray-50 rounded-b-xl flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="note-form"
                        className="px-6 py-2 bg-customPrimary hover:bg-indigo-600 text-white rounded-lg font-bold transition shadow-md disabled:opacity-50"
                        disabled={!title.trim() || !content.trim() || content === '<p><br></p>'}
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
