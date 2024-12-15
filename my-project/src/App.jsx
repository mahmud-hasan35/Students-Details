import { useState, useEffect } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState(() => {

    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleSave = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, name: newName } : student
      )
    );
    setEditingId(null);
    setNewName('');
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleAdd = () => {
    if (newStudentName.trim()) {
      setStudents((prev) => [
        ...prev,
        { id: prev.length + 1, name: newStudentName.trim() },
      ]);
      setNewStudentName('');
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Student List</h1>

        <div className="mb-4">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Enter student name"
            className="border rounded px-4 py-2 mr-2 w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === student.id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {editingId === student.id ? (
                    <button
                      onClick={() => handleSave(student.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(student.id, student.name)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentTable;

