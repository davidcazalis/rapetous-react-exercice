import { FC, ReactElement } from 'react';

type DialogProps = {
  content: ReactElement;
  show: boolean;
  title?: string;
};

const Dialog: FC<DialogProps> = ({ content, show, title }) => {
  return show ? (
    <div>
      <div className="flex flex-col h-screen w-screen z-100 absolute top-0 left-0 bg-zinc-400 opacity-80" />
      <div className="h-full w-full z-200 absolute top-0 left-0 flex justify-content align-center">
        <div className="bg-white border-[1px] p-3 pb-2 rounded-lg drop-shadow-md relative opacity-100 w-fit m-auto">
          <div className="mb-2 font-bold font-roboto">{title}</div>
          {content}
        </div>
      </div>
    </div>
  ) : null;
};

export default Dialog;
