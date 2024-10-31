import './symbolCard.css';
import CurrencyFormat from '@/components/CurrencyFormat/CurrencyFormat';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';

import upArrowIcon from '@/assets/up.png';
import downArrowIcon from '@/assets/down.png';

import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <button onClick={handleOnClick} className="symbolCard symbolCard--positive">
      <div className="symbolCard__header">
            <span>{id}</span>
            { trend === 'UP' && <img src={ upArrowIcon } alt="Positive trend arrow" className='symbolCard__headerImg' /> }
            { trend === 'DOWN' && <img src={ downArrowIcon } alt="negative trend arrow" className='symbolCard__headerImg' /> }
      </div>
      <div className="symbolCard__content">
            <div>Price:</div>
            { price && <CurrencyFormat prefix="$" currencyValue={ price } /> || '--' }
        </div>
      {
        showCardInfo && (
            <div className="symbolCard__list">
                <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
                <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
                <ListItem Icon={<MarketCapIcon />} label={ <CurrencyFormat currencyValue={ marketCap } prefix="$" />} spacing="space-between" />
            </div>
        )
    }
    </button>
  );
};

export default SymbolCard;
