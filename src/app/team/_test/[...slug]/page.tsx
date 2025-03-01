import React from 'react';

const Page = ({params}) => {
  console.log(params.slug)
  return (
      <div>
        test
        {params.slug.map(item => (
            <p>{item}</p>
        ))}
      </div>
  );
};

export default Page;