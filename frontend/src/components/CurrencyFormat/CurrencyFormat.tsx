type CurrencyFormatProps = {
  prefix: string;
  currencyValue: number;
};

const CurrencyFormat = ({ prefix, currencyValue }: CurrencyFormatProps) => {
  const formattedValue = Intl.NumberFormat('en', {
    notation: 'compact'
  }).format(currencyValue);

  return (
    <span>
      {prefix}{formattedValue}
    </span>
  )
}

export default CurrencyFormat;