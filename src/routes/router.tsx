import RankingPage from '@/pages/RankingPage';
import Fight from '@/pages/Fight';
import Header from '@/components/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const BattleRouter = () => {
  return (
    <BrowserRouter>
      <div className="p-8 max-w-[1400px] m-auto">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={'/fight'} />}
          />
          <Route
            path="/fight"
            element={<Fight />}
          />
          <Route
            path="/ranking"
            element={<RankingPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default BattleRouter;
