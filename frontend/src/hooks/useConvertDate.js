const useConvertDate = (englishDate) => {
  const date = new Date(englishDate);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const persianDate = new Intl.DateTimeFormat("fa", options).format(date);
  return persianDate;
};

export default useConvertDate;
