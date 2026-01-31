const MealTypeCard = ({ icon, title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-xl
        bg-gray-700
        p-4
        flex flex-col items-center justify-center
        shadow-lg
        transition-all duration-300
        hover:bg-gray-600 hover:scale-105
      "
    >
      <img src={icon} alt={title} className="w-24 mb-2" />
      <p className="text-white text-base font-semibold text-center">
        {title}
      </p>
    </button>
  );
};

export default MealTypeCard;
