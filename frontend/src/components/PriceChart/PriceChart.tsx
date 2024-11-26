import { useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';

import './priceChart.css';

const PriceChart = () => {
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    if (activeSymbol !== null) {
      dispatch(fetchPriceHistory({
        symbolId: activeSymbol,
        signal: abortController.signal
      }));
    }

    return () => {
      abortController.abort();
    };
  }, [dispatch, activeSymbol]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  if (apiState.loading && activeSymbol !== null)
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;
  if (!activeSymbol) return <div className="priceChart">Select stock</div>;
  return (
    <div className="priceChart">
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
