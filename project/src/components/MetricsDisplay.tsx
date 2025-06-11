import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AnalysisResult } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsDisplayProps {
  result: AnalysisResult;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ result }) => {
  const chartData = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
    datasets: [
      {
        label: 'Model Metrics',
        data: [
          result.metrics.accuracy * 100,
          result.metrics.precision * 100,
          result.metrics.recall * 100,
          result.metrics.f1Score * 100
        ],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderColor: [
          'rgb(14, 165, 233)',
          'rgb(139, 92, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y.toFixed(1)}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <motion.div
      className="bg-background-secondary rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-6">Model Performance Metrics</h3>
      
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <MetricCard
          label="Accuracy"
          value={result.metrics.accuracy}
          color="primary"
        />
        <MetricCard
          label="Precision"
          value={result.metrics.precision}
          color="secondary"
        />
        <MetricCard
          label="Recall"
          value={result.metrics.recall}
          color="accent"
        />
        <MetricCard
          label="F1 Score"
          value={result.metrics.f1Score}
          color="warning"
        />
      </div>
    </motion.div>
  );
};

interface MetricCardProps {
  label: string;
  value: number;
  color: 'primary' | 'secondary' | 'accent' | 'warning';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => (
  <div className={`bg-${color}/10 rounded-lg p-4 border border-${color}/20`}>
    <div className="text-sm text-gray-400 mb-1">{label}</div>
    <div className={`text-xl font-bold text-${color}`}>
      {(value * 100).toFixed(1)}%
    </div>
  </div>
);

export default MetricsDisplay;