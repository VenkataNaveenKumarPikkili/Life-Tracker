export default function HabitAnalysis({ habits, tracker }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow h-fit min-h-[450px]">

      <h2 className="font-semibold text-lg mb-4">Habit Analysis</h2>

      <div className="space-y-3 max-h-[450px] overflow-y-auto">

        {habits.map((habit, h) => {
          const count = tracker[h].filter(Boolean).length;
          const percent = (count / 30) * 100;

          return (
            <div key={h}>
              <div className="flex justify-between text-sm mb-1">
                <span>{habit}</span>
                <span>{count}/30 ({percent.toFixed(0)}%)</span>
              </div>

              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
