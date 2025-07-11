// ✅ Import modular components
import SectionSelector from '../components/ContentEditor/SectionSelector';
import EditorForm from '../components/ContentEditor/EditorForm';

export default function ContentEditorPage() {
  return (
    <div 
      className="max-w-2xl w-full mx-auto px-4 py-6 
                 bg-white rounded-md shadow-md 
                 dark:bg-gray-900 dark:text-white transition"
    >
      {/* 🔤 Page Title */}
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">
        ✍️ Edit Section Content
      </h2>

      {/* 📍 Section Dropdown (Home / About / etc.) */}
      <SectionSelector />

      {/* ✏️ Form to edit heading and body */}
      <EditorForm />
    </div>
  );
}
