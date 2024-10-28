import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BerandaIndex() {
  const waterData = [
    { month: "JAN", actual: 1778, target: 1.12, individual: 0.84, reduction: -24.70 },
    { month: "FEB", actual: 1745, target: 1.12, individual: 0.83, reduction: -26.09 },
    { month: "MAR", actual: 1580, target: 1.12, individual: 0.75, reduction: -33.08 },
    { month: "APR", actual: 931, target: 1.12, individual: 0.44, reduction: -60.57 },
    { month: "MEI", actual: 1215, target: 1.12, individual: 0.57, reduction: -48.54 },
    { month: "JUN", actual: 1409, target: 1.12, individual: 0.67, reduction: -40.33 },
    { month: "JUL", actual: 2417, target: 1.12, individual: 1.14, reduction: 2.37 },
    { month: "AGS", actual: 2538, target: 1.12, individual: 1.20, reduction: 7.49 },
  ];

  const ytdValues = {
    actual: 13613,
    target: 8.93,
    individual: 6.44,
    reduction: -27.93
  };

  const chartData = {
    labels: waterData.map((data) => data.month),
    datasets: [
      {
        label: "Water Consumption (2024)",
        data: waterData.map((data) => data.actual),
        borderColor: "#3e95cd",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "#3e95cd",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3e95cd",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Water Consumption 2024",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 3000,
      },
    },
  };

  return (
    <>
      <div className="card">
        <div className="card-header bg-primary text-white p-4">
          <span className="lead fw-medium">Progress Pencapaian Water Withdrawal 2024</span>
        </div>
        <div className="card-body lead p-4">
          <div className="table-responsive mt-4">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>  </th>
                  <th>YTD. Aug. 2024</th>
                  <th>JAN</th>
                  <th>FEB</th>
                  <th>MAR</th>
                  <th>APR</th>
                  <th>MEI</th>
                  <th>JUN</th>
                  <th>JUL</th>
                  <th>AGS</th>
                  <th>SEPT</th>
                  <th>OCT</th>
                  <th>NOV</th>
                  <th>DEC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="2" className="align-middle">Water Consumption</td>
                  <td>AKTUAL</td>
                  <td>{ytdValues.actual}</td>
                  <td>{waterData[0].actual}</td>
                  <td>{waterData[1].actual}</td>
                  <td>{waterData[2].actual}</td>
                  <td>{waterData[3].actual}</td>
                  <td>{waterData[4].actual}</td>
                  <td>{waterData[5].actual}</td>
                  <td>{waterData[6].actual}</td>
                  <td>{waterData[7].actual}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                </tr>

                <tr>
                  <td rowSpan="2" className="align-middle">Water Consumption/Individu</td>
                  <td>AKTUAL</td>
                  <td>{ytdValues.individual}</td>
                  <td>{waterData[0].individual}</td>
                  <td>{waterData[1].individual}</td>
                  <td>{waterData[2].individual}</td>
                  <td>{waterData[3].individual}</td>
                  <td>{waterData[4].individual}</td>
                  <td>{waterData[5].individual}</td>
                  <td>{waterData[6].individual}</td>
                  <td>{waterData[7].individual}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>TARGET</td>
                  <td>{ytdValues.target}</td>
                  <td>{waterData[0].target}</td>
                  <td>{waterData[1].target}</td>
                  <td>{waterData[2].target}</td>
                  <td>{waterData[3].target}</td>
                  <td>{waterData[4].target}</td>
                  <td>{waterData[5].target}</td>
                  <td>{waterData[6].target}</td>
                  <td>{waterData[7].target}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td rowSpan="2" className="align-middle">% Water Withdrawal Intensity Reduction</td>
                  <td>AKTUAL</td>
                  <td>{ytdValues.reduction}%</td>
                  <td>{waterData[0].reduction}%</td>
                  <td>{waterData[1].reduction}%</td>
                  <td>{waterData[2].reduction}%</td>
                  <td>{waterData[3].reduction}%</td>
                  <td>{waterData[4].reduction}%</td>
                  <td>{waterData[5].reduction}%</td>
                  <td>{waterData[6].reduction}%</td>
                  <td>{waterData[7].reduction}%</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>TARGET</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td>-6.00%</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
              <div className="chart-container" style={{ maxWidth: "100%", height: "300px" }}>
                <Line data={chartData} options={options} />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}