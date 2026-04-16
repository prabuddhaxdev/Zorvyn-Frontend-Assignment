import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  const income = data?.stats?.totalIncome || 0;
  const expenses = data?.stats?.totalExpenses || 0;
  const net = income - expenses;

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>FinSync • Your Monthly Financial Report</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            {/* Header */}
            <Heading style={styles.brand}>FinSync</Heading>
            <Heading style={styles.title}>Monthly Report</Heading>

            <Text style={styles.text}>Hey {userName || "there"},</Text>
            <Text style={styles.text}>
              Here&apos;s your financial summary for{" "}
              <strong>{data?.month}</strong>.
            </Text>

            {/* Stats */}
            <Section style={styles.statsContainer}>
              <StatCard label="Income" value={income} color="#16a34a" />
              <StatCard label="Expenses" value={expenses} color="#dc2626" />
              <StatCard label="Net Balance" value={net} color="#15803d" />
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.sectionTitle}>
                  Spending Breakdown
                </Heading>

                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <Section key={category} style={styles.row}>
                      <Text style={styles.textCap}>{category}</Text>
                      <Text style={styles.amount}>${amount}</Text>
                    </Section>
                  ),
                )}
              </Section>
            )}

            {/* Insights */}
            {data?.insights?.length > 0 && (
              <Section style={styles.sectionHighlight}>
                <Heading style={styles.sectionTitle}>
                  💡 FinSync Insights
                </Heading>

                {data.insights.map((insight, i) => (
                  <Text key={i} style={styles.insight}>
                    {insight}
                  </Text>
                ))}
              </Section>
            )}

            {/* Footer */}
            <Text style={styles.footer}>
              Stay consistent. Small savings today = big freedom tomorrow.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const used = data?.percentageUsed || 0;
    const remaining = (data?.budgetAmount || 0) - (data?.totalExpenses || 0);

    return (
      <Html>
        <Head />
        <Preview>⚠️ FinSync Budget Alert</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.brand}>FinSync</Heading>
            <Heading style={styles.alertTitle}>Budget Alert</Heading>

            <Text style={styles.text}>Hey {userName || "there"},</Text>
            <Text style={styles.text}>
              You&apos;ve used <strong>{used.toFixed(1)}%</strong> of your
              monthly budget.
            </Text>

            <Section style={styles.statsContainer}>
              <StatCard
                label="Monthly Budget"
                value={data?.budgetAmount}
                color="#16a34a"
              />
              <StatCard
                label="Spent"
                value={data?.totalExpenses}
                color="#dc2626"
              />
              <StatCard label="Remaining" value={remaining} color="#15803d" />
            </Section>

            <Text style={styles.footer}>
              You&apos;re close to your limit. Stay mindful 💸
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
}

/* ---------- Reusable Stat Card ---------- */
const StatCard = ({ label, value, color }) => (
  <Section style={{ ...styles.stat, borderLeft: `4px solid ${color}` }}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={{ ...styles.statValue, color }}>
      ${Number(value || 0).toLocaleString()}
    </Text>
  </Section>
);

/* ---------- Styles ---------- */
const styles = {
  body: {
    backgroundColor: "#ecfdf5", // light green
    fontFamily: "-apple-system, sans-serif",
    padding: "20px 0",
  },

  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "28px",
    borderRadius: "10px",
    maxWidth: "520px",
  },

  brand: {
    color: "#16a34a",
    fontSize: "22px",
    textAlign: "center",
    marginBottom: "4px",
  },

  title: {
    color: "#064e3b",
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "20px",
  },

  alertTitle: {
    color: "#b91c1c",
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "20px",
  },

  text: {
    color: "#374151",
    fontSize: "15px",
    marginBottom: "14px",
  },

  statsContainer: {
    margin: "24px 0",
  },

  stat: {
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "6px",
    backgroundColor: "#f9fafb",
  },

  statLabel: {
    fontSize: "13px",
    color: "#6b7280",
  },

  statValue: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  section: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#f0fdf4",
    borderRadius: "6px",
  },

  sectionHighlight: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#ecfdf5",
    borderRadius: "6px",
    border: "1px solid #bbf7d0",
  },

  sectionTitle: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#065f46",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #d1fae5",
    padding: "8px 0",
  },

  textCap: {
    textTransform: "capitalize",
    color: "#374151",
  },

  amount: {
    fontWeight: "600",
    color: "#065f46",
  },

  insight: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#065f46",
  },

  footer: {
    marginTop: "28px",
    fontSize: "13px",
    textAlign: "center",
    color: "#6b7280",
  },
};
