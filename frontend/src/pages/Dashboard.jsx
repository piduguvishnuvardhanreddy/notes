import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';
import { LogOut, Plus, Search, BookOpen } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await api.get('/notes');
            setNotes(res.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (noteData._id) {
                // Update existing
                const res = await api.put(`/notes/${noteData._id}`, { title: noteData.title, content: noteData.content });
                setNotes(notes.map(n => n._id === noteData._id ? res.data : n));
            } else {
                // Create new
                const res = await api.post('/notes', { title: noteData.title, content: noteData.content });
                setNotes([res.data, ...notes]);
            }
            setIsEditorOpen(false);
            setCurrentNote(null);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const openEditor = (note = null) => {
        setCurrentNote(note);
        setIsEditorOpen(true);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-customBg flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-customPrimary p-2 rounded-lg text-white">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-2xl font-bold font-sans tracking-tight text-gray-900">NotesApp</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 font-medium hidden sm:inline-block">Hello, {user?.username}</span>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg font-medium"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Controls Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-customPrimary focus:border-transparent transition"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => openEditor()}
                        className="flex items-center justify-center space-x-2 bg-customPrimary hover:bg-indigo-600 shadow-md hover:shadow-lg text-white py-3 px-6 rounded-xl font-bold transition transform hover:scale-105"
                    >
                        <Plus size={20} />
                        <span>New Note</span>
                    </button>
                </div>

                {/* Notes Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-customPrimary"></div>
                    </div>
                ) : filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredNotes.map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={openEditor}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 border-dashed">
                        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={30} className="text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No notes found</h2>
                        <p className="text-gray-500 mb-6">
                            {searchQuery ? "We couldn't find any notes matching your search." : "You haven't created any notes yet."}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => openEditor()}
                                className="inline-flex items-center text-customPrimary font-semibold hover:underline"
                            >
                                Create your first note <Plus size={18} className="ml-1" />
                            </button>
                        )}
                    </div>
                )}
            </main>

            {/* Note Editor Modal */}
            {isEditorOpen && (
                <NoteEditor
                    note={currentNote}
                    onSave={handleSaveNote}
                    onClose={() => setIsEditorOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
