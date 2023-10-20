import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MilitaryTech from '@mui/icons-material/MilitaryTech';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import MarvelLogo from '../resources/logo-marvel.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <div className="flex">
      <img
        alt="logo"
        className="max-w-[200px]"
        src={MarvelLogo}
      />
      <div className="w-full flex flex-row justify-end self-center">
        <span>
          <Button
            variant="outlined"
            size="small"
            endIcon={<MilitaryTech />}
            onClick={() => navigate('/fight')}
            disabled={location.pathname === '/fight'}>
            Fights
          </Button>
        </span>
        <span className="ml-2">
          <Button
            variant="outlined"
            size="small"
            endIcon={<LocalFireDepartmentIcon />}
            onClick={() => navigate('/ranking')}
            disabled={location.pathname === '/ranking'}>
            Ranking
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Header;
