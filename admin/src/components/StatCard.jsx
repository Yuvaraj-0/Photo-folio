export default function StatCard({ title, value }) {
    return (
      <div className="bg-white p-6 rounded shadow text-center border">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
      </div>
    );
  }
  