import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseChart = ({ data, loading }) => {
    // Custom Chart Design
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                titleFont: { family: 'Inter', size: 14, weight: '600' },
                bodyFont: { family: 'Inter', size: 13 },
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Inter', size: 12 },
                    padding: 10
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Inter', size: 12 },
                    padding: 10,
                    callback: (value) => `₹${value}`
                }
            }
        },
        maintainAspectRatio: false,
    };

    // Construct chart data logic
    const chartData = {
        labels: data?.monthlyStats?.map(item => {
            // Format month nicely if needed, assuming aggregate returns month number
            // or if item._id is structured
            return item._id?.monthly ? `${item._id.monthly}/${item._id.yearly}` : item.month;
        }) || [],
        datasets: [
            {
                label: 'Expenses',
                data: data?.monthlyStats?.map(item => item.totalAmount) || [],
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, '#8b5cf6'); // Violet 500
                    gradient.addColorStop(1, '#ec4899'); // Pink 500
                    return gradient;
                },
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    };

    return (
        <div className="glass-card p-6 rounded-2xl h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Monthly Activity</h3>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-violet-500"></span>
                    <span className="text-xs text-slate-400">Expenses</span>
                </div>
            </div>
            <div className="h-[300px] w-full">
                {loading ? (
                    <div className="h-full w-full flex items-center justify-center text-slate-500">
                        Loading analytics...
                    </div>
                ) : (
                    <Bar data={chartData} options={options} />
                )}
            </div>
        </div>
    );
};

export default ExpenseChart;
