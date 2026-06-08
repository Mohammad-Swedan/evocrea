import { cn } from "@/lib/utils";

interface DashboardMockProps {
  type?: "crm" | "ecommerce" | "elearning" | "custom";
  compact?: boolean;
  className?: string;
}

const mockData = {
  crm: {
    title: "CRM Dashboard",
    accent: "#FF5C28",
    accentBg: "#FFF0EC",
    kpis: [
      { label: "Active Leads", value: "1,284", change: "+12%" },
      { label: "Deals Closed", value: "94", change: "+28%" },
      { label: "Revenue", value: "$284K", change: "+18%" },
      { label: "Conversion", value: "34%", change: "+5%" },
    ],
    chart: [40, 65, 55, 80, 70, 95, 88, 100, 92, 110, 98, 120],
    rows: [
      {
        name: "Ahmad Al-Rashid",
        stage: "Proposal",
        value: "$18,000",
        status: "hot",
      },
      {
        name: "Sara Johnson",
        stage: "Negotiation",
        value: "$32,000",
        status: "warm",
      },
      {
        name: "Tech Corp",
        stage: "Closed Won",
        value: "$54,000",
        status: "closed",
      },
    ],
  },
  ecommerce: {
    title: "Store Analytics",
    accent: "#0A0A0A",
    accentBg: "#F4F2EE",
    kpis: [
      { label: "Daily Orders", value: "2,841", change: "+22%" },
      { label: "Revenue", value: "$142K", change: "+31%" },
      { label: "Conversion", value: "4.8%", change: "+0.8%" },
      { label: "Avg Order", value: "$89", change: "+12%" },
    ],
    chart: [60, 80, 70, 90, 100, 85, 110, 95, 120, 108, 130, 145],
    rows: [
      {
        name: "Premium Bundle",
        stage: "In Stock",
        value: "1,284 sold",
        status: "hot",
      },
      {
        name: "Smart Watch Pro",
        stage: "Low Stock",
        value: "342 sold",
        status: "warm",
      },
      {
        name: "Wireless Kit",
        stage: "In Stock",
        value: "891 sold",
        status: "closed",
      },
    ],
  },
  elearning: {
    title: "Learning Platform",
    accent: "#3730A3",
    accentBg: "#EEF2FF",
    kpis: [
      { label: "Active Learners", value: "8,492", change: "+45%" },
      { label: "Courses", value: "124", change: "+12" },
      { label: "Completion", value: "78%", change: "+8%" },
      { label: "Satisfaction", value: "4.9★", change: "+0.2" },
    ],
    chart: [30, 45, 55, 70, 65, 85, 90, 100, 95, 110, 115, 130],
    rows: [
      {
        name: "Digital Marketing",
        stage: "Active",
        value: "2,841 enrolled",
        status: "hot",
      },
      {
        name: "Data Analysis",
        stage: "Active",
        value: "1,920 enrolled",
        status: "warm",
      },
      {
        name: "Leadership",
        stage: "Coming Soon",
        value: "480 waitlist",
        status: "closed",
      },
    ],
  },
  custom: {
    title: "Operations Hub",
    accent: "#059669",
    accentBg: "#ECFDF5",
    kpis: [
      { label: "Automation Rate", value: "94%", change: "+34%" },
      { label: "Time Saved", value: "840h", change: "+210h" },
      { label: "Efficiency", value: "+180%", change: "+45%" },
      { label: "Cost Saved", value: "$92K", change: "+$28K" },
    ],
    chart: [20, 35, 50, 65, 72, 80, 88, 92, 95, 97, 98, 99],
    rows: [
      {
        name: "Invoice Processing",
        stage: "Automated",
        value: "100%",
        status: "hot",
      },
      {
        name: "Customer Onboarding",
        stage: "Automated",
        value: "98%",
        status: "warm",
      },
      {
        name: "Report Generation",
        stage: "Automated",
        value: "95%",
        status: "closed",
      },
    ],
  },
};

const statusDot = {
  hot: "#FF5C28",
  warm: "#F59E0B",
  closed: "#10B981",
};

const maxVal = (data: number[]) => Math.max(...data);

export default function DashboardMock({
  type = "crm",
  compact = false,
  className,
}: DashboardMockProps) {
  const d = mockData[type];
  const max = maxVal(d.chart);

  return (
    <div
      className={cn(
        "w-full bg-surface font-mono text-xs select-none overflow-hidden border border-border rounded-lg",
        className,
      )}
      style={{ minHeight: compact ? 240 : 360 }}
      aria-hidden="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-raised">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: d.accent }}
          />
          <span className="text-ink-3 text-[10px] font-semibold tracking-widest uppercase">
            {d.title}
          </span>
        </div>
        <div className="flex gap-2">
          {["Day", "Week", "Month"].map((p, i) => (
            <span
              key={p}
              className="text-[9px] px-2 py-0.5 rounded"
              style={{
                background: i === 2 ? d.accentBg : "transparent",
                color: i === 2 ? d.accent : "#A1A1AA",
                fontWeight: i === 2 ? 600 : 400,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-px border-b border-border bg-border">
        {d.kpis.map((kpi) => (
          <div key={kpi.label} className="p-3 bg-surface">
            <div className="text-[8px] text-ink-4 uppercase tracking-widest mb-1.5">
              {kpi.label}
            </div>
            <div className="text-sm font-bold text-ink leading-none">
              {kpi.value}
            </div>
            <div
              className="text-[9px] mt-1 font-medium"
              style={{ color: d.accent }}
            >
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <>
          {/* Mini chart */}
          <div className="px-4 py-3">
            <div className="flex items-end gap-1 h-16">
              {d.chart.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${(val / max) * 100}%`,
                    background: d.accentBg,
                    borderTop: `1.5px solid ${d.accent}`,
                    minWidth: 4,
                    opacity: 0.7 + (i / d.chart.length) * 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="px-4 pb-3">
            <div className="flex gap-3 text-[8px] text-ink-4 uppercase tracking-widest pb-1.5 border-b border-border mb-1.5">
              <span className="flex-1">Name</span>
              <span className="w-24">Stage</span>
              <span className="w-20 text-right">Value</span>
            </div>
            {d.rows.map((row, i) => (
              <div
                key={i}
                className="flex gap-3 py-1.5 items-center border-b border-border/50 last:border-0"
              >
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background:
                        statusDot[row.status as keyof typeof statusDot],
                    }}
                  />
                  <span className="text-[10px] text-ink-2 truncate">
                    {row.name}
                  </span>
                </div>
                <span className="w-24 text-[9px] text-ink-3 truncate">
                  {row.stage}
                </span>
                <span
                  className="w-20 text-right text-[10px] font-medium"
                  style={{ color: d.accent }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
