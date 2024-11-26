import { toggleShowCardInfo, selectShowCardInfo } from '@/store/dashboardOptionsSlice'; // Adjust the import path
import './toggleCardInfo.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

const ToggleCardInfo = () => {
  const dispatch = useAppDispatch();
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleChange = () => {
    dispatch(toggleShowCardInfo());
  };

  return (
    <label className="toggleCardInfo">
      +Info
      <input type="checkbox" checked={showCardInfo} onChange={handleChange} />
    </label>
  );
};

export default ToggleCardInfo;
