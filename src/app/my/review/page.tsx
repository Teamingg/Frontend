import {queryclient} from "@/lib/getQueryClient";
import {myPageKeys} from "@/hooks/queries/my";
import {getMyReviews} from "@/service/api/my";

const Page = async () => {
  const review = await queryclient.fetchQuery({
    queryKey: myPageKeys.reviews,
    queryFn: getMyReviews,
  });

  return (
      <div className='min-h-[calc(100vh-72px-62px-200px)] p-8 bg-white'>
        <h3 className='pb-6 text-xl md:text-2xl lg:text-3xl border-b border-b-gray-200'>리뷰 관리</h3>
        {!review || review.length > 0 ? (
            <ul className="space-y-4">
              {review.map((item, index) => (
                  <li key={index} className="p-4 border rounded-lg shadow-sm">
                    <p className="text-gray-600">{item.content}</p>
                  </li>
              ))}
            </ul>
        ) : (
            <div className="text-center pt-16 pb-6">
              <p className="text-gray-500 mb-4">리뷰가 존재하지 않습니다.</p>
            </div>
        )}
      </div>
  );
};

export default Page;