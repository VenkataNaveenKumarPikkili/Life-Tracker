export default function HabitTable({ habits, days, tracker, toggle, deleteHabit, editHabit }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

      <h2 className="font-semibold text-lg mb-4">Habit Tracker</h2>

      <table className="text-xs min-w-max border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 text-left sticky left-0 bg-gray-100">Habit</th>
            {days.map(d => (
              <th key={d} className="px-[4px] text-center">{d}</th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit, hIndex) => (
            <tr key={hIndex} className="border-b">

              {/* Habit name */}
              <td className="px-3 py-2 sticky left-0 bg-white font-medium">
                <button onClick={() => editHabit(hIndex)} className="hover:text-blue-600">
                  {habit}
                </button>
              </td>

              {/* Days */}
              {days.map((d, dIndex) => (
                <td className="px-3 py-2 sticky left-0 bg-white font-medium whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={tracker[hIndex][dIndex]}
                    onChange={() => toggle(hIndex, dIndex)}
                  />
                </td>
              ))}

              {/* Delete */}
              <td>
                <button
                  onClick={() => deleteHabit(hIndex)}
                  className="text-red-500 px-2 hover:text-red-700">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
