import PodiumIcon from 'mdi-react/PodiumIcon';
import SwordCross from 'mdi-react/SwordCrossIcon';
import MarvelLogo from '../resources/logo-marvel.svg';
import LinkButton from './Atoms/LinkButton';

const Header = () => {
  return (
    <div className="flex">
      <img
        alt="logo"
        className="max-w-[200px]"
        src={MarvelLogo}
      />
      <div className="w-full flex flex-row justify-end p-4">
        <LinkButton
          label="Fights"
          icon={SwordCross}
          link="/fight"
        />
        <span className="ml-2">
          <LinkButton
            label="Ranking"
            icon={PodiumIcon}
            link="/ranking"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
