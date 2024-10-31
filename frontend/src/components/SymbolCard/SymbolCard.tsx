import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import upArrowIcon from '@/assets/up.png';
import downArrowIcon from '@/assets/down.png';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <button onClick={handleOnClick} className="symbolCard symbolCard--positive">
      <div className="symbolCard__header">
            <span>{id}</span>
            <img src={ upArrowIcon } alt="Positive trend arrow" className='symbolCard__headerImg' />
            {/* <img src={ downArrowIcon } alt="negative trend arrow" className='SymbolCard__trendImg' /> */}
      </div>
      <div className="symbolCard__content">
        <div>Price:</div>
        <div>{price || '--'} </div>
      </div>
      <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
      <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
      <ListItem Icon={<MarketCapIcon />} label={marketCap.toString()} spacing="space-between" />
    </button>
  );
};

export default SymbolCard;
