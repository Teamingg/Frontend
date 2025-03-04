export default interface UserReview {
  teamId: number;
  revieweeId: number;
  rating: number;
  content: string;

  // mock Data Type ( 테스트 후 삭제 )
  reviewerId: number;
  reviewerName: string;
  createdDate: string;
}
