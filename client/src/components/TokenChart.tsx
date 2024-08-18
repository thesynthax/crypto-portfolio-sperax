import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type Token = {
  name: string;
  balance: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type TokenChartProps = {
  data: Token[];
}

// Pie chart in the watchList (make sure there is balance in at least one token, or else the chart won't show)
export const TokenChart = (props: TokenChartProps) => {
  const allZero = props.data.every(token => token.balance === 0);

  return (
    <>
      {allZero && <h1>All the balances are zero</h1>}
      <PieChart width={400} height={400}>
        <Pie
          data={props.data}
          dataKey="balance"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};
