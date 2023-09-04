import { NextPage } from 'next';
import React from 'react';
import { Loaderprops } from '@/app/types/components';

const Loader: NextPage<Loaderprops> = ({
    sizes = 'w-10 h-10' 
}) => {
  return (
    <div className={`rounded-full animate-spin border-t-4 border-blue-500 border-solid border-opacity-25 border-r-4 ${sizes}`}>
    </div>
  );
};

export default Loader;
