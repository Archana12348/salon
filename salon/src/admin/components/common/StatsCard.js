const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-gray-500 font-semibold ">{title}</p>
          <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>
        <div className="rounded-full bg-gray-100 p-3">
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
