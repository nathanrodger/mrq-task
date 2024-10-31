import { useState, useEffect } from 'react';

import './symbolCard.css';
import CurrencyFormat from '@/components/CurrencyFormat/CurrencyFormat';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';

import upArrowIcon from '@/assets/up.png';
import downArrowIcon from '@/assets/down.png';

import { selectShowCardInfo, setActiveSymbol } from '@/store/dashboardOptionsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const [cardModifier, setCardModifier] = useState({
    shift: '',
    animate: '',
  });
  const [active, setActive] = useState('');
  const [currentPrice, setCurrentPrice] = useState(price);
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector((state) => state.store.activeSymbol);

  const handleOnClick = () => {
    dispatch(setActiveSymbol(id));
  };

  const calcPercentage = (x : number, y : number) => {
    const percent = (x / y) * 100;
    return percent.toFixed(2);
  }

  useEffect(() => {
    setActive('');

    if (id === activeSymbol) {
        setActive('symbolCard--active');
    }
  }, [activeSymbol])

  useEffect(() => {
    if (price === currentPrice) return;

    const shiftClass = price > currentPrice ?
        'symbolCard--positive' :
        'symbolCard--negative';

    const shakeClass = calcPercentage(price, currentPrice) > '25' ?
        'symbolCard--shake' :
        '';

    setCardModifier({
        ...cardModifier,
        shift: shiftClass,
        animate: shakeClass
    });

    setTimeout(() => {
        setCardModifier({
            ...cardModifier,
            shift: '',
            animate: ''
        });
        setCurrentPrice(price);
    }, 3000);
  }, [price])

  return (
    <button onClick={handleOnClick} className={ `symbolCard ${ cardModifier.shift } ${ cardModifier.animate } ${ active }` }>
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
