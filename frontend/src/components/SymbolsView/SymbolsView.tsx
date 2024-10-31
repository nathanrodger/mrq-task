import './symbolView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';

const SymbolsView = () => {
  return (
      <div className="symbolsView">
        <DesktopInfo/>
        <div className="symbolsView__grid">
            <div className="symbolsView__chart">
                <h3>PRICE HISTORY</h3>
                <PriceChart />
            </div>
            <div className="symbolsView__content">
                <div className="symbolsView__cards">
                    <SymbolsGrid />
                </div>
            </div>
        </div>
      </div>
  );
};

export default SymbolsView;
