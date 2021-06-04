import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';

const data = [];
for (let num = 30; num >= 0; num--) {
  // console.log(subDays(new Date(), num).toISOString().substr(0, 10));
  console.log(data);
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 0.1 + Math.random() - 0.3
  });
}

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.value));
  const dataMin = Math.min(...data.map((i) => i.value));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

export default function Home() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#ADD49B" stopOpacity={1} />
            <stop offset={off} stopColor="#E28DB2" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Area type="monotone" dataKey="value" stroke="rgba(0,0,0,0)" fill="url(#splitColor)" />

        <CartesianGrid strokeDasharray="4 4" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            console.log(date);
            if (date.getDate() % 3 === 0) {
              return format(date, 'MMM, d');
            }
            return '';
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
      </div>
    );
  }
  return null;
}
