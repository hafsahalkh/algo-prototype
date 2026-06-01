export interface LabMarker {
  marker: string;
  value: number;
  unit: string;
  range: string; // Standard range (e.g. "300-1100")
  min: number;
  max: number;
  optimalMin?: number;
  optimalMax?: number;
  status: 'optimal' | 'warning' | 'critical';
  category: 'Hormones' | 'Lipids' | 'Metabolic' | 'Inflammation' | 'Vitamins';
  history: { date: string; value: number }[];
}

export interface LabReport {
  id: string;
  date: string;
  name: string;
  markers: LabMarker[];
}

export interface AISummary {
  summary: string;
  alerts: { marker: string; value: string; range: string; status: string }[];
  recommendations: string[];
}

export const MOCK_LABS: LabReport[] = [
  {
    id: "rep_1",
    date: "2024-05-10",
    name: "Performance Panel (Elite)",
    markers: [
      { 
        marker: "Total Testosterone", 
        value: 680, 
        unit: "ng/dL", 
        range: "300-1100", 
        min: 300,
        max: 1100,
        optimalMin: 700,
        optimalMax: 1000,
        status: "warning", // Not in optimal range
        category: "Hormones",
        history: [
          { date: "2024-01-10", value: 520 },
          { date: "2024-03-15", value: 610 },
          { date: "2024-05-10", value: 680 }
        ]
      },
      { 
        marker: "Free Testosterone", 
        value: 12.4, 
        unit: "pg/mL", 
        range: "8.7-25.1", 
        min: 8.7,
        max: 25.1,
        optimalMin: 15,
        optimalMax: 22,
        status: "warning",
        category: "Hormones",
        history: [
          { date: "2024-01-10", value: 10.1 },
          { date: "2024-05-10", value: 12.4 }
        ]
      },
      { 
        marker: "LDL Cholesterol", 
        value: 135, 
        unit: "mg/dL", 
        range: "0-100", 
        min: 0,
        max: 100,
        optimalMin: 0,
        optimalMax: 70,
        status: "critical", // Out of standard range
        category: "Lipids",
        history: [
          { date: "2024-01-10", value: 145 },
          { date: "2024-05-10", value: 135 }
        ]
      },
      { 
        marker: "HDL Cholesterol", 
        value: 48, 
        unit: "mg/dL", 
        range: "40-100", 
        min: 40,
        max: 100,
        optimalMin: 60,
        optimalMax: 90,
        status: "warning",
        category: "Lipids",
        history: [
          { date: "2024-01-10", value: 45 },
          { date: "2024-05-10", value: 48 }
        ]
      },
      { 
        marker: "Vitamin D", 
        value: 32, 
        unit: "ng/mL", 
        range: "30-100", 
        min: 30,
        max: 100,
        optimalMin: 60,
        optimalMax: 80,
        status: "warning",
        category: "Vitamins",
        history: [
          { date: "2024-01-10", value: 28 },
          { date: "2024-05-10", value: 32 }
        ]
      },
      { 
        marker: "CRP (Inflammation)", 
        value: 0.8, 
        unit: "mg/L", 
        range: "0-1.0", 
        min: 0,
        max: 1,
        optimalMin: 0,
        optimalMax: 0.5,
        status: "warning",
        category: "Inflammation",
        history: [
          { date: "2024-01-10", value: 1.2 },
          { date: "2024-05-10", value: 0.8 }
        ]
      },
      { 
        marker: "HbA1c", 
        value: 5.4, 
        unit: "%", 
        range: "4.8-5.6", 
        min: 4.8,
        max: 5.6,
        optimalMin: 4.8,
        optimalMax: 5.2,
        status: "warning",
        category: "Metabolic",
        history: [
          { date: "2024-01-10", value: 5.5 },
          { date: "2024-05-10", value: 5.4 }
        ]
      }
    ]
  }
];
