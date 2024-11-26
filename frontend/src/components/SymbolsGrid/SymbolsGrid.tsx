import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo, setActiveSymbol } from '@/store/dashboardOptionsSlice';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import SymbolCard from '../SymbolCard';

import './symbolGrid.css';

const SymbolsGrid = () => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  const handleOnClick = useCallback((id: string) => {
    dispatch(setActiveSymbol(id));
  },[dispatch,]);

  return (
    <div className="symbolGrid">
      {stockSymbols.map((id, i) =>
        <SymbolCard price={prices[id]} key={i} id={id} showCardInfo={showCardInfo}
          isActive={id === activeSymbol} onClick={() => handleOnClick(id)} />
      )}
    </div>
  );
};

export default SymbolsGrid;
