import MarvelLogo from '../resources/logo-marvel.svg';
import Button from './Atoms/Button';
import SwordCross from 'mdi-react/SwordCrossIcon';
import AccountGroup from 'mdi-react/AccountGroupIcon';

const Header = () => {
  return (
    <div className="flex">
      <img
        alt="logo"
        className="max-w-[200px]"
        src={MarvelLogo}
      />
      <div className="w-full flex flex-row justify-end p-4">
        <Button
          label="Fights"
          onClick={() => false}
          icon={SwordCross}
        />
        <span className="ml-2">
          <Button
            label="Characters"
            onClick={() => false}
            icon={AccountGroup}
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
