import "./Export.scss";
const Export = () => {
  const handleclick = async () => {
    try {
      const response = await fetch("http://localhost:2000/books");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const csv = data
        .map((item) => {
          const values = Object.values(item);
          console.log(values);
          const s = values.join(",");
          return s;
        })
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "books.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="export">
      <button onClick={handleclick}>DownLoad all books</button>
    </div>
  );
};

export default Export;
