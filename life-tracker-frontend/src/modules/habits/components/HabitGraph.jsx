import { Line } from "react-chartjs-2";

export default function HabitGraph({ trendData, days }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Daily Trend Graph</h2>

      <Line
        data={{
          labels: days,
          datasets: [{ data: trendData, borderColor: "#2563eb", tension: 0.3 }]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    </div>
  );
}
