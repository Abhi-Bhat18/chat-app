import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  url: string;
  alt?: string;
  fallback?: string;
  width?: string;
  height?: string;
}

import { VscAccount } from "react-icons/vsc";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AvatarComponent: React.FC<Props> = ({ url, alt, fallback }) => {
  return (
    <div className="flex space-x-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex space-x-2 justify-start items-center">
            <Avatar>
              <AvatarImage className="object-cover" src={url} alt={alt} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Abhishek Bhat</p>
              <p className="text-xs">abhi_18</p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-36">
          <div className="space-y-5  border-gray-400">
            <div className="flex space-x-2 items-center">
              <VscAccount />
              <button> Account </button>
            </div>
            <div className="flex space-x-2 items-center">
              <RiLogoutCircleRLine />
              <button>Logout</button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AvatarComponent;
