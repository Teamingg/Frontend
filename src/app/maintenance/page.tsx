export default function MaintenancePage() {
  return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">🚧 서버 점검 중 🚧</h1>
        <p className="text-lg text-gray-600 mt-2">현재 서버 유지보수 작업이 진행 중입니다.</p>
        <p className="text-md text-gray-500">잠시 후 다시 이용해 주세요.</p>
      </div>
  );
}
