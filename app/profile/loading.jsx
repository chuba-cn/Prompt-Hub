import Image from 'next/image';
import loader from '../../public/assets/icons/loader.svg';

const Loading = () => {
    return(
        <div className="w-full flex-center ">
            <Image
               src={loader}
               width={60}
               height={60}
               alt="loader icon"
               className='object-contain'
            />
        </div>
    );
};

export default Loading;