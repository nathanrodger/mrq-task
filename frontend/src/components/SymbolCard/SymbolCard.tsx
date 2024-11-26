import { useState, useEffect, memo, useMemo } from 'react';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import CurrencyFormat from '@/components/CurrencyFormat';

import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import upArrowIcon from '@/assets/up.png';
import downArrowIcon from '@/assets/down.png';

import './symbolCard.css';

type SymbolCardProps = {
  id: string;
  price: number;
  showCardInfo: boolean;
  isActive: boolean;
  onClick: () => void;
};

const SymbolCard = ({ id, price, showCardInfo, isActive, onClick }: SymbolCardProps) => {
  const [cardModifier, setCardModifier] = useState({
    shift: '',
    animate: '',
  });
  const [currentPrice, setCurrentPrice] = useState(price);
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const calcPercentage = useMemo(() => (x: number, y: number) => {
    const percent = (x / y) * 100;
    return percent.toFixed(2);
  }, []);

  useEffect(() => {
    if (price === currentPrice) return;

    const shiftClass = price > currentPrice ?
      'symbolCard--positive' :
      'symbolCard--negative';

    const shakeClass = calcPercentage(price, currentPrice) > '25' ?
      'symbolCard--shake' :
      '';

    setCardModifier({
      shift: shiftClass,
      animate: shakeClass
    });

    setTimeout(() => {
      setCardModifier({
        shift: '',
        animate: ''
      });
      setCurrentPrice(price);
    }, 3000);
  }, [price]);

  return (
    <button onClick={onClick} className={`symbolCard ${cardModifier.shift} ${cardModifier.animate} ${isActive ? 'symbolCard--active' : ''}`}>
      <div className="symbolCard__header">
        <span>{id}</span>
        {trend === 'UP' && <img src={upArrowIcon} alt="Positive trend arrow" className='symbolCard__headerImg' />}
        {trend === 'DOWN' && <img src={downArrowIcon} alt="negative trend arrow" className='symbolCard__headerImg' />}
      </div>
      <div className="symbolCard__content">
        <div>Price:</div>
        {price && <CurrencyFormat prefix="$" currencyValue={price} /> || '--'}
      </div>
      {
        showCardInfo && (
          <div className="symbolCard__list">
            <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
            <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
            <ListItem Icon={<MarketCapIcon />} label={<CurrencyFormat currencyValue={marketCap} prefix="$" />} spacing="space-between" />
          </div>
        )
      }
    </button>
  );
};

export default memo(SymbolCard);
