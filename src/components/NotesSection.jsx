import React, { useState, useContext, useEffect } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { Save, BookOpen } from 'lucide-react';

const NotesSection = ({ stepId }) => {
  const { getNote, saveNote } = useContext(ProgressContext);
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setText(getNote(stepId));
  }, [stepId, getNote]);

  const handleSave = () => {
    saveNote(stepId, text);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="glass-card p-6 mt-8 border border-orange-100/20 dark:border-orange-900/10">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Notes</h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Jot down key takeaways, commands, or concepts you want to remember from this step.
      </p>

      <textarea
        className="input-field min-h-[150px] resize-y mb-4"
        placeholder="Type your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center justify-end gap-4">
        {isSaved && (
          <span className="text-sm font-medium text-green-500 animate-in fade-in duration-300">
            Notes saved securely!
          </span>
        )}
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Notes
        </button>
      </div>
    </div>
  );
};

export default NotesSection;
